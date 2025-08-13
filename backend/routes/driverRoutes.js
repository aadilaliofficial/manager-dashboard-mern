const express = require('express');
const router = express.Router();
const {
  getDrivers,
  getDriverById,
  addDriver,
  updateDriver,
  deleteDriver
} = require('../controllers/driverController');
const auth = require('../middleware/authMiddleware');

// Public routes
router.get('/', getDrivers);
router.get('/:id', getDriverById);

// Protected routes
router.post('/', auth, addDriver);
router.put('/:id', auth, updateDriver);
router.delete('/:id', auth, deleteDriver);

module.exports = router;
