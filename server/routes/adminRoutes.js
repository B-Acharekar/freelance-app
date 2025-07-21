import express from 'express';
import { isAdmin } from '../middlewares/adminMiddleware.js';
import {
  setAnnouncement,
  getAnnouncement,
  clearAnnouncement,
  getAllUsers,
  blockOrUnblockUser,
  getAllProjects,
  getAllApplications,
} from '../controllers/adminController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.use(verifyToken, isAdmin); // Secure all admin routes

router.post('/announcement', setAnnouncement);
router.get('/announcement', getAnnouncement);
router.delete('/announcement', clearAnnouncement);
router.get('/users', getAllUsers);
router.put('/users/:id/block', blockOrUnblockUser);
router.get('/projects', getAllProjects);
router.get('/applications', getAllApplications);

export default router;
