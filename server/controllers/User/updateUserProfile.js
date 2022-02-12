import asyncHandler from "../../middleware/async.js";
import User from "../../models/User.js";

//@desc   Update User profile.
//@route  PUT /api/users/profile
//@access Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    user.sex = req.body.gender || user.sex;
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(404).json({ success: false, message: "User Not Found" });
  }
});
