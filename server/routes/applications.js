import express from "express";
import {
  createApplication,
  getApplicationsByProject,
  getMyApplications,
  updateApplicationStatus,
} from "../controllers/applicationsController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate.js";

const router = express.Router();

router.post(
  "/:projectId",
  verifyToken,
  [
    body("coverLetter").notEmpty().withMessage("Cover letter is required"),
    body("bidAmount").isNumeric().withMessage("Bid must be a number"),
  ],
  validateRequest,
  createApplication
);
router.get("/project/:projectId", verifyToken, getApplicationsByProject); 
router.get("/my-applications", verifyToken, getMyApplications);        
router.patch("/:id/status", verifyToken, updateApplicationStatus);

export default router;
