import asyncHandler from "../../middleware/async.js";
import Todo from "../../models/Todo.js";
import User from "../../models/User.js";

//@desc   Delete user
//@route  DELETE /api/users/:id
//@access Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  //Find user
  const user = await User.findById(req.params.id);
  if (user) {
    // Need to locate and remove the users lists, dont want them littering the DB.
    const lists = await Todo.find({ user: req.params.id });
    await lists.map((list) => list.remove());
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404).json({ message: "User Not Found" });
  }
});
