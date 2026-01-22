import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* Firebase config same */
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

/* Block signup if already logged in */
onAuthStateChanged(auth, user => {
  if (user) location.replace("dashboard.html");
});

/* Enable button only if referral typed */
const referralInput = document.getElementById("referral");
const signupBtn = document.getElementById("signupBtn");

referralInput.addEventListener("input", () => {
  signupBtn.disabled = referralInput.value.trim() === "";
});

/* 🔐 SIGNUP WITH REFERRAL VALIDATION */
signupBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const referralCode = referralInput.value.trim();

  if (!email || !password || !referralCode) {
    alert("All fields required");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  /* 🔍 CHECK REFERRAL CODE */
  const q = query(
    collection(db, "users"),
    where("myReferralCode", "==", referralCode)
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    alert("Invalid referral code ❌");
    return;
  }

  /* ✅ Referral valid → signup */
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (res) => {
      const user = res.user;

      /* 🔑 Auto generate referral code */
      const myCode = "SN" + Math.floor(100000 + Math.random() * 900000);

      await setDoc(doc(db, "users", user.uid), {
        email: email,
        referralUsed: referralCode,
        myReferralCode: myCode,
        createdAt: new Date()
      });

      location.href = "dashboard.html";
    })
    .catch(err => alert(err.message));
});
