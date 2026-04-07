import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import API from "../utils/axios";
import { Calendar, User, Clock, Eye, ArrowLeft, Loader2, Share2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/slug/${slug}`);
        setPost(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching post", err);
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="animate-spin text-yellow-400" size={48} />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
        <h2 className="text-4xl font-bold mb-6">Post Not Found 🔍</h2>
        <Link to="/blogs" className="text-yellow-400 hover:underline">Back to Articles</Link>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      
      {/* Header Section */}
      <div className="relative pt-40 pb-20 px-6">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-yellow-400/10 blur-[120px] rounded-full -z-0"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8">
          <Link to="/blogs" className="inline-flex items-center gap-2 text-yellow-400 font-bold text-xs uppercase tracking-widest hover:translate-x-[-4px] transition">
            <ArrowLeft size={16} /> Back to Insights
          </Link>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap justify-center items-center gap-8 text-sm font-bold text-gray-500">
            <span className="flex items-center gap-2"><User size={16} className="text-yellow-400" /> {post.author?.name}</span>
            <span className="flex items-center gap-2"><Calendar size={16} className="text-yellow-400" /> {new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="flex items-center gap-2"><Eye size={16} className="text-yellow-400" /> {post.views} Views</span>
            <span className="flex items-center gap-2"><Clock size={16} className="text-yellow-400" /> 5 min read</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pb-40">
        
        {/* Featured Image */}
        {post.coverImage && (
          <div className="aspect-[21/9] rounded-[40px] overflow-hidden mb-20 border border-white/10 ring-1 ring-white/10 shadow-2xl">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content Body */}
        <article className="prose prose-invert prose-yellow max-w-none prose-headings:font-bold prose-p:text-gray-400 prose-p:leading-relaxed prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Share */}
        <div className="mt-20 pt-10 border-t border-white/5 flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-600">Tags</p>
            <div className="flex gap-2">
              {post.tags?.map((tag, i) => (
                <span key={i} className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
          <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-6 py-3 rounded-2xl transition border border-white/10 text-sm font-bold">
            <Share2 size={16} /> Share Article
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default PostDetail;
