// js/auth.js
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Login
window.login = async function() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (err) {
    alert(err.message);
  }
}

// Signup
window.signup = async function() {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("User created! Please login.");
    window.location.href = "index.html";
  } catch (err) {
    alert(err.message);
  }
}

// Auth state
onAuthStateChanged(auth, user => {
  if(!user && window.location.pathname.includes("dashboard.html")) {
    window.location.replace("index.html");
  }
});

// Logout
window.logout = async function() {
  await signOut(auth);
  window.location.href = "index.html";
}
