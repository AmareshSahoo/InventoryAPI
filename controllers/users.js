const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/user');

// @desc      Register user
// @route     POST /api/v1/user/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  
  // Check for user
  const user = await User.findOne({ email });
  
  if (user) {
    return next(new ErrorResponse('User Exist', 401));
  }

  // Create user
  const result = await User.create({
    name,
    email,
    password
  });
  
  if (!result) {
    return next(new ErrorResponse('Unable to Insert Data, Something went wrong...', 401));
  }
  
  res.status(201).json({
    success: true,
    message: "Data Inserted Successfully...",
  });
  
});

// @desc      Login user
// @route     POST /api/v1/user/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  
  // Validate emil & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }
  
  // Check for user
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }
  
  // Check if password matches
  const isMatch = await user.matchPassword(password);
  
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }
  
  res.status(201).json({
    success: true,
    message: "login Successfull...",
  });
  
});


