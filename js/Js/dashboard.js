// ===============================
// 🔹 FIREBASE IMPORTS
// ===============================
import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc, getDoc, setDoc, updateDoc, increment
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ===============================
// 🔹 NFT MASTER DATA (30 NFTs)
// ===============================
const NFTS = [
  {cat:"starter", price:10, daily:0.2, img:"images/IMG_0458.png"},
  {cat:"starter", price:15, daily:0.3, img:"images/IMG_0459.png"},
  {cat:"starter", price:20, daily:0.4, img:"images/IMG_0460.png"},
  {cat:"starter", price:25, daily:0.5, img:"images/IMG_0461.png"},
  {cat:"starter", price:30, daily:0.6, img:"images/IMG_0462.png"},
  {cat:"starter", price:35, daily:0.7, img:"images/IMG_0463.png"},
  {cat:"starter", price:40, daily:0.8, img:"images/IMG_0464.png"},
  {cat:"starter", price:45, daily:0.9, img:"images/IMG_0465.png"},
  {cat:"starter", price:50, daily:1.0, img:"images/IMG_0466.png"},

  {cat:"rising", price:60, daily:1.5, img:"images/IMG_0467.png"},
  {cat:"rising", price:70, daily:1.8, img:"images/IMG_0468.png"},
  {cat:"rising", price:80, daily:2.0, img:"images/IMG_0469.png"},
  {cat:"rising", price:90, daily:2.3, img:"images/IMG_0470.png"},
  {cat:"rising", price:100, daily:2.5, img:"images/IMG_0471.png"},

  {cat:"elite", price:150, daily:5, img:"images/IMG_0475.png"},
  {cat:"elite", price:200, daily:6.6, img:"images/IMG_0476.png"},
  {cat:"elite", price:250, daily:8.2, img:"images/IMG_0477.png"},
  {cat:"elite", price:300, daily:10, img:"images/IMG_0478.png"},
  {cat:"elite", price:400, daily:13.3, img:"images/IMG_0480.png"},

  {cat:"legendary", price:500, daily:25, img:"images/IMG_0482.png"},
  {cat:"legendary", price:700, daily:40, img:"images/IMG_0497.png"},
  {cat:"legendary", price:900, daily:45, img:"images/IMG_0499.png"},
  {cat:"legendary", price:999, daily:100, img:"images/IMG_0503.png"}
];

// ===============================
// 🔹 DOM
// ===============================
const grid = document.getElementById("nftGrid");
const dailyIncomeEl = document.getElementById("dailyIncome");
const totalEarningsEl = document.getElementById("totalEarnings");
const walletBalanceEl = document.getElementById("walletBalance");
const totalNFTEl = document.getElementById("totalNFT");
const refCodeEl = document.getElementById("refCode");

// ===============================
// 🔹 RENDER NFTs
// ===============================
function renderNFTs(list){
  grid.innerHTML="";
  list.forEach((n,i)=>{
    grid.innerHTML += `
      <div class="nft">
        <img src="${n.img}">
        <p>Category: ${n.cat}</p>
        <p>Price: $${n.price}</p>
        <p>Daily Income: $${n.daily}</p>
        <button onclick="buyNFT(${i})">Buy NFT</button>
      </div>
    `;
  });
}
renderNFTs(NFTS);

// ===============================
// 🔹 BUY NFT
// ===============================
window.buyNFT = async function(index){
  const nft = NFTS[index];
  const user = auth.currentUser;
  if(!user) return alert("Login required");

  const ref = doc(db,"users",user.uid);
  const snap = await getDoc(ref);

  if(!snap.exists()) return alert("User data missing");

  const data = snap.data();

  if((data.walletBalance||0) < nft.price){
    alert("Insufficient balance ❌");
    return;
  }

  await updateDoc(ref,{
    walletBalance: increment(-nft.price),
    dailyIncome: increment(nft.daily),
    totalNFT: increment(1),
    totalEarnings: increment(nft.daily)
  });

  alert("NFT Purchased ✅");
  loadUser(user.uid);
};

// ===============================
// 🔹 LOAD USER DASHBOARD
// ===============================
async function loadUser(uid){
  const ref = doc(db,"users",uid);
  const snap = await getDoc(ref);

  if(!snap.exists()){
    await setDoc(ref,{
      walletBalance: 0,
      dailyIncome: 0,
      totalEarnings: 0,
      totalNFT: 0,
      referralCode: uid.slice(0,6).toUpperCase()
    });
    return loadUser(uid);
  }

  const d = snap.data();
  walletBalanceEl.innerText = "$" + (d.walletBalance||0);
  dailyIncomeEl.innerText = "$" + (d.dailyIncome||0);
  totalEarningsEl.innerText = "$" + (d.totalEarnings||0);
  totalNFTEl.innerText = d.totalNFT||0;
  refCodeEl.innerText = d.referralCode||"---";
}

// ===============================
// 🔹 AUTH LISTENER
// ===============================
onAuthStateChanged(auth,user=>{
  if(user){
    loadUser(user.uid);
  }
});
