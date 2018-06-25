import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseApp from './initializeApp';
import {setUser, getUser} from './collections/users';

import store from 'root/redux-core/store';
import {logInUser} from 'root/redux-core/actions/user';

// listener for signIn - signOut
firebaseApp.auth().onAuthStateChanged(user => {
  const {dispatch} = store;
  user ? dispatch(logInUser(user.uid)) : dispatch(logInUser(null));
});

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();

// return promise with user info
export const signInWithSocial = provider =>
  firebaseApp.auth().signInWithPopup(provider)
    .then(({user}) => getUser(user.uid)
      .then(dataUserCollection => {
        if (!dataUserCollection) {
          const name = user.displayName.split(' ');
          const newUser = {
            photoURL: user.photoURL,
            firstName: name[0],
            lastName: name[1],
            email: user.email,
          };

          setUser(newUser);
          return newUser
        }
        return dataUserCollection
      }));

// return promise with user info
export const signInWithEmail = (email, password) =>
  firebaseApp.auth().signInWithEmailAndPassword(email, password);

export const signOut = () => {
  localStorage.clear();
  firebaseApp.auth().signOut();
};

// return promise when it done
export const createUser = (email, password) =>
  firebaseApp.auth().createUserWithEmailAndPassword(email, password);

// TODO update user password & mail
