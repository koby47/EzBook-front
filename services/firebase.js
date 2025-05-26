// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Replace with your actual Firebase config
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,

  // apiKey: "AIzaSyDePBa2SPq5qcbhVQFTycfp1ObT8PD6y2k",
  // authDomain: "ezbook-e8018.firebaseapp.com",
  // projectId: "ezbook-e8018",
  // storageBucket: "ezbook-e8018.firebasestorage.app",
  // messagingSenderId: "839002024332",
  // appId: "1:839002024332:web:3a1d0806e2fc4c5f944ea9",
 

};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
