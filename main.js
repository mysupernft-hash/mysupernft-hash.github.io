import { account } from "./appwrite.js";

// Check login status
account.get()
  .then(user => {
    console.log("Logged in:", user);
  })
  .catch(() => {
    console.log("Not logged in");
  });
