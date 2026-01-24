// 🔹 Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  setDoc 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔹 Firebase config (same as login)
const firebaseConfig = {
  apiKey: "AIzaSyB4SGtNZL0N4TIoJ1bGbkiAeRWJcQgrF-4",
  authDomain: "supernft-5b952.firebaseapp.com",
  projectId: "supernft-5b952",
  storageBucket: "supernft-5b952.appspot.com",
  messagingSenderId: "278097730700",
  appId: "1:278097730700:web:014d5ab680859db4512fa9"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔹 Form submit
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    // 🔹 Create auth user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    // 🔹 Create Firestore user document
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      role: "user",
      myReferralCode: "REF" + Math.floor(100000 + Math.random() * 900000),
      dailyIncome: 0,
      liveEarnings: 0,
      totalDeposit: 0,
      walletBalance: 0,
      createdAt: new Date().toISOString()
    });

    alert("Signup successful 🎉");
    window.location.href = "dashboard.html";

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
});
