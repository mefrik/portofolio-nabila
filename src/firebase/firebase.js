// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId : process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

const auth = app.auth()
const db = getFirestore()
const storage = getStorage()


export  {
  storage,
  db,
  auth,
  app as default
}





// import firebase from 'firebase/compat/app';
// import { getStorage } from 'firebase/storage'
// import { getFirestore } from 'firebase/firestore';
// import { getAuth } from 'firebase/auth';
// // import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//     apiKey: "AIzaSyBfMrSalIog9QXotgeBRijx8VVIKPqAxXg",
//     authDomain: "portofolio-nabila.firebaseapp.com",
//     projectId: "portofolio-nabila",
//     storageBucket: "portofolio-nabila.appspot.com",
//     messagingSenderId: "1048486068487",
//     appId: "1:1048486068487:web:7349ab699f98e185d845a2",
//     measurementId: "G-88RD8THEJS"
// }
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   const storage = getStorage();

//   const db = getFirestore()
//   const auth = getAuth()

//   export  {
//     storage,
//     db,
//     auth,
//     firebase as default
//   }