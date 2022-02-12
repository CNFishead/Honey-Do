import asyncHandler from "../../middleware/async.js";
import User from "../../models/User.js";

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
