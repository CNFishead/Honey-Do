import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  googleAuth,
} from "../controllers/authController.js";
const router = express.Router();
// import { protect, authorize } from "../middleware/auth.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:resettoken").put(resetPassword);
router.route("/google").post(googleAuth);


export default router;
