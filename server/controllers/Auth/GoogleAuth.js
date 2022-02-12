import { OAuth2Client } from "google-auth-library";
import asyncHandler from "../../middleware/async.js";
import User from "../../models/User.js";
import generateToken from "../../utils/generateToken.js";

export const GoogleAuth = asyncHandler(async (req, res, next) => {
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

  let user = await User.findOne({ email: payload.email });
  // TODO: Fix user signup on find user fail
  if (!user) {
    user = await new User({
      email: payload.email,
      avatar: payload.picture,
      firstName: payload.given_name,
      lastName: payload.family_name,
    });

    await user.save();
  }

  res.status(200).json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
});
