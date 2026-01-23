// Import Firebase Auth
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Get HTML elements
const loginBtn = document.getElementById("loginBtn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Login button click event
loginBtn.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {
    // Firebase login
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log("User logged in:", user.uid);

    // Redirect to dashboard
    window.location.href = "dashboard.html";

  } catch (error) {
    // Handle login errors
    switch (error.code) {
      case "auth/user-not-found":
        alert("No user found with this email");
        break;
      case "auth/wrong-password":
        alert("Incorrect password");
        break;
      case "auth/invalid-email":
        alert("Invalid email format");
        break;
      case "auth/too-many-requests":
        alert("Too many login attempts. Please try again later.");
        break;
      default:
        alert("Login failed: " + error.message);
    }
  }
});
