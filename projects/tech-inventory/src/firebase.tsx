// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4biafYLR0AoMwJNSu7xcavVUMjwSlypc",
  authDomain: "tech-inventory-e0d49.firebaseapp.com",
  projectId: "tech-inventory-e0d49",
  storageBucket: "tech-inventory-e0d49.firebasestorage.app",
  messagingSenderId: "1022301143228",
  appId: "1:1022301143228:web:93204c5b2d8b53fce290b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db=getFirestore(app);