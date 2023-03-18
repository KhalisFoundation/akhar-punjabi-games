// // Import the functions you need from the SDKs you need
// import firebase from "firebase";
// import { API_KEY, AUTH_DOMAIN, APP_ID, PROJECT_ID, STORAGE_BUCKET,
// MESSAGING_SENDER_ID, MEASUREMENT_ID } from "@env";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: API_KEY,
//   authDomain: AUTH_DOMAIN,
//   projectId: PROJECT_ID,
//   storageBucket: STORAGE_BUCKET,
//   messagingSenderId: MESSAGING_SENDER_ID,
//   appId: APP_ID,
//   measurementId: MEASUREMENT_ID
// };

// // Initialize Firebase
// let app;
// if (firebase.apps.length === 0) {
//     app = firebase.initializeApp(firebaseConfig);
// } else {
//     app = firebase.app();
// }

// const auth = firebase.auth();

// export { auth };

/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAxeQSmufN-0kiAqfQnNzw4jFrz93IrfKo',
  authDomain: 'sikh-games.firebaseapp.com',
  databaseURL: 'https://sikh-games-default-rtdb.firebaseio.com/',
  projectId: 'sikh-games',
  storageBucket: 'sikh-games.appspot.com',
  messagingSenderId: '370328077829',
  appId: '1:370328077829:web:2f0c04971b989c52bf3e6c',
  measurementId: 'G-G5D0PLV9PG'
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth, firebase };
