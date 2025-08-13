import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function Dashboard() {
  const [drivers, setDrivers] = useState([]);
  const [newDriver, setNewDriver] = useState({
    name: "",
    shift_hours: "",
    past_week_hours: "",
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    const res = await axios.get("http://localhost:5000/api/drivers", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setDrivers(res.data);
  };

  const addDriver = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: newDriver.name,
        shift_hours: Number(newDriver.shift_hours),
        past_week_hours: newDriver.past_week_hours
          .split(",")
          .map((h) => Number(h.trim())),
      };
      await axios.post("http://localhost:5000/api/drivers", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewDriver({ name: "", shift_hours: "", past_week_hours: "" });
      fetchDrivers();
    } catch (err) {
      alert("Failed to add driver");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Prepare chart data
  const chartData = drivers.map((d) => ({
    name: d.name,
    totalHours: d.past_week_hours.reduce((sum, h) => sum + h, 0),
  }));

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manager Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Intro */}
        <p className="text-gray-600 mb-8">
          Monitor driver performance, view weekly hours, and manage team schedules.
        </p>

        {/* Drivers Table */}
        <section className="shadow-lg rounded-lg overflow-hidden mb-10">
          <table className="min-w-full text-white text-sm">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-500">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">Shift Hours</th>
                <th className="px-4 py-3 text-left font-semibold">Past Week Hours</th>
              </tr>
            </thead>
            <tbody className="bg-gradient-to-r from-indigo-600 to-purple-600">
              {drivers.map((d, idx) => (
                <tr
                  key={d._id}
                  className={`hover:bg-indigo-700/50 transition ${
                    idx % 2 === 0 ? "bg-indigo-600/80" : "bg-indigo-500/80"
                  }`}
                >
                  <td className="px-4 py-3">{d.name}</td>
                  <td className="px-4 py-3">{d.shift_hours}</td>
                  <td className="px-4 py-3">{d.past_week_hours.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Recharts Graph */}
        <section className="bg-white shadow-md rounded-lg p-6 mb-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Weekly Hours Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalHours" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        {/* Add Driver Form */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Add New Driver
          </h3>
          <form
            onSubmit={addDriver}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={newDriver.name}
                onChange={(e) =>
                  setNewDriver({ ...newDriver, name: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shift Hours
              </label>
              <input
                type="number"
                value={newDriver.shift_hours}
                onChange={(e) =>
                  setNewDriver({ ...newDriver, shift_hours: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Past Week Hours (comma separated)
              </label>
              <input
                type="text"
                value={newDriver.past_week_hours}
                onChange={(e) =>
                  setNewDriver({
                    ...newDriver,
                    past_week_hours: e.target.value,
                  })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="md:col-span-3 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Add Driver
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
