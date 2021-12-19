import express from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";
import { protect, authorize } from "../middleware/auth.js";
const router = express.Router({ mergeParams: true });

// Want protect and admin for all routes.
// anything below these routes, will use these middlewares.
// this is useful if ALL routes need a specific middleware.
router.use(protect);
router.use(authorize);

router.route("/").get(getUsers);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default router;
