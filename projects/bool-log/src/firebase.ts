// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZWS7k-7GSSf-_0Wn_LJwLXpu5Xn0hqnw",
  authDomain: "book-log-2f0bc.firebaseapp.com",
  projectId: "book-log-2f0bc",
  storageBucket: "book-log-2f0bc.firebasestorage.app",
  messagingSenderId: "378200026413",
  appId: "1:378200026413:web:4f5c4c9c9bf2fa9ef137a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
