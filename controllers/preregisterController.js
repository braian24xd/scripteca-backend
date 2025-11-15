const PreregisterSchema = require('../models/PreregisterUser.js');
const { sendEmail } = require('../utils/mailer.js'); // ahora usa Resend

const getRegister = (req, res) => {
    return res.status(200).json({ message: "Aún no hay nada aqui, el señor programador aun lo esta desarrollando" });
};

const addRegister = async (req, res) => {
    const { name, lastName, email, tel, dateBorn } = req.body;
    console.log(req.body)

    if (!name || !lastName || !email || !tel || !dateBorn) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    try {

        // Verificar si ya existe
        const existingUser = await PreregisterSchema.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "Este correo ya esta registrado" });

        // Guardar preregistro
        const newPreregister = new PreregisterSchema({
            name,
            lastName,
            email,
            tel,
            dateBorn
        });

        await newPreregister.save();


        // ------------------------------
        //    CORREO CON RESEND
        // ------------------------------

        const emailSubject = '🎉 Bienvenido a La Scripteca - Tu cupón te espera';

        const emailHtml = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Bienvenido a La Scripteca</title>
        </head>

        <body style="margin:0; padding:0; background:#111111; font-family:Arial, Helvetica, sans-serif;">

        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#111111">
            <tr>
                <td align="center" style="padding: 40px 20px;">
                    
                    <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#1A1A1A" style="border-radius:12px; padding: 30px;">
                        <tr>
                            <td align="center">

                                <img src="https://www.scripteca.com/assets/scripteca-CyU494tQ.png" width="180" alt="La Scripteca" style="display:block; margin-bottom:25px;">

                                <h1 style="color:#FD036E; margin:0; font-size:28px; font-weight:700;">
                                    Hola ${name}
                                </h1>

                                <p style="color:#FFFFFF; font-size:16px; margin:20px 0 10px;">
                                    ¡Gracias por pre-registrarte en <strong>La Scripteca</strong>!
                                </p>

                                <p style="color:#CCCCCC; font-size:15px; margin:0 0 20px;">
                                    Nos alegra muchísimo tenerte aquí. Queremos darte la bienvenida como se merece.
                                </p>

                                <p style="color:#DDDDDD; font-size:15px; margin:0 0 25px; line-height:1.6;">
                                    Como agradecimiento por confiar en nosotros, aquí tienes tu cupón de descuento  
                                    y una guía de inicio rápido para que descubras lo que podrás lograr en tu curso.
                                </p>

                                <a href="https://drive.google.com/drive/folders/1ret-jim_yOv5dOnF_a7OckYgW8meXGED?usp=sharing"
                                   style="background:#00B0F0; color:#FFFFFF; padding:14px 26px; font-size:16px; font-weight:700;
                                   text-decoration:none; border-radius:6px; display:inline-block; margin-bottom:25px;">
                                   Ver recursos + cupón
                                </a>

                                <p style="color:#CCCCCC; font-size:15px; margin:20px 0 10px; line-height:1.6;">
                                    Si tienes alguna duda o necesitas ayuda, estamos para ti.<br>
                                    Puedes responder a este correo y te atenderemos con gusto ❤️
                                </p>

                                <p style="color:#FFFFFF; font-size:16px; margin:30px 0 5px; font-weight:600;">
                                    ¡Nos emociona acompañarte en este camino de aprendizaje!
                                </p>

                                <p style="color:#CCCCCC; font-size:15px; margin:0 0 5px;">
                                    Un abrazo,
                                </p>

                                <p style="color:#FFFFFF; font-size:16px; margin:0; font-weight:600;">
                                    El Equipo de La Scripteca
                                </p>

                                <a href="https://www.scripteca.com" style="color:#00B0F0; font-size:14px; text-decoration:none; margin-top:10px; display:inline-block;">
                                    www.scripteca.com
                                </a>

                            </td>
                        </tr>
                    </table>

                </td>
            </tr>
        </table>
        </body>
        </html>
        `;

        await sendEmail(email, emailSubject, emailHtml); 
        // ⚠️ Resend NO necesita "text" → solo html


        return res.status(200).json({
            message: "Pre registro exitoso, revisa tu email para descargar tu guía de inicio",
            preregister: {
                name: newPreregister.name,
                lastName: newPreregister.lastName,
                email: newPreregister.email,
                tel: newPreregister.tel
            }
        });

    } catch (err) {
        console.error("Error al crear el pre registro: ", err);
        return res.status(500).json({ message: "Uy algo salió mal, intentalo mas tarde." });
    }
};

module.exports = {
    getRegister,
    addRegister
};