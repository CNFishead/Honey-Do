import asyncHandler from "../../middleware/async.js";
import Todo from "../../models/Todo.js";

/*
  @Desc:   Retrieve the lists of To do's created by the user
  @Route:  GET /api/todo/:id
  @Access: Private
*/
export const getTodoLists = asyncHandler(async (req, res, next) => {
  const todos = await Todo.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.status(200).json({
    success: true,
    todos,
  });
});
