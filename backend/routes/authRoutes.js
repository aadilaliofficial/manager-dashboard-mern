const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

// Only for setup — remove / register in production
router.post('/register', register);
router.post('/login', login);

module.exports = router;
