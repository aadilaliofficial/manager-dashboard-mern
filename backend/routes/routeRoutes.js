const express = require('express');
const router = express.Router();
const {
  getRoutes,
  getRouteById,
  addRoute,
  updateRoute,
  deleteRoute
} = require('../controllers/routeController');
const auth = require('../middleware/authMiddleware');

// Public routes
router.get('/', getRoutes);
router.get('/:id', getRouteById);

// Protected routes
router.post('/', auth, addRoute);
router.put('/:id', auth, updateRoute);
router.delete('/:id', auth, deleteRoute);

module.exports = router;
