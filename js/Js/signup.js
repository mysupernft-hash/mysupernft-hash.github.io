import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // 🔹 Create user
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    // 🔹 Send verification email
    await sendEmailVerification(userCred.user);

    // 🔹 Create user document
    await setDoc(doc(db, "users", userCred.user.uid), {
      email: email,
      role: "user",
      walletBalance: 0,
      dailyIncome: 0,
      liveEarnings: 0,
      totalDeposit: 0,
      myReferralCode: "SNFT" + Math.floor(Math.random() * 100000),
      createdAt: serverTimestamp()
    });

    alert("Signup successful 🎉 Please verify your email before login.");

    // 🔹 Logout until verified
    await auth.signOut();
    window.location.href = "login.html";

  } catch (error) {
    alert(error.message);
  }
});
