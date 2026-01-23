import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const signupBtn = document.getElementById("signupBtn");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const status = document.getElementById("status");

signupBtn.addEventListener("click", async () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!name || !email || !password) {
    status.textContent = "Please fill all fields";
    return;
  }

  try {
    // Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Add user to Firestore 'users' collection
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      role: "user",       // Normal user by default
      createdAt: serverTimestamp()
    });

    console.log("User signed up:", user.uid);

    status.style.color = "green";
    status.textContent = "Signup successful! Redirecting to login...";
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);

  } catch (error) {
    console.error(error);
    switch (error.code) {
      case "auth/email-already-in-use":
        status.textContent = "Email already in use";
        break;
      case "auth/invalid-email":
        status.textContent = "Invalid email format";
        break;
      case "auth/weak-password":
        status.textContent = "Password should be at least 6 characters";
        break;
      default:
        status.textContent = "Signup failed: " + error.message;
    }
  }
});
