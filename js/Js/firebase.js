// firebase.js

// 🔹 Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔹 Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4SGtNZL0N4TIoJ1bGbkiAeRWJcQgrF-4",
  authDomain: "supernft-5b952.firebaseapp.com",
  projectId: "supernft-5b952",
  storageBucket: "supernft-5b952.appspot.com",
  messagingSenderId: "278097730700",
  appId: "1:278097730700:web:014d5ab680859db4512fa9",
  measurementId: "G-BME7FWT355"
};

// 🔹 Initialize Firebase App
const app = initializeApp(firebaseConfig);

// 🔹 Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// 🔹 Export for use in other JS files
export { auth, db };
