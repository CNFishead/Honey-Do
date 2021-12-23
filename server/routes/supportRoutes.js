import express from "express";
import { sendSupportMail } from "../controllers/supportController.js";

const router = express.Router();

router.route("/").post(sendSupportMail);

export default router;
