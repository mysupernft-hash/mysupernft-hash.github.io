// js/dashboard.js
import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

async function loadNFTs() {
  const nftContainer = document.getElementById("nft-container");
  const snapshot = await getDocs(collection(db, "nfts"));
  snapshot.forEach(doc => {
    const nft = doc.data();
    const div = document.createElement("div");
    div.className = "nft-card";
    div.innerHTML = `
      <img src="${nft.image}" alt="${nft.name}" />
      <h3>${nft.name}</h3>
      <button onclick="viewNFT('${doc.id}')">View Details</button>
    `;
    nftContainer.appendChild(div);
  });
}
window.viewNFT = function(id) {
  localStorage.setItem("nftId", id);
  window.location.href = "nft-details.html";
}

loadNFTs();
