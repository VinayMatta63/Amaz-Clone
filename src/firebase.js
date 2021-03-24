// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOVyTkLi80We4cdMy-Qc90APtvsslIe48",
  authDomain: "clone-5dcfe.firebaseapp.com",
  projectId: "clone-5dcfe",
  storageBucket: "clone-5dcfe.appspot.com",
  messagingSenderId: "660639533393",
  appId: "1:660639533393:web:86281f494cbf9b358feb70",
  measurementId: "G-YRDEXC2Z27",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
