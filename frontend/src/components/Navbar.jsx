import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  LogIn,
  Home,
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAdminLoginPage = location.pathname === "/admin/login";
  const isAdminDashboard = location.pathname === "/admin/dashboard";
  const isFeedbackPage = location.pathname === "/";

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully 👋");
    navigate("/admin/login");
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
        >
          Feedback<span className="text-gray-600">System</span>
        </Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4">
          {isFeedbackPage && (
            <Link
              to="/admin/login"
              className="bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600 transition flex items-center gap-1"
            >
              <LogIn className="w-4 h-4" />
              Admin Login
            </Link>
          )}

          {isAdminLoginPage && (
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition font-medium flex items-center gap-1"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
          )}

          {isAdminDashboard && (
            <>
              <Link
                to="/admin/dashboard"
                className="text-gray-700 hover:text-blue-600 transition font-medium flex items-center gap-1"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 transition flex items-center gap-1"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu - Dropdown under hamburger on right */}
<AnimatePresence>
  {menuOpen && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute right-4 top-16 bg-white shadow-lg border rounded-md p-4 w-48 z-50 flex flex-col items-start gap-3"
    >
      {isFeedbackPage && (
        <Link
          to="/admin/login"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
        >
          <LogIn className="w-4 h-4" />
          Admin Login
        </Link>
      )}

      {isAdminLoginPage && (
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
        >
          <Home className="w-5 h-5" />
          Home
        </Link>
      )}

      {isAdminDashboard && (
        <>
          <Link
            to="/admin/dashboard"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </>
      )}
    </motion.div>
  )}
</AnimatePresence>

    </nav>
  );
};

export default Navbar;
