import express from "express";
import {
  addListItem,
  createList,
  getTodoLists,
  removeList,
} from "../controllers/todoController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(protect, getTodoLists).post(protect, createList);
router.route("/:id").put(protect, addListItem).delete(protect, removeList);

export default router;
