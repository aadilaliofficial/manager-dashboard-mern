import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80')",
      }}
    >
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md border border-white/20">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Manager Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-lg hover:from-purple-600 hover:to-indigo-600 transition"
          >
            Login
          </button>
        </form>
        <div className="flex justify-between items-center text-sm text-gray-200 mt-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Remember Me
          </label>
          <a href="#" className="hover:underline">
            Forgot Password?
          </a>
        </div>
        <p className="text-gray-200 text-center mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-purple-300 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
