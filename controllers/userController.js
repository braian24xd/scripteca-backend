const User = require('../models/User'); // Importamos el modelo de usuario
const bcrypt = require('bcrypt');
const { sendEmail } = require('../utils/mailer');

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Excluye los campos sensibles como la contraseña
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios.' });
    }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Excluir la contraseña
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener el usuario actual:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const generatePassword = () => Math.random().toString(36).slice(-8);


const addUser = async (req, res) => {
  const { name, lastName, email, phone, dateOfBirth, role } = req.body;

  if (!name || !lastName || !email || !phone || !dateOfBirth || !role) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Generar contraseña
    const password = generatePassword();

    // Crear nuevo usuario
    const newUser = new User({
      name,
      lastName,
      email,
      phone,
      dateOfBirth,
      role,
      password,
    });

    await newUser.save();

    // Enviar correo al usuario recién creado
    const emailSubject = 'Bienvenido a la plataforma';
    const emailText = `Hola ${name},\n\nBienvenido a nuestra plataforma. Tus datos de acceso son:\n\nCorreo: ${email}\nContraseña: ${password}\n\n¡Gracias por unirte!`;
    const emailHtml = `<h2>Bienvenido ${name}</h2><p>Tu correo es: ${email}</p><p>Tu contraseña es: ${password}</p><p>¡Gracias por unirte a nuestra plataforma!</p>`;

    await sendEmail(email, emailSubject, emailText, emailHtml); // Enviar el correo

    // Enviar respuesta al frontend
    res.status(201).json({
      message: 'Usuario agregado exitosamente',
      user: {
        id: newUser._id,
        name: newUser.name,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
      },
      generatedPassword: password, // Enviar la contraseña generada
    });
  } catch (error) {
    console.error('Error al agregar usuario:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, lastName, email, phone, dateOfBirth, role } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, lastName, email, phone, dateOfBirth, role },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  };

// Eliminar un usuario
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        await user.deleteOne();
        res.status(200).json({ message: 'Usuario eliminado exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario.' });
    }
};

// Controlador para cambiar la contraseña
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    // Buscar al usuario autenticado
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Validar la contraseña actual
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'La contraseña actual es incorrecta.' });
    }

    // Encriptar la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Actualizar la contraseña en la base de datos
    await User.findByIdAndUpdate(req.user.id, { password: hashedPassword }, { new: true });

    res.status(200).json({ message: 'Contraseña actualizada correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la contraseña.' });
  }
};

module.exports = {
    getUsers,
    getCurrentUser,
    addUser,
    updateUser,
    deleteUser,
    changePassword
};