// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB4SGtNZL0N4TIoJ1bGbkiAeRWJcQgrF-4",
  authDomain: "supernft-5b952.firebaseapp.com",
  projectId: "supernft-5b952",
  storageBucket: "supernft-5b952.firebasestorage.app",
  messagingSenderId: "278097730700",
  appId: "1:278097730700:web:6ba9892334456fd8512fa9",
  measurementId: "G-SFEPHK7N18"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
