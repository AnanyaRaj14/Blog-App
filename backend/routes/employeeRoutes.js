const express = require('express');
// const router = require('router');
// const { Router } = require('express');
// const { userSignup, userLogin} = require('../controllers/employeeController');
const { userSignup, userLogin, getAllUsers } = require('../controllers/employeeController')

const router = express.Router();

// userSignup
router.post('/signup', userSignup);
router.post('/login', userLogin);
router.get('/getall', getAllUsers);

module.exports = router;

