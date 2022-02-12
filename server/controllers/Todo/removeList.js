import asyncHandler from "../../middleware/async.js";
import Todo from "../../models/Todo.js";

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
