const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

module.exports.transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports.createEmailTemplate = (user) => {
  return `
    <div style="margin: 24px;">
    <h1>Validate your email 📰</h1>
    <p>Hi ${user.username} 📬, thanks for registering!</p>
    <p>Click on the following link to validate your email</p>
    <a href="${process.env.HOST}/activate/${user.activationToken}" style="background-color: black;color: whitesmoke;padding: 8px 12px;border-radius: 4px;text-decoration: none;">
      Activate 
    </a>

  <br>
  
    <div>
    <img src="https://res.cloudinary.com/dmz2jauv9/image/upload/v1704740177/newspaper_kofwxt.png">
    </div>
    
  </div>
    `;
};

const subscriptionSchema = new mongoose.Schema({
  email: { type: String, required: true },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports.Subscription = Subscription;
