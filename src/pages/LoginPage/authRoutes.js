// authRoutes.js

const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('./authController');


// POST /api/signup
router.post('/signup', authController.signup);

// Login route
router.post('/login', passport.authenticate('local'), (req, res) => {
  // Authentication successful, send response or redirect
  res.send('Login successful');
});

// Logout route
router.get('/logout', (req, res) => {
  req.logout(); // Passport.js function to logout user
  res.send('Logout successful');
});

// Other authentication routes (e.g., signup, forgot password)...

module.exports = router;
