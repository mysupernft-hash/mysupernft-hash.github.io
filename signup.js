import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* 🔥 Firebase Config */
const firebaseConfig = {
  apiKey: "AIzaSyB4SGtNZL0N4TIoJ1bGbkiAeRWJcQgrF-4",
  authDomain: "supernft-5b952.firebaseapp.com",
  projectId: "supernft-5b952",
  storageBucket: "supernft-5b952.appspot.com",
  messagingSenderId: "278097730700",
  appId: "1:278097730700:web:6ba9892334456fd8512fa9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* 🚫 Block signup if already logged in */
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.replace("dashboard.html");
  }
});

/* 🔒 Enable signup only when referral filled */
const referralInput = document.getElementById("referral");
const signupBtn = document.getElementById("signupBtn");

referralInput.addEventListener("input", () => {
  signupBtn.disabled = referralInput.value.trim() === "";
});

/* ✅ Signup */
signupBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const referral = referralInput.value.trim();

  if (!email || !password || !referral) {
    alert("All fields are required");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (res) => {
      const user = res.user;

      /* 💾 Save user + referral */
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        referralUsed: referral,
        createdAt: new Date()
      });

      window.location.href = "dashboard.html";
    })
    .catch(err => alert(err.message));
});
