import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/* FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyDdTprqsuAaDiDDoK7K6tHAyabfyPs5DTk",
  authDomain: "mysuper-nft.firebaseapp.com",
  projectId: "mysuper-nft",
  storageBucket: "mysuper-nft.firebasestorage.app",
  messagingSenderId: "1061978771986",
  appId: "1:1061978771986:web:ef0302af5bb02c2cd0fecb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* 🔐 User Auth Guard */
onAuthStateChanged(auth, async (user)=>{
  if(!user) location.replace("login.html");

  const userRef = doc(db,"users",user.uid);

  /* Start Live Earnings Engine */
  setInterval(async ()=>{
    const snap = await getDoc(userRef);
    if(!snap.exists()) return;

    const userData = snap.data();
    const nfts = userData.nfts || [];

    let dailyIncome = 0;

    // Loop through each NFT & calculate income
    nfts.forEach(nft=>{
      // NFT name and corresponding daily income logic
      // For demo, use price map
      const nftIncomeMap = {
        "Starter NFT": 1,
        "Rising NFT": 2.5,
        "Elite NFT": 5,
        "Legendary NFT": 10
      };

      dailyIncome += nftIncomeMap[nft] || 0;
    });

    // Update Firestore
    await updateDoc(userRef,{
      liveEarnings: dailyIncome
    });

    // Update dashboard UI (if element exists)
    const liveEl = document.getElementById("liveEarnings");
    if(liveEl) liveEl.innerText = `$${dailyIncome.toFixed(2)}`;

  }, 5000); // every 5 seconds
});
