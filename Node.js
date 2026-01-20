import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json()); // parse JSON body

// ------------------ Helper functions ------------------
const USERS_FILE = "./users.json";

// Read users from JSON file
const readUsers = () => {
  try {
    const data = fs.readFileSync(USERS_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// Save users to JSON file
const saveUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

// ------------------ Signup Route ------------------
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const users = readUsers();
  const existingUser = users.find(u => u.email === email);

  if (existingUser) {
    if (!existingUser.verified) {
      // Resend verification link
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const verifyLink = `https://mysupernft-hash.github.io/login.html`;

      await transporter.sendMail({
        from: `"SuperNFT" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verify your SuperNFT account",
        html: `<h2>Welcome Back to SuperNFT</h2>
               <p>Click below to verify your account:</p>
               <a href="${verifyLink}">Verify Account</a>`
      });

      return res.json({ message: "Verification email resent. Check your inbox!" });
    } else {
      return res.status(400).json({ message: "User already registered" });
    }
  }

  // New user signup
  const newUser = { email, password, verified: false };
  users.push(newUser);
  saveUsers(users);

  // Send verification email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const verifyLink = `https://mysupernft-hash.github.io/login.html`;

  await transporter.sendMail({
    from: `"SuperNFT" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your SuperNFT account",
    html: `<h2>Welcome to SuperNFT</h2>
           <p>Click below to verify your account:</p>
           <a href="${verifyLink}">Verify Account</a>`
  });

  res.json({ success: true, message: "Signup successful! Check your email for verification." });
});

// ------------------ Start Server ------------------
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`SuperNFT backend running on port ${PORT}`));
