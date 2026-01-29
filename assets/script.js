// Firebase Config
firebase.initializeApp({
  apiKey: "AIzaSyB4SGtNZL0N4TIoJ1bGbkiAeRWJcQgrF-4",
  authDomain: "supernft-5b952.firebaseapp.com",
  projectId: "supernft-5b952"
});

const ADMIN_EMAIL = "mysupernft@gmail.com";

// 🔒 Protect all admin pages
function protectAdminPage() {
  firebase.auth().onAuthStateChanged(user => {
    if(user){
      if(user.email.toLowerCase() !== ADMIN_EMAIL){
        window.location.replace("admin-login.html"); // not admin
      }
    } else {
      // Not logged in yet, retry after small delay
      setTimeout(() => {
        firebase.auth().currentUser ? protectAdminPage() : window.location.replace("admin-login.html");
      }, 200);
    }
  });
}

// 🔐 Logout function
function logout(){
  firebase.auth().signOut().then(()=>{
    window.location.replace("admin-login.html");
  });
}
