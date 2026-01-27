import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

const ctx = document.getElementById("earningsChart");

const earningsChart = new Chart(ctx,{
  type:"line",
  data:{
    labels:[],
    datasets:[{
      data:[],
      borderColor:"#d4af37",
      backgroundColor:"rgba(212,175,55,.15)",
      fill:true,
      tension:0.4
    }]
  },
  options:{
    responsive:true,
    plugins:{legend:{display:false}},
    scales:{y:{beginAtZero:true}}
  }
});

onAuthStateChanged(auth, async user=>{
  if(!user) return;

  const snap = await getDoc(doc(db,"users",user.uid));
  if(!snap.exists()) return;

  const live = snap.data().liveEarnings || 0;

  earningsChart.data.labels = ["10m","20m","30m","40m","50m","Now"];
  earningsChart.data.datasets[0].data = [
    live*0.2,
    live*0.35,
    live*0.5,
    live*0.7,
    live*0.85,
    live
  ];

  earningsChart.update();
});
