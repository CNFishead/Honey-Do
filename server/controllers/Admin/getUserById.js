import asyncHandler from "../../middleware/async.js";
import User from "../../models/User.js";

//@desc   get user by ID.
//@route  Get /api/users/:id
//@access Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  //Finds ALL users
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User Not Found" });
  }
});
