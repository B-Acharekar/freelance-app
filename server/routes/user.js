import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import {
  getUserProfile,
  updateFreelancerProfile,
  updateClientProfile,
  getFreelancers,
  getFreelancerById
} from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', verifyToken, getUserProfile);
router.put('/freelancer/:id', verifyToken, updateFreelancerProfile);
router.put('/client', verifyToken, updateClientProfile);
router.get('/', verifyToken, getFreelancers); // All freelancers
router.get('/freelancer/:id', verifyToken, getFreelancerById);

export default router;
