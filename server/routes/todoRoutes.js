import express from "express";
import { getTodoLists } from "../controllers/Todo/getTodoLists.js";
import { createList } from "../controllers/Todo/createList.js";
import { addListItem } from "../controllers/Todo/addListItem.js";
import { removeList } from "../controllers/Todo/removeList.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.route("/").get(protect, getTodoLists).post(protect, createList);
router.route("/:id").put(protect, addListItem).delete(protect, removeList);

export default router;
