// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxeQSmufN-0kiAqfQnNzw4jFrz93IrfKo",
  authDomain: "sikh-games.firebaseapp.com",
  projectId: "sikh-games",
  storageBucket: "sikh-games.appspot.com",
  messagingSenderId: "370328077829",
  appId: "1:370328077829:web:2f0c04971b989c52bf3e6c",
  measurementId: "G-G5D0PLV9PG"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth();

export { auth };