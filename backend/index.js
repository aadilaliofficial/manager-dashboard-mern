const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Auth routes (Manager login/register)
app.use('/api/auth', require('./routes/authRoutes'));

// CRUD API Routes
app.use('/api/drivers', require('./routes/driverRoutes'));  // Drivers CRUD
app.use('/api/routes', require('./routes/routeRoutes'));    // Routes CRUD
app.use('/api/orders', require('./routes/orderRoutes'));    // Orders CRUD

// Health check route
app.get('/', (req, res) => {
  res.send("✅ API is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
