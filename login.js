import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

/* 🔥 YOUR FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyB4SGtNZL0N4TIoJ1bGbkiAeRWJcQgrF-4",
  authDomain: "supernft-5b952.firebaseapp.com",
  projectId: "supernft-5b952",
  storageBucket: "supernft-5b952.firebasestorage.app",
  messagingSenderId: "278097730700",
  appId: "1:278097730700:web:6ba9892334456fd8512fa9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* LOGIN BUTTON */
document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    if (!userCredential.user.emailVerified) {
      alert("Please verify your email first");
      return;
    }

    // ✅ LOGIN SUCCESS → DASHBOARD
    window.location.href = "dashboard.html";

  } catch (error) {
    alert(error.message);
  }
});
