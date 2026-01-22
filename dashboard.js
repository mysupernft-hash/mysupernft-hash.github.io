import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const main = document.getElementById("main");

menuBtn.onclick = () => { sidebar.classList.toggle("show"); main.classList.toggle("shift"); };

// 30 NFTs
const NFTS = [
  {cat:"starter",price:10,p:0.2,img:"images/IMG_0458.png"},
  {cat:"starter",price:15,p:0.3,img:"images/IMG_0459.png"},
  {cat:"starter",price:20,p:0.4,img:"images/IMG_0460.png"},
  {cat:"starter",price:25,p:0.5,img:"images/IMG_0461.png"},
  {cat:"starter",price:30,p:0.6,img:"images/IMG_0462.png"},
  {cat:"starter",price:35,p:0.7,img:"images/IMG_0463.png"},
  {cat:"starter",price:40,p:0.8,img:"images/IMG_0464.png"},
  {cat:"starter",price:45,p:0.9,img:"images/IMG_0465.png"},
  {cat:"starter",price:50,p:1,img:"images/IMG_0466.png"},
  {cat:"rising",price:55,p:1.3,img:"images/IMG_0467.png"},
  {cat:"rising",price:60,p:1.5,img:"images/IMG_0468.png"},
  {cat:"rising",price:65,p:1.63,img:"images/IMG_0469.png"},
  {cat:"rising",price:70,p:1.75,img:"images/IMG_0470.png"},
  {cat:"rising",price:75,p:1.88,img:"images/IMG_0471.png"},
  {cat:"rising",price:80,p:2,img:"images/IMG_0472.png"},
  {cat:"rising",price:90,p:2.25,img:"images/IMG_0473.png"},
  {cat:"rising",price:100,p:2.5,img:"images/IMG_0474.png"},
  {cat:"elite",price:150,p:5,img:"images/IMG_0475.png"},
  {cat:"elite",price:200,p:6.6,img:"images/IMG_0476.png"},
  {cat:"elite",price:250,p:8.25,img:"images/IMG_0477.png"},
  {cat:"elite",price:300,p:10,img:"images/IMG_0478.png"},
  {cat:"elite",price:350,p:11.6,img:"images/IMG_0479.png"},
  {cat:"elite",price:400,p:13.3,img:"images/IMG_0480.png"},
  {cat:"legendary",price:499,p:25,img:"images/IMG_0482.png"},
  {cat:"legendary",price:599,p:30,img:"images/IMG_0483.png"},
  {cat:"legendary",price:699,p:40,img:"images/IMG_0497.png"},
  {cat:"legendary",price:799,p:30,img:"images/IMG_0498.png"},
  {cat:"legendary",price:899,p:45,img:"images/IMG_0499.png"},
  {cat:"legendary",price:999,p:100,img:"images/IMG_0503.png"},
];

const box = document.getElementById("nfts");
function render(list){
  box.innerHTML = "";
  list.forEach(n=>{
    box.innerHTML += `
    <div class="nft">
      <img src="${n.img}">
      <p>Price $${n.price}</p>
      <p>Daily Income $${n.p}</p>
      <p>Validity 365 Days</p>
      <button onclick="buy(${n.price}, '${n.img}')">Buy NFT</button>
    </div>`;
  });
}
render(NFTS);

function filterNFT(c){
  document.querySelectorAll(".categories button").forEach(b=>b.classList.remove("active"));
  event.target.classList.add("active");
  if(c==="all") render(NFTS);
  else render(NFTS.filter(n=>n.cat===c));
}

window.buy = (price, img)=>{
  localStorage.setItem("nftPrice", price);
  localStorage.setItem("nftImg", img);
  location.href="nft-details.html";
};

// 🔹 Stats + Referral
onAuthStateChanged(auth, async user=>{
  if(!user) return;
  const snap = await getDoc(doc(db,"users",user.uid));
  if(snap.exists()){
    document.getElementById("myCode").innerText = snap.data().myReferralCode || "N/A";
    document.getElementById("dailyIncome").querySelector("p").innerText = `$${snap.data().dailyIncome || 0}`;
    document.getElementById("liveEarnings").querySelector("p").innerText = `$${snap.data().liveEarnings || 0}`;
    document.getElementById("depositMoney").querySelector("p").innerText = `$${snap.data().totalDeposit || 0}`;
    document.getElementById("walletBalance").querySelector("p").innerText = `$${snap.data().walletBalance || 0}`;
  }
});

// 🔹 Logout
document.getElementById("logoutBtn").addEventListener("click", async ()=>{
  await signOut(auth);
  window.location.replace("admin-login.html");
});
