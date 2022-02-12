import asyncHandler from "../../middleware/async.js";
import User from "../../models/User.js";

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
