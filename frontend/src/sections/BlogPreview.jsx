import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../utils/axios";
import { Calendar, User, ArrowRight, Loader2 } from "lucide-react";

function BlogPreview() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await API.get("/posts?limit=3");
        setBlogs(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching latest blogs", err);
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  return (
    <section className="bg-black text-white py-32 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-20 gap-6 sm:gap-8">
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-yellow-500 bg-clip-text text-transparent">
              Latest Insights
            </h2>
            <p className="text-gray-400 text-base sm:text-lg font-medium max-w-xl">
              Thoughts on technology, design, and the future of web and mobile development.
            </p>
          </div>
          <Link
            to="/blogs"
            className="group flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl font-bold hover:bg-white hover:text-black transition-all duration-300 text-sm sm:text-base"
          >
            View All Articles
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-yellow-400" size={48} />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div key={blog._id} className="group bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col hover:border-yellow-400/50 transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_20px_50px_rgba(250,204,21,0.1)] ease-[cubic-bezier(0.23,1,0.32,1)]">
                
                <div className="flex items-center gap-4 text-xs font-bold text-gray-500 mb-6 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><User size={12} className="text-yellow-400" /> {blog.author?.name}</span>
                  <span className="flex items-center gap-1.5"><Calendar size={12} className="text-yellow-400" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-yellow-400 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3">
                  {blog.excerpt || "Dive into this article to explore advanced concepts and practical implementations of modern technology..."}
                </p>

                <div className="mt-auto pt-6 border-t border-white/5">
                  <Link 
                    to={`/post/${blog.slug}`} 
                    className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-yellow-400 transition"
                  >
                    Read Full Article <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default BlogPreview;
