import asyncHandler from "../../middleware/async.js";
import User from "../../models/User.js";
import generateToken from "../../utils/generateToken.js";
import sendEmail from "../../utils/sendEmail.js";

/*
  @desc:  Register User
  @route: POST /api/auth/register
  @access Public
*/
export const register = asyncHandler(async (req, res, next) => {
  // Check if user exists in the database
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: `A user with email: ${req.body.email} already exists in our system`,
    });
  }
  // create user
  const user = await User.create(req.body);
  if (user) {
    const message = `A new User has Registered for the app: Honey-Do, Congrats on the new user: ${
      req.body.firstName + " " + req.body.lastName
    }`;

    await sendEmail({
      email: process.env.SUPPORT_EMAIL,
      subject: `New User - Honey Do App`,
      message: message,
    });
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});
