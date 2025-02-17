const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Modelo de usuario

// Controlador de inicio de sesión
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar si la contraseña es correcta
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Generar un token JWT
        const token = jwt.sign(
            { id: user._id, role: user.role, name: user.name, lastName: user.lastName },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Devolver el token y el rol
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
            role: user.role,
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = { login };