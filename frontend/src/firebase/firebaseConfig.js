// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBv-jc7yGzFPnnJtABhhrBM87ArXJsGa78",
  authDomain: "gymfrangos-a3c1f.firebaseapp.com",
  projectId: "gymfrangos-a3c1f",
  storageBucket: "gymfrangos-a3c1f.firebasestorage.app",
  messagingSenderId: "846011786866",
  appId: "1:846011786866:web:a30991d2000b15afb384eb",
  measurementId: "G-KPGWWWN6NQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
// eslint-disable-next-line no-unused-vars
const auth = getAuth(app);

export { auth };