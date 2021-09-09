const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Transaction = require('../models/transaction');
const Airport = require('../models/airport');
const Aircraft = require('../models/aircraft');



// @desc      Transaction Lists
// @route     GET /api/v1/fetchAllTransactions
// @access    Public
exports.getTransactions = asyncHandler(async (req, res, next) => {
    
    // Query Transactions
    const result = await Transaction.find({});
    
    if (!result) {
        return next(new ErrorResponse('Unable to Fetch Transaction Data, Something went wrong...', 401));
    }
    
    res.status(200).json({
        success: true,
        data: result,
        message: "Fetch Transaction Data Successfully...",
    });
    
});

// @desc      Create Transaction
// @route     POST /api/v1/createTransaction
// @access    Public
exports.createTransaction = asyncHandler(async (req, res, next) => {
    const { transaction_type,airport_id,aircraft_id=null, quantity } = req.body;
    
    // Check for airport
    const airport = await Airport.findOne({ _id: airport_id });
    
    if (!airport) {
        return next(new ErrorResponse('airport_id not Exist', 401));
    }
    
    console.log("airport",airport)
    
    if((transaction_type === "IN") && (airport.fuel_capacity < (airport.fuel_available + Math.abs(quantity))) ){
        console.log("fuel capacity")
        return next(new ErrorResponse(`Full Capacity is exceeded. Fuel capacity is ${airport.fuel_capacity}, Fuel Available is ${airport.fuel_available}`, 401));
    }
    
    if((transaction_type === "OUT") && airport.fuel_available < Math.abs(quantity)){
        console.log("fuel capacity")
        return next(new ErrorResponse(`Full availability is exceeded. Fuel capacity is ${airport.fuel_capacity}, Fuel Available is ${airport.fuel_available}`, 401));
    }
    
    if(transaction_type === "OUT" && !aircraft_id){
        return next(new ErrorResponse(`aircraft_id is required`, 401)); 
    }
    
    // Check for aircraft
    const aircraft = await Aircraft.findOne({ _id: aircraft_id });
    
    if (!aircraft) {
        return next(new ErrorResponse('aircraft_id not Exist', 401));
    }
    
    // Create transaction
    const result = await Transaction.create({
        transaction_type,airport_id,aircraft_id,quantity
    });
    
    if (!result) {
        return next(new ErrorResponse('Unable to Insert Data, Something went wrong...', 401));
    }
    
    res.status(201).json({
        success: true,
        data: result,
        message: "Data Inserted Successfully...",
    });
});

// @desc      Get Repprts
// @route     GET /api/v1/getReports
// @access    Public
exports.getReports = asyncHandler(async (req, res, next) => {
    
    // Query Transactions
    const result = await Transaction.find({}).populate("airport_id").populate("aircraft_id");
    
    if (!result) {
        return next(new ErrorResponse('Unable to generate reports, Something went wrong...', 401));
    }
    
    
    let grouped = {};
    result.forEach(function (val) {
        grouped[val.airport_id.airport_name] = grouped[val.airport_id.airport_name] || [];
        grouped[val.airport_id.airport_name].push(val);
    });
    
    res.status(200).json({
        success: true,
        data: grouped,
        message: "Fetch Report Data Successfully...",
    });
    
});

