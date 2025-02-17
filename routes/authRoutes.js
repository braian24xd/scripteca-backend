const express = require('express');
const { login } = require('../controllers/authController');
const router = express.Router();

// Ruta para iniciar sesión
router.post('/login', login);

// Ruta para validar el token
// router.get('/validate-token', validateToken);

module.exports = router;
