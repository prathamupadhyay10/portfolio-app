import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/axios";
import useAuthStore from "../store/useAuthStore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { 
  ArrowLeft, 
  Send, 
  Image as ImageIcon, 
  Type, 
  FileText, 
  Tag as TagIcon, 
  Eye, 
  Loader2,
  Settings
} from "lucide-react";
import toast from "react-hot-toast";

function NewPost() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const [form, setForm] = useState({
    title: "",
    content: "",
    excerpt: "",
    coverImage: "",
    tags: "",
    status: "published",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return toast.error("Title and Content are required");

    setLoading(true);
    try {
      const tagsArray = form.tags.split(",").map(t => t.trim()).filter(t => t !== "");
      await API.post("/posts", { ...form, tags: tagsArray });
      toast.success("Article Published Successfully! 🚀");
      navigate("/blogs");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans">
      
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-xl border-b border-white/5 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/manage-posts" className="p-2 hover:bg-white/5 rounded-full transition">
              <ArrowLeft size={20} />
            </Link>
            <span className="h-6 w-[1px] bg-white/10"></span>
            <h1 className="text-sm font-bold uppercase tracking-widest text-gray-400">Drafting New Story</h1>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsPreview(!isPreview)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                isPreview ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/20" : "bg-white/5 hover:bg-white/10 text-gray-400"
              }`}
            >
              <Eye size={16} /> {isPreview ? "Back to Editor" : "Live Preview"}
            </button>
            <button 
              onClick={handleSubmit}
              disabled={loading}
              className="flex items-center gap-2 bg-white text-black px-8 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-yellow-400 transition-all duration-500 disabled:bg-gray-800"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <><Send size={16} /> Publish Article</>}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Editor Interface */}
      <main className="max-w-[1600px] mx-auto pt-20 flex flex-col lg:flex-row h-[calc(100vh-80px)]">
        
        {/* Editor Side */}
        <div className={`flex-1 flex flex-col border-r border-white/5 ${isPreview ? "hidden lg:flex" : "flex"}`}>
          <div className="p-8 space-y-8 overflow-y-auto no-scrollbar">
            
            {/* Title */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-yellow-400 font-bold text-[10px] uppercase tracking-[0.2em]">
                <Type size={14} /> Post Title
              </div>
              <input 
                type="text" 
                placeholder="The Future of Distributed Computing..."
                className="w-full bg-transparent text-4xl md:text-5xl font-bold text-white focus:outline-none placeholder-gray-800"
                value={form.title}
                onChange={(e) => setForm({...form, title: e.target.value})}
              />
            </div>

            {/* Excerpt */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-yellow-400 font-bold text-[10px] uppercase tracking-[0.2em]">
                <FileText size={14} /> Brief Excerpt
              </div>
              <textarea 
                placeholder="Hook your readers with a compelling summary..."
                className="w-full bg-transparent text-xl font-medium text-gray-500 focus:outline-none placeholder-gray-800 resize-none"
                rows="2"
                value={form.excerpt}
                onChange={(e) => setForm({...form, excerpt: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image URL */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-yellow-400 font-bold text-[10px] uppercase tracking-[0.2em]">
                  <ImageIcon size={14} /> Featured Image URL
                </div>
                <input 
                  type="text" 
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-medium text-gray-300 outline-none focus:border-yellow-400/50 transition"
                  value={form.coverImage}
                  onChange={(e) => setForm({...form, coverImage: e.target.value})}
                />
              </div>

              {/* Tags */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-yellow-400 font-bold text-[10px] uppercase tracking-[0.2em]">
                  <TagIcon size={14} /> Categories (comma separated)
                </div>
                <input 
                  type="text" 
                  placeholder="React, Architecture, UI/UX"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-medium text-gray-300 outline-none focus:border-yellow-400/50 transition"
                  value={form.tags}
                  onChange={(e) => setForm({...form, tags: e.target.value})}
                />
              </div>
            </div>

            {/* Markdown Body */}
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-3 text-yellow-400 font-bold text-[10px] uppercase tracking-[0.2em]">
                <Settings size={14} /> Markdown Content
              </div>
              <textarea 
                placeholder="Write your story here using Markdown..."
                className="w-full h-[600px] bg-white/5 border border-white/10 rounded-3xl p-8 text-gray-400 font-mono text-base leading-relaxed focus:border-yellow-400/50 transition resize-none outline-none"
                value={form.content}
                onChange={(e) => setForm({...form, content: e.target.value})}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Preview Side */}
        <div className={`flex-1 bg-[#050505] overflow-y-auto ${isPreview ? "flex flex-col" : "hidden lg:flex flex-col"}`}>
          <div className="p-12 md:p-20">
            <div className="text-gray-700 font-bold text-[10px] uppercase tracking-[0.3em] mb-12 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-gray-900"></span>
              Modern Reader View
            </div>

            {/* Simulated Post Detail */}
            <div className="max-w-3xl mx-auto space-y-12">
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                {form.title || "Untitled Masterpiece"}
              </h1>
              
              <div className="flex items-center gap-8 text-xs font-bold text-gray-600 uppercase tracking-widest">
                <span>By {user?.name}</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>

              {form.coverImage && (
                <div className="aspect-video rounded-3xl overflow-hidden grayscale opacity-50 border border-white/5">
                  <img src={form.coverImage} alt="Cover" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="prose prose-invert prose-yellow max-w-none prose-p:text-gray-500 prose-p:leading-relaxed prose-headings:font-bold">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {form.content || "Your amazing content will appear here..."}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>

      </main>

    </div>
  );
}

export default NewPost;
