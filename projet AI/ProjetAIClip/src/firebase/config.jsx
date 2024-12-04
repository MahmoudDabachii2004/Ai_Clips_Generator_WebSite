// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM7RHrPlvZDg4Q4o4zqUlEhmD-Xq28qBk",
  authDomain: "projet-react-68dbd.firebaseapp.com",
  databaseURL: "https://projet-react-68dbd-default-rtdb.firebaseio.com",
  projectId: "projet-react-68dbd",
  storageBucket: "projet-react-68dbd.appspot.com",
  messagingSenderId: "921132961260",
  appId: "1:921132961260:web:a5d213ed564040303644c9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);
