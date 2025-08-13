import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// Public
export const loginManager = (data) => API.post("/api/manager/login", data);

// Drivers
export const getDrivers = () => API.get("/api/drivers");
export const addDriver = (data, token) =>
  API.post("/api/drivers", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Routes
export const getRoutes = () => API.get("/api/routes");
export const addRoute = (data, token) =>
  API.post("/api/routes", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Orders
export const getOrders = () => API.get("/api/orders");
export const addOrder = (data, token) =>
  API.post("/api/orders", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
