import { Router } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken.js'
import { verifyToken } from '../middlewares/verifyToken.js'
import { getUsers, getCurrentUser, addUser, updateUser, deleteUser, changePassword } from '../controllers/userController.js'

const userRouter = Router()

userRouter.get('/me', verifyToken, getCurrentUser);
userRouter.put('/change-password', verifyToken, changePassword);

userRouter.get('/', authenticateToken('admin'), getUsers);
userRouter.post('/', authenticateToken('admin'), addUser);
userRouter.put('/:id', authenticateToken('admin'), updateUser);
userRouter.delete('/:id', authenticateToken('admin'), deleteUser);


export default userRouter