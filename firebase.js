// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB4SGtNZL0N4TIoJ1bGbkiAeRWJcQgrF-4",
  authDomain: "supernft-5b952.firebaseapp.com",
  projectId: "supernft-5b952",
  storageBucket: "supernft-5b952.firebasestorage.app",
  messagingSenderId: "278097730700",
  appId: "1:278097730700:web:6ba9892334456fd8512fa9",
  measurementId: "G-SFEPHK7N18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Check if user is logged in (for dashboard pages)
export const protectPage = () => {
  onAuthStateChanged(auth, user => {
    if (!user || !user.emailVerified) {
      window.location.href = "login.html"; // redirect if not verified
    }
  });
};

// Logout function
export const logout = () => {
  signOut(auth).then(() => window.location.href = "login.html");
};
