import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

document.getElementById("signupForm").addEventListener("submit", async (e)=>{
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const referCode = document.getElementById("referCode").value.trim();

  if(!referCode){
    alert("Referral code is required!");
    return;
  }

  try{
    // 🔍 Referral code validate
    const q = query(collection(db,"users"), where("myReferralCode","==",referCode));
    const snap = await getDocs(q);

    if(snap.empty){
      alert("Invalid referral code ❌");
      return;
    }

    // 🔐 Create account
    const cred = await createUserWithEmailAndPassword(auth,email,password);
    const user = cred.user;

    await sendEmailVerification(user);

    // 🎯 Generate unique referral code
    const myReferralCode = "REF" + Math.random().toString(36).substring(2,10).toUpperCase();

    // 💾 Save user data
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
      withdrawals:[],
      createdAt: Date.now()
    });

    alert("Account created ✅ Verify your email before login");
    location.href="login.html";

  }catch(err){
    alert(err.message);
  }
});
