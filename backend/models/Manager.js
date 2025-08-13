const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true } // hashed
});

module.exports = mongoose.model('Manager', managerSchema);
