import express from 'express';
import { sendMessage, getMessages,getChatThreads,markMessagesAsRead } from '../controllers/chatController.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate.js";

const router = express.Router();

router.post(
  '/',
  verifyToken,
  [
    body("receiverId").notEmpty().withMessage("Receiver ID required"),
    body("projectId").notEmpty().withMessage("Project ID required"),
    body("message").notEmpty().withMessage("Message cannot be empty"),
  ],
  validateRequest,
  sendMessage
);
router.get('/:projectId/:userId', verifyToken, getMessages);
router.get('/threads', verifyToken, getChatThreads);
router.post('/read', verifyToken, markMessagesAsRead);

export default router;
