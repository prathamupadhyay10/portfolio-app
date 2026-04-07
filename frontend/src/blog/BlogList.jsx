import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../utils/axios";
import { Search, Calendar, User, ArrowRight, Loader2, Plus } from "lucide-react";
import useAuthStore from "../store/useAuthStore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CATEGORIES = ["All", "Flutter", "React", "Node.js", "Design", "Career"];

function BlogList() {
  const { user } = useAuthStore();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/posts");
        setBlogs(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blogs", err);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || 
      blog.tags?.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()));
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      
      {/* Blog Hero */}
      <div className="pt-40 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">
            Insights & <span className="text-yellow-400">Ideas.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            A collection of thoughts on software engineering, product design, and everything in between.
          </p>

          {user?.role === "admin" && (
            <div className="pt-4">
              <Link 
                to="/new-post" 
                className="inline-flex items-center gap-3 bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-yellow-500 transition shadow-lg shadow-yellow-400/20 active:scale-95"
              >
                <Plus size={20} /> Create New Post
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between bg-white/5 border border-white/10 p-4 rounded-3xl backdrop-blur-xl">
          
          {/* Search */}
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-yellow-400/50 transition"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  selectedCategory === cat 
                    ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/40" 
                    : "bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-40">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-yellow-400" size={48} />
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredBlogs.map((blog) => (
              <div key={blog._id} className="group flex flex-col bg-white/5 border border-white/10 rounded-[32px] overflow-hidden hover:border-yellow-400/50 transition-all duration-500">
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img 
                    src={blog.coverImage || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"} 
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                
                {/* Info */}
                <div className="p-8 space-y-4 flex flex-col h-full">
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    <span className="text-yellow-400">{new Date(blog.createdAt).toLocaleDateString()}</span>
                    <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                    <span>{blog.author?.name}</span>
                  </div>

                  <h3 className="text-2xl font-bold group-hover:text-yellow-400 transition line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {blog.excerpt || "Discover the latest trends and architectural patterns in modern application development..."}
                  </p>

                  <div className="mt-auto pt-6 flex items-center justify-between">
                    <Link 
                      to={`/post/${blog.slug}`} 
                      className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:text-yellow-400 hover:translate-x-1 transition"
                    >
                      Read Story <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-white/5 rounded-[40px] border border-white/10">
            <h3 className="text-2xl font-bold text-gray-500">No articles found matching your criteria.</h3>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default BlogList;
