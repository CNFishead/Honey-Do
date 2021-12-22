import asyncHandler from "../middleware/async.js";
import Todo from "../models/Todo.js";

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
/*
  @Desc:   Updates a list With new list item
  @Route:  PUT /api/todo/:id
  @Access: Private
*/
export const addListItem = asyncHandler(async (req, res, next) => {
  const list = await Todo.findByIdAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  // If list doesnt exist
  if (!list) {
    return res
      .status(400)
      .json({ success: false, message: "No list with that ID" });
  }

  res.status(200).json({
    list,
  });
});
/*
  @Desc:   Deletes a Todo List completely
  @Route:  DELETE /api/todo/:id
  @Access: Private
*/
export const removeList = asyncHandler(async (req, res, next) => {
  const list = await Todo.findByIdAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  // If list doesnt exist
  if (!list) {
    return res
      .status(400)
      .json({ success: false, message: "No list with that ID" });
  }

  res.status(200).json({
    success: true,
  });
});
