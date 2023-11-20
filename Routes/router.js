const express = require('express');
const router = new express.Router();
const userController = require('../Controllers/userController');
const projectController = require('../Controllers/projectController');
const jwtMiddleware = require('../Middlewares/jwtMiddleware');
const multerConfig = require('../Middlewares/MulterMiddleware');

// Register API
router.post('/user/register', userController.register);

// Login API
router.post('/user/login', userController.login);

// Add project
router.post('/project/add', jwtMiddleware, multerConfig.single('projectImage'), projectController.addProject)

// Get user projects
router.get('/user/all-projects', jwtMiddleware, projectController.userProject)

// Get home projects
router.get('/projects/home-projects', projectController.getHomeProject)

// Get all projects
router.get('/project/all', jwtMiddleware, projectController.getAllProjects)

module.exports = router;
