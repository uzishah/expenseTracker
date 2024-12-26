import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALiUpCuyAA7B6wDyMcC2EXrnwa942gqdM",
  authDomain: "expanse-tracker-d94f0.firebaseapp.com",
  projectId: "expanse-tracker-d94f0",
  storageBucket: "expanse-tracker-d94f0.firebasestorage.app",
  messagingSenderId: "862145308884",
  appId: "1:862145308884:web:e8671bb3f7c4d5e60fb341",
  measurementId: "G-ZW51ZVM5NP",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set to local storage");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export const googleProvider = new GoogleAuthProvider();
