import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyBqppeaiNU1SD7aERJz94RFpRbF2FkanMo",
  authDomain: "distribution-site-92f7a.firebaseapp.com",
  projectId: "distribution-site-92f7a",
  storageBucket: "distribution-site-92f7a.appspot.com",
  messagingSenderId: "378287631395",
  appId: "1:378287631395:web:965b1f2be31508e867d596"
};

firebase.initializeApp(config);

export const db = firebase.firestore();
export default firebase;