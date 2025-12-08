import { Router } from 'express';
import { getRecordings, addRecording, updateRecording, deleteRecording  } from '../controllers/recordingsController.js'
import { verifyToken, checkAdminRole } from '../middlewares/verifyToken.js'

const recordingsRouter = Router()

recordingsRouter.get('/', verifyToken, getRecordings);
recordingsRouter.post('/', verifyToken, checkAdminRole, addRecording);
recordingsRouter.put('/:id', verifyToken, checkAdminRole, updateRecording);
recordingsRouter.delete('/:id', verifyToken, checkAdminRole, deleteRecording);

export default recordingsRouter;