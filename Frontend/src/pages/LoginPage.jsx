import React, { useState } from "react";
import axios from "../api/api.js";
import { useNavigate } from "react-router";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/auth/login", credentials, {
        withCredentials: true,
      });
      if (res.status === 200) {
        navigate("/admin");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1120] flex justify-center items-center px-4">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 text-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        {error && <p className="text-red-500 mb-3">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1 text-sm">Username</label>
          <input
            type="text"
            required
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm">Password</label>
          <input
            type="password"
            required
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
