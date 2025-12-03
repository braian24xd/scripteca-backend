const { Resend } = require("resend");
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "La Scripteca <contacto@scripteca.com>", 
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Error enviando correo:", error);
      throw error;
    }

    console.log("Correo enviado:", data);
    return data;
  } catch (err) {
    console.error("Error crítico al enviar:", err);
    throw err;
  }
};

module.exports = { sendEmail };