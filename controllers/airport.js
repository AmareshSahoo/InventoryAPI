const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Airport = require('../models/airport');

// @desc      Airport Lists
// @route     GET /api/v1/airport/fetchAllAirports
// @access    Public
exports.getAirports = asyncHandler(async (req, res, next) => {

  // Query Airports
  const result = await Airport.find({});
  
  if (!result) {
    return next(new ErrorResponse('Unable to Fetch Airport Data, Something went wrong...', 401));
  }

  res.status(200).json({
    success: true,
    data: result,
    message: "Fetch Airport Data Successfully...",
  });
  
});



