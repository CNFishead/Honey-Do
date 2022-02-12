import asyncHandler from "../../middleware/async.js";
import User from "../../models/User.js";

//@desc   Update User
//@route  PUT /api/users/:id
//@access Private/Admin
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin ?? user.isAdmin;
    user.sex = req.body.sex || user.sex;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      sex: updatedUser.sex,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404).json({ success: false, message: "User Not Found" });
  }
});
