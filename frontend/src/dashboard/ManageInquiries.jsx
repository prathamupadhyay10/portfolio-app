import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../utils/axios";
import { Mail, Trash2, CheckCircle, ArrowLeft, Loader2, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

function ManageInquiries() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await API.get("/messages");
      setMessages(res.data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load inquiries");
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await API.put(`/messages/${id}/read`);
      toast.success("Marked as read");
      fetchMessages();
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this inquiry permanentely?")) return;
    try {
      await API.delete(`/messages/${id}`);
      toast.success("Inquiry deleted");
      fetchMessages();
    } catch (err) {
      toast.error("Deletion failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="animate-spin text-yellow-400" size={48} />
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white pt-32 px-6">
      <Navbar />
      
      <div className="max-w-7xl mx-auto space-y-12 pb-20">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-yellow-400 font-bold text-xs uppercase tracking-widest hover:-translate-x-2 transition">
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Inquiry <span className="text-yellow-400">Center.</span></h1>
          <p className="text-gray-500 font-medium">Manage your incoming project requests and messages.</p>
        </div>

        <div className="grid gap-6">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div key={msg._id} className={`bg-white/5 border border-white/10 p-8 rounded-[32px] flex flex-col md:flex-row gap-8 items-start hover:border-yellow-400/50 transition-all duration-500 ${msg.status === 'unread' ? 'ring-1 ring-yellow-400/30' : ''}`}>
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                    <span className="flex items-center gap-2 text-yellow-400"><Mail size={14} /> {msg.email}</span>
                    <span className="flex items-center gap-2 text-gray-700">{new Date(msg.createdAt).toLocaleString()}</span>
                    {msg.status === 'unread' && <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-[8px] font-bold">New Inquiry</span>}
                  </div>
                  <h3 className="text-xl font-bold">{msg.name}</h3>
                  <p className="text-gray-400 leading-relaxed italic">"{msg.message}"</p>
                </div>

                <div className="flex md:flex-col gap-3">
                  {msg.status === 'unread' && (
                    <button
                      onClick={() => handleMarkAsRead(msg._id)}
                      className="p-4 bg-yellow-400 text-black hover:bg-yellow-500 rounded-2xl transition shadow-lg shadow-yellow-400/20"
                      title="Mark as Read"
                    >
                      <CheckCircle size={20} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="p-4 bg-white/5 hover:bg-red-600 rounded-2xl border border-white/10 transition"
                    title="Delete Inquiry"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-40 text-center flex flex-col items-center gap-6 bg-white/5 rounded-[40px] border border-white/10">
              <MessageSquare size={48} className="text-gray-800" />
              <p className="text-gray-600 font-bold uppercase tracking-widest text-xs">Your inbox is currently empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageInquiries;
