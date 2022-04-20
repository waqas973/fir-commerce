// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzsj2JJOEqpbp5GOB-wSqeU90bUVWwSC0",
  authDomain: "firecommerce-8a0d6.firebaseapp.com",
  projectId: "firecommerce-8a0d6",
  storageBucket: "firecommerce-8a0d6.appspot.com",
  messagingSenderId: "739991993709",
  appId: "1:739991993709:web:2f44a99de6c14601cc6e64",
  measurementId: "G-4GT2SEDWTR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firedb = getFirestore(app);

export default firedb;
