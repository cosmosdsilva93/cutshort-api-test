const express = require('express');
const appController = require('../controllers/appController');
const authController = require('../controllers/authController');

const router = express.Router();


router.post('/sign-up', authController.signUp);










module.exports = router;