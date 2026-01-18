require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

let users = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  if (users[email]) return res.json({success:false});

  const token = Date.now();
  users[email] = { password, verified:false, token };

  const link = `${process.env.BASE_URL}/verify?email=${email}&token=${token}`;

  await transporter.sendMail({
    from: `"MySuperNFT" <${process.env.GMAIL}>`,
    to: email,
    subject: "Verify your account",
    html: `<a href="${link}">Verify Account</a>`
  });

  res.json({success:true});
});

app.get("/verify", (req,res)=>{
  const { email, token } = req.query;
  if(users[email] && users[email].token == token){
    users[email].verified = true;
    res.send("Verified successfully");
  } else {
    res.send("Invalid link");
  }
});

app.post("/login",(req,res)=>{
  const { email, password } = req.body;
  const u = users[email];
  if(!u) return res.json({success:false});
  if(!u.verified) return res.json({success:false, msg:"Verify email"});
  if(u.password !== password) return res.json({success:false});
  res.json({success:true});
});

app.listen(3000);
