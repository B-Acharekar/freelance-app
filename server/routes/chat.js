import express from 'express';
import { sendMessage, getMessages,getChatThreads } from '../controllers/chatController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, sendMessage);
router.get('/:projectId/:userId', verifyToken, getMessages);
router.get('/threads', verifyToken, getChatThreads);

export default router;
