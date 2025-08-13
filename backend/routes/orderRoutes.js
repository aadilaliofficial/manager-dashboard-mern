const express = require('express');
const router = express.Router();
const {
  getOrders,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder
} = require('../controllers/orderController');
const auth = require('../middleware/authMiddleware');

// Public routes
router.get('/', getOrders);
router.get('/:id', getOrderById);

// Protected routes
router.post('/', auth, addOrder);
router.put('/:id', auth, updateOrder);
router.delete('/:id', auth, deleteOrder);

module.exports = router;
