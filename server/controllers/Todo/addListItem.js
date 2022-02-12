import asyncHandler from "../../middleware/async.js";
import Todo from "../../models/Todo.js";

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
