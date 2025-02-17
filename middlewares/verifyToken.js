const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'No se proporcionó un token' });
    }

    const token = authHeader.split(' ')[1]; // "Bearer <token>"

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Añadimos la información del usuario al objeto req
        next(); // Continuamos al siguiente middleware/controlador
    } catch (error) {
        console.error('Token inválido:', error);
        res.status(403).json({ message: 'Token inválido o expirado' });
    }
};

const checkAdminRole = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado. Rol insuficiente.' });
    }
    next();
};

module.exports = { verifyToken, checkAdminRole };