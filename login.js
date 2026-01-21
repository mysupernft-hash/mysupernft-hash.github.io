import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// 🔥 SAME CONFIG AS SIGNUP
const firebaseConfig = {
  apiKey: "AIzaSyB4SGtNZL0N4TIoJ1bGbkiAeRWJcQgrF-4",
  authDomain: "supernft-5b952.firebaseapp.com",
  projectId: "supernft-5b952",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔥 BUTTON CLICK
document.getElementById("loginBtn").addEventListener("click", () => {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Email & password required");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

      const user = userCredential.user;

      if (!user.emailVerified) {
        alert("Please verify your email first");
        return;
      }

      // ✅ SUCCESS
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(error.message);
      console.error(error);
    });
});
