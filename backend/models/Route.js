const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  route_id: { type: String, required: true, unique: true },
  start_location: String,
  end_location: String,
  distance_km: Number
});

module.exports = mongoose.model('Route', routeSchema);
