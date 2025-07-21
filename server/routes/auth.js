import express from "express";
import { registerUser, loginUser } from "../controllers/auth.js";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate.js";
import { authLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 chars"),
    body("role").isIn(["client", "freelancer"]).withMessage("Role must be client or freelancer"),
  ],
  validateRequest,
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  authLimiter,
  loginUser
);

export default router;
