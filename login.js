// login.js
import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* TEST: JS LOADED */
console.log("login.js loaded");

/* ELEMENTS */
const email = document.getElementById("email");
const password = document.getElementById("password");
const msg = document.getElementById("msg");

/* EMAIL LOGIN */
document.getElementById("emailLogin").addEventListener("click", () => {
  msg.innerText = "Logging in...";

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(err => {
      msg.innerText = err.message;
    });
});

/* GOOGLE LOGIN */
const provider = new GoogleAuthProvider();
document.getElementById("googleLogin").addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(err => {
      msg.innerText = err.message;
    });
});

/* AUTO REDIRECT IF ALREADY LOGGED IN */
onAuthStateChanged(auth, user => {
  if (user) {
    window.location.href = "dashboard.html";
  }
});
