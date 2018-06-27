import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

const usersCollection = firestore.collection('users');

// return promise when it done
export const setUser = user => {
  const id = firebase.auth().currentUser.uid;
  const newUser = {
    ...user,
    admin: false,
    id,
  };
  return usersCollection.doc(id).set(newUser).then(() => newUser)
};

// return promise when it done
// deleting a document does not delete its subcollections!
export const deleteUser = (id) => usersCollection.doc(id).delete();

// return promise when it done
// use "dot notation" to reference nested fields "favorites.color": "Red"
export const updateUser = (id, user) => usersCollection.doc(id).update({...user});

// return promise with data
export const getUser = id => usersCollection.doc(id).get()
  .then(doc => {
    if (doc && doc.exists) {
      return doc.data()
    }
    return null;
  });

// return promise with array data
export const getAllUsers = () => usersCollection.get()
  .then(querySnapshot => {
    return querySnapshot.map(({id, data}) => ({id: data()}))
  });

// return promise
export const getAllAdminUsers = () => usersCollection.where("admin", "==", true);


/* Rules
service cloud.firestore {
  match /databases/{database}/documents {

	match /users/{userID} {
  		allow read: if isSignedIn();
      allow create, update : if isOwner(userID);
      allow delete: if isAdmin();
    }


      /// Functions ///
    function isSignedIn() {
      return request.auth.uid != null;
    }

    function isOwner(userId) {
      return request.auth.uid == userId;
    }

     function isAdmin() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.admin == true;
    }
  }
}
*/