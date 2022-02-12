import asyncHandler from "../../middleware/async.js";
import User from "../../models/User.js";
import sendEmail from "../../utils/sendEmail.js";

/* @desc    Forgot password
   @route   POST /api/auth/forgotpassword
   @access  Public
 */
export const ForgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({
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
    return res.status(500).json({ message: "Email could not be sent" });
  }
});
