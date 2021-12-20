import ErrorResponse from "../utils/errorResponse.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../middleware/async.js";
import User from "../models/User.js";

/* 
  @desc      Get all users
  @route     GET /api/v1/users
  @access    Private/Admin
*/
export const getUsers = asyncHandler(async (req, res, next) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? { firstName: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const count = await User.countDocuments({ ...keyword });
  const users = await User.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ users, page, pages: Math.ceil(count / pageSize) });
});

// @desc      Get single user
// @route     GET /api/users/:id
// @access    Private/Admin
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      sex: user.sex,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

//@desc get User profile.
//@route Get /api/users/profile
//@access Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isActive: user.isActive,
      sex: user.gender,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

//@desc Update User profile.
//@route PUT /api/users/profile
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
      isAdmin: updatedUser.isAdmin,
      isActive: updatedUser.isActive,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

/*
  @Desc:   Allows admin user to flip account back to active
  @Route:  PUT /api/users/:id/active
  @access: Private/Admin
*/
export const activateAccount = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.params.id,
    // Will evaluate the boolean and flip it, this is useful since it can only be either/or
    // if the user flips their account inactive, the {admin} can flip it back to active in the same manner
    [{ $set: { isActive: { $not: "$field" } } }],
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(204).json({ success: true });
});

/*
  @Desc:   Allows a user to flip themselves Inactive
  @Route:  PUT /api/users/:id/delete
  @access: Private
*/
export const removeAccount = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.params.id,
    // Will evaluate the boolean and flip it, this is useful since it can only be either/or
    // if the user flips their account inactive, the {admin} can flip it back to active in the same manner
    [{ $set: { isActive: { $eq: [false, "$field"] } } }],
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(204).json({ success: true });
});

//@desc Delete user
//@route DELETE /api/users/:id
//@access Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  //Find user
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

//@desc get user by ID.
//@route Get /api/users/:id
//@access Private/Admin
export const getUserById = asyncHandler(async (req, res) => {
  //Finds ALL users
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

//@desc Update User
//@route PUT /api/users/:id
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
    res.status(404);
    throw new Error("User Not Found");
  }
});
