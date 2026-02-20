// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  //TODO: QUITAR API KEY SIEMPRE ANTES DE PUSH
  apiKey: "",
  authDomain: "techinventory-b3404.firebaseapp.com",
  projectId: "techinventory-b3404",
  storageBucket: "techinventory-b3404.firebasestorage.app",
  messagingSenderId: "932030502769",
  appId: "1:932030502769:web:4c57c9ae431a0c3328c8d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db=getFirestore(app);