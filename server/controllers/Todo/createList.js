import asyncHandler from "../../middleware/async.js";
import Todo from "../../models/Todo.js";

/*
  @Desc:   Creates a new List for the user
  @Route:  POST /api/todo/:id
  @Access: Private
*/
export const createList = asyncHandler(async (req, res, next) => {
  const list = await Todo.create({ name: req.body.name, user: req.user._id });
  res.status(200).json({
    list,
  });
});
