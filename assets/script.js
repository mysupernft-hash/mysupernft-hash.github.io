// Firebase Config
firebase.initializeApp({
  apiKey: "AIzaSyB4SGtNZL0N4TIoJ1bGbkiAeRWJcQgrF-4",
  authDomain: "supernft-5b952.firebaseapp.com",
  projectId: "supernft-5b952"
});

const ADMIN_EMAIL = "mysupernft@gmail.com";

// Protect admin pages
firebase.auth().onAuthStateChanged(user => {
  if (!user || user.email.toLowerCase() !== ADMIN_EMAIL) {
    window.location.replace("admin-login.html");
  }
});

// Logout function
function logout() {
  firebase.auth().signOut().then(() => {
    window.location.replace("admin-login.html");
  });
}
