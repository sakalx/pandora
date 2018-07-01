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

/* Rules
service firebase.storage {
  match /b/{bucket}/o {

    match /users/{userId}/{allPaths=**} {
    	allow read: if isSignedIn();
      allow create, update : if isOwner(userId) && isImg();
      allow delete: if isAdmin();
    }


    /// Functions ///
    function isSignedIn() {
      return request.auth.uid != null;
    }

     function isOwner(userId) {
      return request.auth.uid == userId ;
    }

    function isAdmin() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.admin == true;
    }

    function isImg() {
      return request.resource.size < 2 * 1024 * 1024
          && request.resource.contentType.matches('image/.*');
    }
  }
}
*/
