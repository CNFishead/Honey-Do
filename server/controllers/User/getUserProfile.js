import asyncHandler from "../../middleware/async.js";
import User from "../../models/User.js";

//@desc   Get User profile.
//@route  Get /api/users/profile
//@access Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ success: false, message: "User Not Found" });
  }
});
