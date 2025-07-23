import express from 'express';
import { body } from "express-validator";
import {
  createProject,
  getAllProjects,
  getProjectById,
  getMyPostedProjects,
  updateProject,
  deleteProjectById,
  completeProject,
  getMyActiveProjects,
} from '../controllers/projectController.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { validateRequest } from "../middlewares/validate.js";


const router = express.Router();

router.post(
  '/',
  verifyToken,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("budget").isNumeric().withMessage("Budget must be a number"),
    body("skillsRequired").isArray().withMessage("Skills must be an array"),
  ],
  validateRequest,
  createProject
);
router.get('/my-posted-projects', verifyToken, getMyPostedProjects);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.put('/:id', verifyToken, updateProject);
router.delete('/:id', verifyToken, deleteProjectById);
router.post("/my-active-projects", verifyToken, getMyActiveProjects);
router.patch("/complete/:projectId", verifyToken, completeProject);


export default router;
