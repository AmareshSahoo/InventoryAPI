const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Aircraft = require('../models/aircraft');

// @desc      Aircraft Lists
// @route     GET /api/v1/airport/fetchAllAircrafts
// @access    Public
exports.getAircrafts = asyncHandler(async (req, res, next) => {

  // Query Aircraft
  const result = await Aircraft.find({}).sort({ "aircraft_no": 1 });
  
  if (!result) {
    return next(new ErrorResponse('Unable to Fetch Aircraft Data, Something went wrong...', 401));
  }
  
  res.status(200).json({
    success: true,
    data: result,
    message: "Fetch Aircraft Data Successfully...",
  });
  
});


