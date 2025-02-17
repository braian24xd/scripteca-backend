const express = require('express');
const { getRecordings, addRecording, updateRecording, deleteRecording  } = require('../controllers/recordingsController');
const { verifyToken, checkAdminRole } = require('../middlewares/verifyToken'); // Middleware para verificar el token

const router = express.Router();

// Ruta básica para evitar errores
router.get('/', verifyToken, getRecordings);
router.post('/', verifyToken, checkAdminRole, addRecording);
router.put('/:id', verifyToken, checkAdminRole, updateRecording);
router.delete('/:id', verifyToken, checkAdminRole, deleteRecording);

module.exports = router;