// import { useState } from "react";
// import api from "../services/api";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const AdminLogin = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ username: "", password: "" });

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/admin/login", form);
//       localStorage.setItem("token", res.data.token);
//       toast.success("Login successful");
//       navigate("/admin/dashboard");
//     } 
//     catch (err) {
//   console.error(err); // <-- This tells ESLint that you're using "err"
//   toast.error("Invalid credentials");
// } 
//   };

//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
//       <h2 className="text-xl font-bold mb-4">Admin Login</h2>
//       <form onSubmit={handleLogin} className="space-y-4">
//         <input className="w-full border p-2" placeholder="Username"
//           onChange={(e) => setForm({ ...form, username: e.target.value })} />
//         <input type="password" className="w-full border p-2" placeholder="Password"
//           onChange={(e) => setForm({ ...form, password: e.target.value })} />
//         <button className="bg-green-600 text-white px-4 py-2 rounded">Login</button>
//       </form>
//     </div>
//   );
// };

// export default AdminLogin;

import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/login", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 animate-fade-in transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6 tracking-wide">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm text-gray-700 mb-1 font-semibold">Username</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 transition">
              <FaUser className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Enter username"
                required
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
                onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                }
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-700 mb-1 font-semibold">Password</label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 transition">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Enter password"
                required
                className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-semibold shadow-md transition"
          >
            Login
          </button>
        </form>

        <p className="text-xs text-center text-gray-400 mt-4">
          Only authorized admins can access the system.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
