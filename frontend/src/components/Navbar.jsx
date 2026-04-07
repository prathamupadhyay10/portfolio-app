import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { User, LogOut, LayoutDashboard, FileText, Home as HomeIcon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    setIsOpen(false);
  };

  const navLinks = [
    { title: "Home", path: "/", icon: <HomeIcon size={16} /> },
    { title: "Blogs", path: "/blogs", icon: <FileText size={16} /> },
  ];

  return (
    <div className="fixed top-0 w-full bg-black/40 backdrop-blur-xl border-b border-white/10 z-[100]">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4">

        <Link to="/" className="text-xl sm:text-2xl font-bold text-yellow-400 hover:scale-110 transition">
          PRATHAM
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-8 items-center text-sm font-medium text-gray-400">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="relative flex items-center gap-1 hover:text-white transition-colors group py-1"
            >
              <span className="group-hover:text-yellow-400 transition-colors">{link.icon}</span>
              {link.title}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}

          {isAuthenticated && user?.role === "admin" && (
            <>
              <Link to="/dashboard" className="flex items-center gap-1 hover:text-white transition group py-1">
                <LayoutDashboard size={16} className="group-hover:text-yellow-400" /> Dashboard
              </Link>
              <div className="h-6 w-[1px] bg-white/10 mx-2"></div>
            </>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <User size={16} className="text-yellow-400" />
                <span className="text-white text-xs font-semibold">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500/10 text-red-500 p-2 rounded-full hover:bg-red-500 hover:text-white transition duration-300"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-white text-black px-6 py-2 rounded-full text-xs font-bold hover:bg-yellow-400 hover:text-black transition duration-300 uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.05)]">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white p-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6 text-sm font-medium text-gray-400">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-white">
                  <span className="text-yellow-400">{link.icon}</span> {link.title}
                </Link>
              ))}

              {isAuthenticated && user?.role === "admin" && (
                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:text-white">
                  <LayoutDashboard size={16} className="text-yellow-400" /> Dashboard
                </Link>
              )}

              {isAuthenticated ? (
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User size={16} className="text-yellow-400" />
                    <span className="text-white font-bold">{user?.name}</span>
                  </div>
                  <button onClick={handleLogout} className="text-red-500 flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest">
                    Logout <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="w-full bg-white text-black py-4 rounded-2xl text-center font-bold uppercase tracking-widest text-xs">
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
