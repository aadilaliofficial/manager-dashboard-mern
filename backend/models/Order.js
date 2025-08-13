const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  order_id: { type: Number, required: true, unique: true },
  value_rs: { type: Number, required: true },
  route_id: { type: Number, required: true },
  delivery_time: { type: Date, required: true }
});

module.exports = mongoose.model('Order', orderSchema);
