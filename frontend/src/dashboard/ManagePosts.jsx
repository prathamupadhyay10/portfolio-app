import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/axios";
import { Edit2, Trash2, Plus, Loader2, FileText, LayoutDashboard, Search } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

function ManagePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load articles");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this story?")) return;

    try {
      await API.delete(`/posts/${id}`);
      toast.success("Article deleted 🗑️");
      fetchPosts();
    } catch (err) {
      toast.error("Deletion failed");
    }
  };

  const filteredPosts = posts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="animate-spin text-yellow-400" size={48} />
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white pt-32 px-6 pb-20">
      <Navbar />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Manage <span className="text-yellow-400">Content.</span></h2>
            <p className="text-gray-500 font-medium">Draft, edit, and orchestrate your collection of stories.</p>
          </div>
          
          <Link
            to="/new-post"
            className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-yellow-400 transition-all duration-500"
          >
            <Plus size={18} /> New Story
          </Link>
        </div>

        {/* Search & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-3 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Filter by title..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-yellow-400/50 transition"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-2xl p-4 flex flex-col justify-center items-center">
            <span className="text-[10px] font-bold uppercase text-yellow-400 mb-1">Total Articles</span>
            <span className="text-2xl font-bold">{posts.length}</span>
          </div>
        </div>

        {/* List */}
        <div className="bg-white/5 border border-white/10 rounded-[32px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500">
                  <th className="px-8 py-6">Article</th>
                  <th className="px-8 py-6 text-center">Status</th>
                  <th className="px-8 py-6 text-center">Views</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredPosts.map((post) => (
                  <tr key={post._id} className="hover:bg-white-[0.02] group transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center font-bold text-gray-600 border border-white/5">
                           {post.title.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-200 group-hover:text-yellow-400 transition">{post.title}</p>
                          <p className="text-xs text-gray-600 mt-1">{new Date(post.createdAt).toDateString()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          post.status === 'published' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                        }`}>
                          {post.status || 'Published'}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center font-bold text-gray-500 text-sm">{post.views}</td>
                    <td className="px-8 py-6">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => navigate(`/blog/edit/${post._id}`)}
                          className="p-3 bg-white/5 rounded-xl text-gray-400 hover:bg-yellow-400 hover:text-black transition duration-300"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="p-3 bg-white/5 rounded-xl text-gray-400 hover:bg-red-600 hover:text-white transition duration-300"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center gap-4">
              <FileText size={48} className="text-gray-800" />
              <p className="text-gray-600 font-bold uppercase tracking-widest text-xs">No matching articles found</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default ManagePosts;
