import express from "express";
import { getUsers } from "../controllers/Admin/getUsers.js";
import { getUser } from "../controllers/Admin/getUser.js";
import { updateUser } from "../controllers/Admin/updateUser.js";
import { deleteUser } from "../controllers/Admin/deleteUser.js";
import { activateAccount } from "../controllers/Admin/activateAccount.js";
import { getUserProfile } from "../controllers/User/getUserProfile.js";
import { updateUserProfile } from "../controllers/User/updateUserProfile.js";
import { removeAccount } from "../controllers/User/removeAccount.js";
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
  .put(protect, authorize, updateUser)
  .delete(protect, authorize, deleteUser);
router.route("/:id/delete").put(removeAccount);
router.route("/:id/activate").put(protect, authorize, activateAccount);
export default router;
