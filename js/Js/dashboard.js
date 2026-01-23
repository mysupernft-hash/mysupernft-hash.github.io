// js/dashboard.js
import { auth, db } from "./firebase.js";  // <-- yahan lagao
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.replace("login.html");
    return;
  }

  const userDoc = await getDoc(doc(db, "users", user.uid));
  if (!userDoc.exists() || userDoc.data().role !== "admin") {
    alert("Access denied: Admins only");
    window.location.replace("login.html");
    return;
  }

  loadDashboard();
});

async function loadDashboard() {
  const nftContainer = document.getElementById("nft-container");
  nftContainer.innerHTML = "<p>Loading NFTs...</p>";

  const nftSnapshot = await getDocs(collection(db, "nfts"));
  nftContainer.innerHTML = "";

  nftSnapshot.forEach(doc => {
    const nft = doc.data();
    const div = document.createElement("div");
    div.innerHTML = `
      <img src="${nft.image}" width="150" />
      <h3>${nft.name}</h3>
      <button onclick="viewNFT('${doc.id}')">View Details</button>
    `;
    nftContainer.appendChild(div);
  });
}

window.viewNFT = function(id) {
  localStorage.setItem("nftId", id);
  window.location.href = "nft-details.html";
};
