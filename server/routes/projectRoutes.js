import express from 'express';
import {
  createProject,
  getAllProjects,
  getProjectById,
} from '../controllers/projectController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, createProject); // Only logged-in clients
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

export default router;
