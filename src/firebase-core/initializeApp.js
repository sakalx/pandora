import * as firebase from 'firebase/app';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBYdgmcqEDC3mMBW-2gf8quit_uxIwogjY",
  authDomain: "bid-win.firebaseapp.com",
  databaseURL: "https://bid-win.firebaseio.com",
  projectId: "bid-win",
  storageBucket: "bid-win.appspot.com",
  messagingSenderId: "457145661405"
});

export default firebaseApp