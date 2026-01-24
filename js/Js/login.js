import { signInWithEmailAndPassword } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

loginBtn.addEventListener("click", async () => {
  try {
    const userCred = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    if (!userCred.user.emailVerified) {
      alert("Please verify your email first 📧");
      await auth.signOut();
      return;
    }

    window.location.href = "dashboard.html";

  } catch (err) {
    alert("Invalid email or password ❌");
  }
});
