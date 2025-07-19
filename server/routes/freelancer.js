import express from 'express';
import { getFreelancer, updateFreelancer } from '../controllers/freelancerController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/:userId', verifyToken, getFreelancer);
router.put('/', verifyToken, updateFreelancer);

export default router;
