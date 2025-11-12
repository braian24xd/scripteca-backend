const preregister = require('../models/PreregisterUser.js')
const { sendEmail } = require('../utils/mailer.js')

const getRegister = (req, res) => {
    return res.status(200).json({ message: "Aún no hay nada aqui, el señor programador aun lo esta desarrollando" })
}

const addRegister = async (req, res) => {
    const { name, lastName, email, tel } = req.body

    if (!name || !lastName || !email || !tel) {
        return res.status(400).json({ message: "Todos los campos son requeridos" })
    }

    try {
        const existingUser = await preregister.findOne({ email })

        if (existingUser) return res.status(400).json({ message: "Este correo ya esta registrado" })

        const newPreregister = new preregister({
            name,
            lastName,
            email,
            tel
        })

        await newPreregister.save()

        const emailSubject = 'Bienvenido a la Scripteca';
        const emailText = `
            Hola ${name}, bienvenido a nuestra plataforma. Tus datos de acceso son:\n\nCorreo: ${email}\n\n¡Gracias por unirte!
        `
        const emailHtml = `<h2>Bienvenido ${name}</h2><p>Tu correo es: ${email}</p><p>Tu contraseña es: ${password}</p><p>¡Gracias por unirte a nuestra plataforma!</p>`
        await sendEmail(email, emailSubject, emailText, emailHtml);

        return res.status(200).json({ 
            message: "Pre registro exitoso, revisa tu email para descargar tu guía de inicio",
            preregister: {
                name: newPreregister.name,
                lastName: newPreregister.lastName,
                email: newPreregister.email,
                tel: newPreregister.tel
            }
         })

    } catch (err) {
        console.error("Error al crear el pre registro: ", err)
        return res.status(500).json({ message: "Uy algo salió mal, intentalo mas tarde." })
    }
}

module.exports = {
    getRegister,
    addRegister
}