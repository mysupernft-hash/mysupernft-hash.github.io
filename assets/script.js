// Firebase Config
firebase.initializeApp({
  apiKey: "AIzaSyB4SGtNZL0N4TIoJ1bGbkiAeRWJcQgrF-4",
  authDomain: "supernft-5b952.firebaseapp.com",
  projectId: "supernft-5b952"
});

const ADMIN_EMAIL = "mysupernft@gmail.com";

// Protect Admin Pages
function protectAdminPage(){
  firebase.auth().onAuthStateChanged(user=>{
    if(user && user.email.toLowerCase() === ADMIN_EMAIL){
      // Admin logged in, allow page
    } else {
      window.location.replace("admin-login.html");
    }
  });
}

// Logout
function logout(){
  firebase.auth().signOut().then(()=>window.location.replace("admin-login.html"));
}
