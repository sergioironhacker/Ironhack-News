const nodemailer = require('nodemailer');

module.exports.transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});


module.exports.createEmailTemplate = (user) => {
  return `
    <div style="margin: 24px;">
    <h1>Validate your email 🚀</h1>
    <p>Hi ${user.username} 👋🏻, thanks for registering!</p>
    <p>Click on the following link to validate your email</p>
    <a href="http://${process.env.HOST}/activate/${user.activationToken}" style="background-color: green;color: whitesmoke;padding: 8px 12px;border-radius: 4px;text-decoration: none;">
      Activate
    </a>
  </div>
    `;
};