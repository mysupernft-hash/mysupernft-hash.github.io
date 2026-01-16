/* -------- LOGIN CHECK -------- */
if(!localStorage.getItem("loggedIn")){
  window.location.href="index.html";
}

/* -------- MENU -------- */
function openMenu(){ document.getElementById("menuOverlay").style.display="block"; }
function closeMenu(e){ document.getElementById("menuOverlay").style.display="none"; }

/* -------- WALLET & SUMMARY -------- */
function updateSummary(){
  const data=JSON.parse(localStorage.getItem("myNFTs"))||[];
  let invested=0,daily=0,live=0;
  data.forEach(n=>{
    invested+=n.price;
    daily+=n.daily;
    live += ((Date.now() - n.boughtAt)/1000)*(n.daily/86400);
  });
  const wallet=parseFloat(localStorage.getItem("walletBalance"))||0;

  // update dashboard boxes if present
  const totalInvestedBox=document.getElementById("totalInvestedBox");
  const dailyIncomeBox=document.getElementById("dailyIncomeBox");
  const liveEarningsBox=document.getElementById("liveEarningsBox");
  const walletBox=document.getElementById("walletBox");
  const walletHeader=document.getElementById("walletBalanceHeader");

  if(totalInvestedBox) totalInvestedBox.querySelector("b").innerText="$"+invested.toFixed(2);
  if(dailyIncomeBox) dailyIncomeBox.querySelector("b").innerText="$"+daily.toFixed(2);
  if(liveEarningsBox) liveEarningsBox.querySelector("b").innerText="$"+live.toFixed(4);
  if(walletBox) walletBox.querySelector("b").innerText="$"+wallet.toFixed(2);
  if(walletHeader) walletHeader.innerText="$"+wallet.toFixed(2);
}
setInterval(updateSummary,1000);

/* -------- REFERRAL -------- */
if(!localStorage.getItem("refCode")){
  localStorage.setItem("refCode","SNFT"+Math.floor(100000+Math.random()*900000));
}
const refInput=document.getElementById("refLink");
if(refInput) refInput.value=location.origin+"/index.html?ref="+localStorage.getItem("refCode");
function copyRef(){ navigator.clipboard.writeText(refInput.value); alert("Referral copied"); }

/* -------- NAVIGATION HELPER -------- */
function goPage(url){ window.location.href=url; }

/* -------- DEPOSIT -------- */
function depositFunds(){
  const amount=parseFloat(document.getElementById("depositAmount").value);
  if(isNaN(amount)||amount<=0){ alert("Enter valid amount"); return;}
  let wallet=parseFloat(localStorage.getItem("walletBalance"))||0;
  wallet+=amount;
  localStorage.setItem("walletBalance",wallet);
  updateSummary();
  alert("Deposit Successful! Wallet Balance: $"+wallet.toFixed(2));
  document.getElementById("depositAmount").value="";
}

/* -------- NFT DATA -------- */
const NFTS=[ /* All 30 NFTs data here, same as previous code */ ];
const grid=document.getElementById("nftGrid");
function renderNFT(cat="all"){
  if(!grid) return;
  grid.innerHTML="";
  NFTS.filter(n=>cat==="all"||n.cat===cat).forEach(n=>{
    const daily=(n.price*n.p)/100;
    grid.innerHTML+=`
      <div class="card">
        <img src="${n.img}" onclick="alert('NFT Details:\\nPrice: $${n.price}\\nDaily: $${daily.toFixed(2)}')">
        <div class="price">$${n.price}</div>
        <div class="meta">Daily $${daily.toFixed(2)}</div>
        <button onclick="buyNFT(${n.price},${daily})">Buy NFT</button>
      </div>`;
  });
}
renderNFT();

function filterNFT(cat,btn){
  document.querySelectorAll(".tabs button").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  renderNFT(cat);
}

/* -------- BUY NFT -------- */
function buyNFT(price,daily){
  const data=JSON.parse(localStorage.getItem("myNFTs"))||[];
  data.push({price,daily,boughtAt:Date.now()});
  localStorage.setItem("myNFTs",JSON.stringify(data));
  let wallet=parseFloat(localStorage.getItem("walletBalance"))||0;
  wallet -= price; // deduct price from wallet
  localStorage.setItem("walletBalance",wallet);
  updateSummary();
  alert("NFT Purchased Successfully! Wallet: $"+wallet.toFixed(2));
}

/* -------- LOGOUT -------- */
function logout(){
  alert("Logged out successfully!");
  localStorage.removeItem("loggedIn");
  window.location.href="index.html";
}
