import express from "express";
import {
  createApplication,
  getApplicationsByProject,
  getMyApplications,
} from "../controllers/applicationsController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/:projectId", verifyToken, createApplication);
router.get("/project/:projectId", verifyToken, getApplicationsByProject); 
router.get("/my-applications", verifyToken, getMyApplications);        

export default router;
