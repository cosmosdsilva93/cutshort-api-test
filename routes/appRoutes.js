const express = require('express');
const appController = require('../controllers/appController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.get('/', session.validate, mainController.renderHome);

router.post('/sign-up', authController.signUp);






module.exports = router;