const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticateToken = require('../middlewares/authenticateToken');
const { verifyToken }= require('../middlewares/verifyToken')

// Controladores
const { getUsers, getCurrentUser, addUser, updateUser, deleteUser, changePassword } = require('../controllers/userController');

// Rutas
router.get('/me', verifyToken, getCurrentUser);
router.put('/change-password', verifyToken, changePassword);

router.get('/', authenticateToken('admin'), getUsers);
router.post('/', authenticateToken('admin'), addUser);
router.put('/:id', authenticateToken('admin'), updateUser);
router.delete('/:id', authenticateToken('admin'), deleteUser);


module.exports = router;