const jwt = require('jsonwebtoken');

const authenticateToken = (requiredRole) => (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== requiredRole) {
            return res.status(403).json({ message: 'Acceso denegado. Rol insuficiente.' });
        }

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token inválido' });
    }
};

module.exports = authenticateToken;