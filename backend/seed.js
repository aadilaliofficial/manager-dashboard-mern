const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const loadCSV = require('./utils/csvLoader');
const Driver = require('./models/Driver');
const Route = require('./models/Route');
const Order = require('./models/Order');
const connectDB = require('./config/db');

dotenv.config();

async function seedData() {
  try {
    await connectDB();

    // Clear existing collections
    await Driver.deleteMany();
    await Route.deleteMany();
    await Order.deleteMany();

    /** ------------------- DRIVERS ------------------- **/
    const driversCSV = await loadCSV(path.join(__dirname, 'data', 'drivers.csv'));
    const driversData = driversCSV.map(d => {
      let hoursArr = [];
      if (d.past_week_hours) {
        hoursArr = d.past_week_hours
          .split(',')
          .map(h => h.replace(/[^0-9.-]/g, '').trim()) // clean
          .filter(h => h !== '') // remove blanks
          .map(h => Number(h) || 0); // convert to number or 0
      }
      return {
        name: d.name,
        shift_hours: Number(d.shift_hours) || 0,
        past_week_hours: hoursArr
      };
    });
    await Driver.insertMany(driversData);
    console.log(`✅ Loaded ${driversData.length} drivers`);

    /** ------------------- ROUTES ------------------- **/
    const routesCSV = await loadCSV(path.join(__dirname, 'data', 'routes.csv'));
    const routesData = routesCSV.map(r => ({
      route_id: Number(r.route_id),
      distance_km: Number(r.distance_km),
      traffic_level: r.traffic_level,
      base_time_min: Number(r.base_time_min)
    }));
    await Route.insertMany(routesData);
    console.log(`✅ Loaded ${routesData.length} routes`);

    /** ------------------- ORDERS ------------------- **/
    const ordersCSV = await loadCSV(path.join(__dirname, 'data', 'orders.csv'));
    const ordersData = ordersCSV.map(o => {
      let parsedDate = new Date(o.delivery_time);
      if (isNaN(parsedDate)) {
        console.warn(`⚠️ Invalid date for order_id ${o.order_id}: "${o.delivery_time}". Using current date.`);
        parsedDate = new Date();
      }
      return {
        order_id: Number(o.order_id),
        value_rs: Number(o.value_rs),
        route_id: Number(o.route_id),
        delivery_time: parsedDate
      };
    });
    await Order.insertMany(ordersData);
    console.log(`✅ Loaded ${ordersData.length} orders`);

    process.exit();
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
}

seedData();
