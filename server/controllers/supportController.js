import asyncHandler from "../middleware/async.js";
import sendEmail from "../utils/sendEmail.js";

/*
  @Desc:   Allows a user to send a support email
  @Route:  POST /api/support
  @access: Public
*/
export const sendSupportMail = asyncHandler(async (req, res) => {
  const message =
    `Name: ${req.body.name} \n` +
    `Email: ${req.body.email} \n` +
    `Phone: ${req.body.phone} \n` +
    `Message: ${req.body.message} \n`;
  try {
    await sendEmail({
      email: process.env.SUPPORT_EMAIL,
      subject: `Support Email - Honey Do App`,
      message: message,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});
