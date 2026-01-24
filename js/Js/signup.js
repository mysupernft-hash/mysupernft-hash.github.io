// signup.js
import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // prevent page refresh

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("Please fill all fields!");
    return;
  }

  try {
    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Optional: Save name in Firestore
    // import { db } from "./firebase.js";
    // import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
    // await setDoc(doc(db, "users", user.uid), { name: name, email: email, role: "user", createdAt: new Date().toISOString() });

    alert("Signup successful! Redirecting to dashboard...");
    window.location.href = "dashboard.html";
  } catch (err) {
    console.error(err);
    alert(`Error: ${err.message}`);
  }
});
