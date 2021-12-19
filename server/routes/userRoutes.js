import express from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/usersController.js";
import { protect, authorize } from "../middleware/auth.js";
const router = express.Router({ mergeParams: true });

router
  .route(`/profile`)
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/").get(protect, authorize, getUsers);

router
  .route("/:id")
  .get(protect, authorize, getUser)
  .put(updateUser)
  .delete(deleteUser);

export default router;
