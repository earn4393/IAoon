// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5VwoNEZ_P0iRKbHIuzBRwn9j27r0ikP0",
  authDomain: "week102-2022.firebaseapp.com",
  projectId: "week102-2022",
  storageBucket: "week102-2022.appspot.com",
  messagingSenderId: "625642227195",
  appId: "1:625642227195:web:cf9f03cebd210206ecf75e",
  measurementId: "G-87DJZBPBG6",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;
