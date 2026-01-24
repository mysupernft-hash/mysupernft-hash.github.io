import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.getElementById("signupBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    // Save user in Firestore
    await setDoc(doc(db, "users", userCred.user.uid), {
      email,
      role: "user",
      createdAt: new Date()
    });

    // Send verification email
    await sendEmailVerification(userCred.user);

    // 🔒 Logout user immediately
    await signOut(auth);

    alert("Signup successful 🎉\nPlease verify your email before login");
    window.location.href = "login.html";

  } catch (err) {
    alert(err.message);
  }
});
