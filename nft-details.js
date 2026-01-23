import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

async function loadNFTDetails() {
  const id = localStorage.getItem("nftId");
  const nftDoc = await getDoc(doc(db, "nfts", id));
  if (!nftDoc.exists()) return alert("NFT not found!");

  const nft = nftDoc.data();
  document.getElementById("nft-image").src = nft.image;
  document.getElementById("nft-name").textContent = nft.name;
  document.getElementById("nft-invest").textContent = `$${nft.invest} Invest - Profit $${nft.profit}`;
}

loadNFTDetails();
