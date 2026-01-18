const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yourgmail@gmail.com',
    pass: 'yourgmailapppassword' // App Password recommended
  }
});

app.post('/send', (req,res)=>{
  const {email, token} = req.body;
  const link = `https://mysupernft-hash.github.io/verify.html?token=${token}`;

  const mailOptions = {
    from: 'yourgmail@gmail.com',
    to: email,
    subject: 'SuperNFT Verification Link',
    html: `<p>Click to verify your account: <a href="${link}">${link}</a></p>`
  };

  transporter.sendMail(mailOptions, (err, info)=>{
    if(err) return res.status(500).send(err);
    res.send('Email sent');
  });
});

app.listen(3000, ()=>console.log('Server running on port 3000'));
