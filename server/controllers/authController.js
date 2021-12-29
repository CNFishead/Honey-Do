import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middleware/async.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import { OAuth2Client } from "google-auth-library";
import passport from "passport";

import dotenv from "dotenv";

dotenv.config();

/*
  @desc:  Register User
  @route: POST /api/auth/register
  @access Public
*/
const register = asyncHandler(async (req, res, next) => {
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
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/*
  @desc:  Auth User
  @route: POST /api/auth/register
  @access Public
*/
const login = asyncHandler(async (req, res, next) => {
  // Destructure body data
  const { email, password } = req.body;

  // Validate email/password
  if (!email || !password) {
    return next(new ErrorResponse(`Please send an email and a Password`, 400));
  }
  // Check if user in system
  // Check if user deleted
  const user = await User.findOne({ email }).select("+password");
  if (!user || user.isActive === false) {
    return res
      .status(401)
      .json({ message: "Invalid Credentials / User Not Found" });
  }

  // User Auth
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid email or password" });
  }
});

/* @desc   Get current logged in user
   @route  POST /api/auth/me
   @access Private
 */
const getMe = asyncHandler(async (req, res, nex) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user,
  });
});

/* @desc   Update password
   @route  POST /api/auth/updatepassword
   @access Private
 */
const updatePassword = asyncHandler(async (req, res, nex) => {
  // find user, and add password to returned object
  const user = await User.findById(req.user.id).select("+password");

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return nex(new ErrorResponse("Password is incorrect", 401));
  }
  // set password, password will hash itself before saving
  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

/* @desc   Update user details
   @route  PUT /api/auth/updatedetails
   @access Private
 */
const updateDetails = asyncHandler(async (req, res, nex) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    data: user,
  });
});

/* @desc    Forgot password
   @route   POST /api/auth/forgotpassword
   @access  Public
 */
const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: `There is no user with email: ${req.body.email}`,
    });
  }
  // Get reset token
  const resetToken = await user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}s://${req.get(
    "host"
  )}/auth/resetpassword/${resetToken}`;

  const message =
    `You are receiving this email because you (or someone else) has requested the reset of a password. \n` +
    `Please Go to this link to reset password ${resetUrl}`;
  try {
    await sendEmail({
      email: user.email,
      subject: `Password Reset Token`,
      message: message,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse("Email could not be sent", 500));
  }
});

/* @desc    Reset Password
   @route   PUT /api/auth/resetpassword/:resettoken
   @access  Public
 */
const resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPassToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");
  const user = await User.findOne({
    resetPassToken: resetPassToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  // doesnt exist or password token expired
  if (!user) {
    return next(new ErrorResponse("Invalid Token", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendTokenResponse(user, 200, res);
});

// Get token from model, create a cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // create token
  const token = user.getSignedJwtToken();

  // options
  const options = {
    // expires in 30 days
    expires: new Date(Date.now + 30 * 24 * 60 * 60 * 1000),
    // accessible only by clientside script
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};

export const googleAuth = asyncHandler(async (req, res, next) => {
  const googleClient = new OAuth2Client({
    clientId: `${process.env.GOOGLE_CLIENT_ID}`,
  });
  const { token } = req.body;

  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audient: `${process.env.GOOGLE_CLIENT_ID}`,
  });

  const payload = ticket.getPayload();
  console.log(payload);

  let user = await User.findOne({ email: payload?.email });
  // TODO: Fix user signup on find user fail
  if (!user) {
    user = await new User({
      email: payload?.email,
      avatar: payload?.picture,
      firstName: payload?.given_name,
      lastName: payload?.family_name,
    });

    await user.save();
  }

  res.status(200).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
});

export {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
  updatePassword,
  sendTokenResponse,
};
