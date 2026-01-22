import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB4SGtNZL0N4TIoJ1bGbkiAeRWJcQgrF-4",
  authDomain: "supernft-5b952.firebaseapp.com",
  projectId: "supernft-5b952",
  storageBucket: "supernft-5b952.appspot.com",
  messagingSenderId: "278097730700",
  appId: "1:278097730700:web:6ba9892334456fd8512fa9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("signupForm").addEventListener("submit", async function(e){
  e.preventDefault();

  // reCAPTCHA check
  const recaptchaResponse = grecaptcha.getResponse();
  if(!recaptchaResponse){
    alert("Please verify that you are not a robot!");
    return;
  }

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const referCode = document.getElementById("referCode").value.trim();

  if(!referCode){
    alert("Referral code is required!");
    return;
  }

  try {
    // Firebase signup
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Send email verification
    await sendEmailVerification(user);

    // Create a unique referral code for new user
    const myReferralCode = 'REF'+Math.random().toString(36).substring(2,10).toUpperCase();

    // Save user data in Firestore
    await setDoc(doc(db,"users",user.uid),{
      name,
      email,
      myReferralCode,
      referredBy: referCode,
      dailyIncome:0,
      liveEarnings:0,
      totalDeposit:0,
      walletBalance:0,
      nfts:[],
      deposits:[],
      withdrawals:[]
    });

    alert("Signup successful! Please verify your email before login.");
    location.href="login.html";

  } catch(err){
    alert(err.message);
  }
});
