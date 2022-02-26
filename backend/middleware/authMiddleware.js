const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.id).select("-password"); //exclude password
      next();
    } catch (error) {
      res.status(401);
      throw new Error("not authorized");
    }
  }
  if (!token) {
    throw new Error("not authorized, no token");
  }
});
module.exports = { protect };
