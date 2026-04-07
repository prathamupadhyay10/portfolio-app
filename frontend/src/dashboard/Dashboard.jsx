import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import API from "../utils/axios";
import {
  BarChart3,
  FileText,
  Settings,
  Plus,
  ArrowRight,
  Rocket,
  Globe,
  Zap,
  MessageSquare
} from "lucide-react";
import Navbar from "../components/Navbar";

function Dashboard() {
  const { user } = useAuthStore();
  const [data, setData] = useState({
    posts: 0,
    views: 0,
    messages: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/auth/stats");
        setData(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { title: "Articles Published", value: data.posts.toString(), icon: <FileText className="text-yellow-400" />, trend: "Total count" },
    { title: "Total Portfolio Views", value: data.views >= 1000 ? `${(data.views / 1000).toFixed(1)}K` : data.views.toString(), icon: <BarChart3 className="text-yellow-400" />, trend: "Lifetime views" },
    { title: "Active Inquiries", value: data.messages.toString(), icon: <MessageSquare className="text-yellow-400" />, trend: "Unread messages" },
  ];

  return (
    <div className="bg-black min-h-screen text-white pt-32 px-6">
      <Navbar />

      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              Welcome Back, <span className="text-yellow-400">{user?.name?.split(' ')[0]}!</span>
            </h1>
            <p className="text-gray-500 font-medium">Here's an overview of your digital presence and content performance.</p>
          </div>
          <Link
            to="/new-post"
            className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-yellow-400 transition-all duration-500 shadow-xl"
          >
            <Plus size={18} /> Compose New Story
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[40px] space-y-4 relative overflow-hidden group hover:border-yellow-400/50 transition-all duration-500">
              <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400/10 blur-[60px] opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">{stat.title}</p>
                <h3 className="text-4xl font-bold">{stat.value}</h3>
              </div>
              <p className="text-xs font-bold text-gray-600 flex items-center gap-2">
                <Rocket size={12} className="text-yellow-400" /> {stat.trend}
              </p>
            </div>
          ))}
        </div>

        {/* Action Center */}
        <div className="grid lg:grid-cols-2 gap-12 pt-12">

          {/* Quick Shortcuts */}
          <div className="space-y-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-600 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-gray-900"></span> Command Center
            </h3>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { label: "Manage Articles", path: "/manage-posts", icon: <FileText size={20} />, color: "bg-yellow-600" },
                { label: "Project Inquiries", path: "/manage-inquiries", icon: <MessageSquare size={20} />, color: "bg-yellow-700" },
                { label: "Account Settings", path: "/settings", icon: <Settings size={20} />, color: "bg-amber-600" },
                { label: "View Public Site", path: "/", icon: <ArrowRight size={20} />, color: "bg-gray-800" }
              ].map((link, i) => (
                <Link
                  key={i}
                  to={link.path}
                  className="flex items-center justify-between p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 ${link.color} rounded-xl flex items-center justify-center text-white`}>
                      {link.icon}
                    </div>
                    <span className="font-bold text-sm">{link.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* User Profile Card */}
          <div className="space-y-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-600 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-gray-900"></span> Administrator
            </h3>

            <div className="bg-gradient-to-br from-yellow-900/20 to-black border border-yellow-500/20 p-10 rounded-[40px] flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
              <div className="absolute top-[-50%] left-[-20%] w-[400px] h-[400px] bg-yellow-600/10 blur-[100px] rounded-full"></div>

              <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-2 border-yellow-500 p-1 bg-black">
                <img src={`https://ui-avatars.com/api/?name=${user?.name || "User"}&background=facc15&color=000`} alt="Avatar" className="w-full h-full object-cover rounded-2xl" />
              </div>

              <div className="space-y-4 text-center md:text-left relative">
                <div>
                  <h4 className="text-2xl font-bold">{user?.name}</h4>
                  <p className="text-yellow-400 font-bold text-xs uppercase tracking-widest">{user?.role || "Lead Developer"}</p>
                </div>
                <Link to="/settings" className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition inline-block">Update Profile &rarr;</Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;
