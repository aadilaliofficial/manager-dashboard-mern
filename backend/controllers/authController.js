const Manager = require('../models/Manager');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register manager (only for setup — can be removed later)
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const exists = await Manager.findOne({ username });
    if (exists) return res.status(400).json({ message: 'Username already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const manager = new Manager({ username, password: hashedPassword });
    await manager.save();

    res.status(201).json({ message: 'Manager registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login manager
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const manager = await Manager.findOne({ username });
    if (!manager) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, manager.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: manager._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
