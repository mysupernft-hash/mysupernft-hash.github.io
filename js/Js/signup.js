import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
createUserWithEmailAndPassword,
updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
getFirestore,
doc,
setDoc,
getDocs,
query,
collection,
where,
updateDoc,
increment,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


/* 🔥 FIREBASE CONFIG */
const firebaseConfig={
 apiKey:"AIzaSyB4SGtNZL0N4TIoJ1bGbkiAeRWJcQgrF-4",
 authDomain:"supernft-5b952.firebaseapp.com",
 projectId:"supernft-5b952"
};

const app=initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);


/* 📌 GET REFERRAL FROM URL */
function getReferralFromURL(){
 const params=new URLSearchParams(window.location.search);
 return params.get("ref")?.toUpperCase() || null;
}


/* 🚀 SIGNUP BUTTON */
document.getElementById("signupBtn").onclick=async()=>{

const name=document.getElementById("name").value.trim();
const email=document.getElementById("email").value.trim();
const pass=document.getElementById("password").value.trim();
const msg=document.getElementById("msg");

msg.innerText="";

/* validation */
if(!name || !email || !pass){
 msg.innerText="❌ Fill all fields";
 return;
}

if(pass.length<6){
 msg.innerText="❌ Password must be 6+ chars";
 return;
}

try{

/* CREATE AUTH USER */
const cred=await createUserWithEmailAndPassword(auth,email,pass);
const user=cred.user;

/* SET DISPLAY NAME */
await updateProfile(user,{displayName:name});


/* GENERATE REF CODE */
const myCode=user.uid.slice(0,6).toUpperCase();

/* CREATE USER DOC */
await setDoc(doc(db,"users",user.uid),{

 name:name,
 email:email,
 walletBalance:0,
 referralUsed:false,
 referralEarnings:0,
 referralCode:myCode,
 isAdmin:false,
 banned:false,
 role:"user",
 totalDeposit:0,
 dailyIncome:0,
 liveEarnings:0,
 createdAt:serverTimestamp()

});


/* 🎁 APPLY REFERRAL IF EXISTS */
const refCode=getReferralFromURL();

if(refCode){

const q=query(collection(db,"users"),where("referralCode","==",refCode));
const qs=await getDocs(q);

if(!qs.empty){

const owner=qs.docs[0];

if(owner.id!==user.uid){

const ownerRef=doc(db,"users",owner.id);

/* reward */
const reward=5;

/* update new user */
await updateDoc(doc(db,"users",user.uid),{
 walletBalance:increment(reward),
 referralUsed:true,
 referredByCode:refCode
});

/* update owner */
await updateDoc(ownerRef,{
 walletBalance:increment(reward),
 referralEarnings:increment(reward)
});

/* save history */
await setDoc(
 doc(db,"users",owner.id,"referrals",user.uid),
 {
  email:email,
  reward:reward,
  createdAt:serverTimestamp()
 }
);

}
}
}

/* SUCCESS */
msg.innerText="✅ Account created successfully!";
setTimeout(()=>location.href="dashboard.html",1500);

}catch(err){
console.error(err);
msg.innerText="❌ "+err.message;
}

};
