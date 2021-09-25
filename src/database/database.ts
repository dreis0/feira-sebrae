// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import * as firestore from "firebase/firestore";
import { Firestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFNzWdBhR3S7iCaQRBANSegVIocHunPpE",
  authDomain: "feira-sebrae.firebaseapp.com",
  databaseURL: "https://feira-sebrae-default-rtdb.firebaseio.com",
  projectId: "feira-sebrae",
  storageBucket: "feira-sebrae.appspot.com",
  messagingSenderId: "721611600111",
  appId: "1:721611600111:web:90698146ef9cb952556b1a",
};

export const initDatabase = (): Firestore => {
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const database = firestore.getFirestore(app);

  return database;
};
