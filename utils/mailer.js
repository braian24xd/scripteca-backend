const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // o el servicio de correo que prefieras
  auth: {
    user: process.env.EMAIL_USER, // tu correo de gmail
    pass: process.env.EMAIL_PASS, // tu contraseña de gmail o el App Password si tienes 2FA activado
  },
});

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

const sendEmail = (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // tu correo
    to, // correo del destinatario
    subject,
    text, // texto plano del correo
    html, // HTML del correo
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };