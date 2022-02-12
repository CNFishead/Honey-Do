import asyncHandler from "../../middleware/async.js";
import User from "../../models/User.js";
// @desc      Get single user
// @route     GET /api/users/:id
// @access    Private/Admin
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ success: false, message: "User Not Found" });
  }
});
