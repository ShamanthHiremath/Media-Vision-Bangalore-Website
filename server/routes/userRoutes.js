const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Public routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);

// Protected routes
router.get('/verify-token', auth, userController.verifyToken);

module.exports = router;