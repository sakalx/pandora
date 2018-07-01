import firebase from 'firebase/app';
import 'firebase/storage';

import {currentUser} from '../auth/authentication';

const firestorageRef = firebase.storage().ref();

// return promise with snapshot when it done
export const uploadToFirestorage = file => {
  const {uid, displayName} = currentUser();
  const fileName = displayName.replace(/\s/, '-');
  const userPhotoRef = firestorageRef.child(`users/${uid}/${fileName}`);
  const metadata = {contentType: file.type};

  return userPhotoRef.put(file, metadata)
};

// return promise with url when it done
export const getURLPhoto = () => {
  const {uid, displayName} = currentUser();
  const fileName = displayName.replace(/\s/, '-');
  const userPhotoRef = firestorageRef.child(`users/${uid}/${fileName}`);

  return userPhotoRef.getDownloadURL()
};

/*
service firebase.storage {
  match /b/{bucket}/o {
  match /images/{imageId} {
    // Only allow uploads of any image file that's less than 5MB
    allow write: if request.resource.size < 5 * 1024 * 1024
      && request.resource.contentType.matches('image/.*');
  }
}
}*/
