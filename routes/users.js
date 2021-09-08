const express = require('express');
const {register, login} = require('../controllers/users');

const User = require('../models/User');

const router = express.Router();

router.post('/signup', register)
router.post('/login', login)

module.exports = router;
