const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const gcsConfig = {
  projectId: 'bid-win',
  keyFilename: 'bid-win-firebase-adminsdk-ksrjl-93e376a382.json',
};
const gcs = require('@google-cloud/storage')(gcsConfig);

const spawn = require('child-process-promise').spawn;
const cors = require('cors')({origin: true});
const Busboy = require('busboy');

// node modules
const os = require('os');
const fs = require('fs');
const path = require('path');

// end point for upload file: https://us-central1-bid-win.cloudfunctions.net/uploadFile
exports.uploadFile = functions.https.onRequest((req, res) => {
  // TOTO check request is post with img
  cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(200).json({
        message: 'Not allowed 👿'
      })
    }

    const busboy = new Busboy({headers: req.headers});
    let uploadData = null;


    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      const filepath = path.join(os.tmpdir(), filename);
      // TOTO check request is post with img
      console.log('busboy');

      console.log(filename);

      uploadData = {file: filepath, type: mimetype};
      file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on('finish', () => {
      const bucket = gcs.bucket('bid-win.appspot.com');

      // TOTO check request is post with img
      bucket.upload(uploadData.file, {
        uploadType: 'media',
        metadata: {
          metadata: {
            contentType: uploadData.type,
          }
        },
      })
        .then(() => res.status(200).json({message: 'Uploaded file successfully ✨'}))
        .catch(err => res.status(500).json({error: err}))
    });

    busboy.end(req.rawBody);
  });
});

exports.onUpload = functions.storage.object().onFinalize(({bucket, contentType, name: filePath}) => {

    // TODO rename img should start with user uid
    if (path.basename(filePath).startsWith('user-')) {
      console.log('Already resized');
      return null;
    }

    const destBucket = gcs.bucket(bucket);
    const tempFilePath = path.join(os.tmpdir(), path.basename(filePath));
    const metaData = {contentType};

    return destBucket.file(filePath).download({destination: tempFilePath})
    // resize
      .then(() => spawn('convert', [tempFilePath, '-resize', '200x200', tempFilePath])
        // renaming
          .then(() => destBucket.upload(
            tempFilePath, {
              destination: 'user-' + path.basename(filePath),
              metaData,
            })
          )
      );
  });

