const express = require('express');
const {register, login} = require('../controllers/users');
const {getAirports} = require('../controllers/airport');
const {getAircrafts} = require('../controllers/aircraft');
const {getTransactions , createTransaction,getReports } = require('../controllers/transaction');



const User = require('../models/user');

const router = express.Router();

router.post('user/signup', register)
router.post('user/login', login)

router.get('/airport/fetchAllAirports',getAirports)
router.get('/airport/fetchAllAircrafts',getAircrafts)

router.get('/fetchAllTransactions',getTransactions)
router.post('/createTransaction', createTransaction)
router.get('/getReports', getReports)



module.exports = router;
