import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseApp from './initializeApp';

import store from 'root/redux-core/store';
import {logInUser} from 'root/redux-core/actions/user';

// listener for signIn - signOut
firebaseApp.auth().onAuthStateChanged(user => {
  const {dispatch} = store;
  user ? dispatch(logInUser(user.uid)) : dispatch(logInUser(null));
});

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();

// return promise with token & user info
export const signInWithSocial = provider =>
  firebaseApp.auth().signInWithPopup(provider);

// return promise with user info
export const signInWithEmail = (email, password) =>
  firebaseApp.auth().signInWithEmailAndPassword(email, password);

export const signOut = () => {
  localStorage.clear();
  firebaseApp.auth().signOut();
};