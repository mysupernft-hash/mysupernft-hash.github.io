import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Get elements
const loginBtn = document.getElementById("loginBtn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Safety check
if (!loginBtn) {
  console.error("❌ loginBtn not found. Check button ID.");
}

// Click event
loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  console.log("🔐 Login attempt:", email);

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    console.log("✅ Login success:", user.uid);

    // Redirect after login
    window.location.href = "dashboard.html";

  } catch (error) {
    console.error("❌ Login error:", error.code, error.message);

    if (error.code === "auth/user-not-found") {
      alert("User not found");
    } else if (error.code === "auth/wrong-password") {
      alert("Wrong password");
    } else if (error.code === "auth/invalid-credential") {
      alert("Invalid credentials");
    } else {
      alert(error.message);
    }
  }
});
