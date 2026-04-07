import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import API from "../utils/axios";
import { User, Mail, Lock, Save, Loader2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Settings() {
  const { user, checkAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.put("/auth/profile", formData);
      toast.success("Profile Updated Successfully! 👤");
      await checkAuth(); // Refresh user data in store
    } catch (err) {
      toast.error(err.response?.data?.msg || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white pt-32 px-6">
      <Navbar />
      
      <div className="max-w-3xl mx-auto space-y-12">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-yellow-400 font-bold text-xs uppercase tracking-widest hover:-translate-x-2 transition">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Account <span className="text-yellow-400">Settings.</span></h1>
          <p className="text-gray-500 font-medium">Update your digital identity and secure your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-10 rounded-[40px] space-y-8 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 blur-[80px]"></div>

          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                <User size={14} className="text-yellow-400" /> Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-yellow-400/50 transition duration-300"
              />
            </div>

            {/* Email */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                <Mail size={14} className="text-yellow-400" /> Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-yellow-400/50 transition duration-300"
              />
            </div>

            {/* Password */}
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                <Lock size={14} className="text-yellow-400" /> New Password (Leave blank to keep current)
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-yellow-400/50 transition duration-300"
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white text-black py-6 rounded-2xl font-bold text-lg hover:bg-yellow-400 hover:text-black disabled:bg-gray-800 transition-all duration-500 shadow-xl active:scale-95"
          >
            {loading ? <Loader2 size={24} className="animate-spin" /> : <><Save size={20} /> Update Account</>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Settings;
