import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const status = document.getElementById("status");

loginBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    status.textContent = "Please enter email and password";
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Logged in UID:", user.uid);

    // Login successful, redirect to dashboard
    window.location.href = "dashboard.html";

  } catch (error) {
    console.error(error);
    switch (error.code) {
      case "auth/user-not-found":
        status.textContent = "No user found with this email";
        break;
      case "auth/wrong-password":
        status.textContent = "Incorrect password";
        break;
      case "auth/invalid-email":
        status.textContent = "Invalid email format";
        break;
      case "auth/too-many-requests":
        status.textContent = "Too many login attempts. Try again later.";
        break;
      default:
        status.textContent = "Login failed: " + error.message;
    }
  }
});
