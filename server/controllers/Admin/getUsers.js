import asyncHandler from "../../middleware/async.js";
import User from "../../models/User.js";

/* 
  @desc      Get all users
  @route     GET /api/users
  @access    Private/Admin
*/
export const getUsers = asyncHandler(async (req, res, next) => {
  const pageSize = 5;
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
