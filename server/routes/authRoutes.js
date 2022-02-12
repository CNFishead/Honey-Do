import express from "express";
import { register } from "../controllers/Auth/Register.js";
import { Login } from "../controllers/Auth/Login.js";
import { ForgotPassword } from "../controllers/Auth/ForgotPassword.js";
import { ResetPassword } from "../controllers/Auth/ResetPassword.js";
import { GoogleAuth } from "../controllers/Auth/GoogleAuth.js";

const router = express.Router();
// import { protect, authorize } from "../middleware/auth.js";

router.route("/register").post(register);
router.route("/login").post(Login);
router.route("/forgotpassword").post(ForgotPassword);
router.route("/resetpassword/:resettoken").put(ResetPassword);
router.route("/google").post(GoogleAuth);

export default router;
