import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseApp from '../initializeApp';
import {setUserFireStore, getUserFireStore} from '../collections/users';

import store from 'root/redux-core/store';
import {userActionsTypes} from 'root/redux-core/types';
import {logInUser} from 'root/redux-core/actions/user';
import {onLoadingAuth} from 'root/redux-core/actions/onLoad';

const addUserIntoRedux = data => store.dispatch(logInUser(data));
const isLoading = param => store.dispatch(onLoadingAuth(param));
const logOut = () => store.dispatch({type: userActionsTypes.LOG_OUT});

export const currentUser = () => firebase.auth().currentUser;

// listener for signIn - signOut
firebaseApp.auth().onAuthStateChanged(user => {
    if (user) {
      getUserFireStore(user.uid)
        .then(user => user && addUserIntoRedux(user) && isLoading(false))
    } else {
      logOut();
      isLoading(false);
    }
  }
);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();

// return promise with user info
export const signInWithSocial = provider => {
  return firebaseApp.auth().signInWithPopup(provider)
    .then(({user}) => getUserFireStore(user.uid)
      .then(userCollection => _getUserCollection(user, userCollection)));

  function _getUserCollection(user, userCollection) {
    const name = user.displayName.split(' ');
    const newUser = {
      photoURL: user.photoURL,
      firstName: name[0],
      lastName: name[1],
      email: user.email,
    };

    return !userCollection
      ? setUserFireStore(newUser).then(user => {
        addUserIntoRedux(user);
        return user
      })
      : userCollection;
  }
};

// return promise with user info
export const signInWithEmail = (email, password) =>
  firebaseApp.auth().signInWithEmailAndPassword(email, password)
    .then(({user}) => getUserFireStore(user.uid));

export const signOut = () => {
  localStorage.clear();
  firebaseApp.auth().signOut();
};

// return promise when it done
export const createUser = (email, password) =>
  firebaseApp.auth().createUserWithEmailAndPassword(email, password);

// return promise when it done
export const updateUserProfile = ({firstName = '', lastName = '', photoURL = null}) =>
  currentUser().updateProfile({
    displayName: `${firstName} ${lastName}`,
    photoURL,
  });

// return promise when it done
export const updateUserEmail = email => currentUser().updateEmail(email);

// return promise when it done
export const sendEmailVerification = () => currentUser().sendEmailVerification();

// return promise when it done
export const updateUserPassword = newPassword => currentUser().updatePassword(newPassword);

// return promise when it done
export const sendPasswordResetEmail = email => auth.sendPasswordResetEmail(email);
