const express = require('express');
const router = new express.Router();
const userController = require('../Controllers/userController');
const projectController = require('../Controllers/projectController');
const jwtMiddleware = require('../Middlewares/jwtMiddleware');

// Register API
router.post('/user/register', userController.register);

// Login API
router.post('/user/login', userController.login);

// Add project
router.post('/project/add', jwtMiddleware, projectController.addProject)

module.exports = router;
