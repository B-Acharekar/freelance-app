import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import {
  getUserProfile,
  getAnnouncement,
  updateFreelancerProfile,
  updateClientProfile,
  getFreelancers,
  getFreelancerById
} from '../controllers/userController.js';
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate.js";

const router = express.Router();

router.get('/profile', verifyToken, getUserProfile);
router.put(
  '/freelancer/:id',
  verifyToken,
  [
    body("bio").optional().isString(),
    body("skills").optional().isArray(),
    body("experience").optional().isNumeric(),
  ],
  validateRequest,
  updateFreelancerProfile
);
router.put('/client', verifyToken, updateClientProfile);
router.get('/announcement', getAnnouncement);
router.get('/', verifyToken, getFreelancers); // All freelancers
router.get('/freelancer/:id', verifyToken, getFreelancerById);

export default router;
