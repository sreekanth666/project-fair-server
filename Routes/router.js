const express = require('express');
const router = new express.Router();
const userController = require('../Controllers/userController');

// Register API
router.post('/user/register', userController.register);

module.exports = router;
