import { Client, Account, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("697349db000b61cf48c7");

client.ping()
  .then(() => console.log("✅ Appwrite Connected"))
  .catch(err => console.error("❌ Appwrite Error", err));

const account = new Account(client);
const databases = new Databases(client);

export { account, databases };
