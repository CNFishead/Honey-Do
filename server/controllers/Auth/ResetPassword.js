import asyncHandler from "../../middleware/async.js";
import User from "../../models/User.js";

/* @desc    Reset Password
   @route   PUT /api/auth/resetpassword/:resettoken
   @access  Public
 */
export const ResetPassword = asyncHandler(async (req, res, next) => {
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
    return res.status(404).json({ message: "Invalid Token" });
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
