import asyncHandler from "../../middleware/async.js";
import User from "../../models/User.js";
import generateToken from "../../utils/generateToken.js";

/*
  @desc:  Auth User
  @route: POST /api/auth/register
  @access Public
*/
export const Login = asyncHandler(async (req, res, next) => {
  // Destructure body data
  const { email, password } = req.body;

  // Validate email/password
  if (!email || !password) {
    return res
      .status(401)
      .json({ message: "Please Send both an Email and Password" });
  }
  // Check if user in system
  // Check if user isActive
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
