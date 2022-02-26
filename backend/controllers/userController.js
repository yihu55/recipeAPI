const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const User = require("../models/user");
const user = require("../models/user");

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  //if user not filled name or password
  if (!name || !password) {
    res.status(400); //bad request
    throw new Error("Please add all fields");
  }
  //if user exist
  const userExists = await User.findOne({ name });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    name,
    password: hashedPassword,
  });
  if (user) {
    res
      .status(201)
      .json({ _id: user.id, name: name, token: generateToken(user._id) }); //ok
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
  //res.json({ message: "Register User" });//set up for initialize for test
});

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name });

  //first password is the form posted, the second user.password is hashed stored in database
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id, //same as _id:user.id
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});
// @desc Get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  const { _id, name } = await User.findById(req.user.id);
  res.json({
    _id: _id,
    name,
  });
});

//generate a token then pass it when a new user creates and login
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" }); //expires in 30 days
};
module.exports = { registerUser, loginUser, getMe };
