import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, Loader2, MapPin, Phone } from "lucide-react";
import toast from "react-hot-toast";
import API from "../utils/axios";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return toast.error("Please provide all details");

    setIsSubmitting(true);
    try {
      await API.post("/messages", formData);
      toast.success("Message received! I will get back to you soon. 📩");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(err.response?.data?.msg || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-gray-950 text-white py-32 px-6 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20"
      >
        
        {/* Info */}
        <div className="flex-1 space-y-8 sm:space-y-12">
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-yellow-500 bg-clip-text text-transparent">
              Let's Create <br /> Something Great.
            </h2>
            <p className="text-gray-400 text-base sm:text-lg font-medium max-w-md">
              Have a project in mind or just want to chat? Reach out and I'll respond within 24 hours.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-4 sm:gap-6 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:border-yellow-400/50 transition duration-500">
                <Mail size={20} className="sm:size-[24px] text-yellow-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Email Me</p>
                <p className="text-base sm:text-lg font-bold break-all">prathamupadhyay1122@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:border-yellow-400/50 transition duration-500">
                <Linkedin size={20} className="sm:size-[24px] text-yellow-400" />
              </div>
              <a 
                href="https://www.linkedin.com/in/pratham-upadhyay-328874228/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Let's Connect</p>
                <p className="text-base sm:text-lg font-bold hover:text-yellow-400 transition">LinkedIn Profile</p>
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-6 sm:p-10 rounded-[30px] sm:rounded-[40px] space-y-4 sm:space-y-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 blur-[80px] transition-all duration-700"></div>
            
            <div className="space-y-2 sm:space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Name</label>
              <input
                type="text"
                placeholder="Pratham Upadhyay"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-white placeholder-gray-600 outline-none focus:border-yellow-400/50 focus:shadow-[0_0_20px_rgba(250,204,21,0.1)] transition-all duration-300 text-sm sm:text-base"
              />
            </div>

            <div className="space-y-2 sm:space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Email Address</label>
              <input
                type="email"
                placeholder="pratham@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-white placeholder-gray-600 outline-none focus:border-yellow-400/50 focus:shadow-[0_0_20px_rgba(250,204,21,0.1)] transition-all duration-300 text-sm sm:text-base"
              />
            </div>

            <div className="space-y-2 sm:space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Message</label>
              <textarea
                placeholder="Tell me about your project..."
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-white placeholder-gray-600 outline-none focus:border-yellow-400/50 focus:shadow-[0_0_20px_rgba(250,204,21,0.1)] transition-all duration-300 resize-none text-sm sm:text-base"
              ></textarea>
            </div>

            <button
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 bg-white text-black py-6 rounded-2xl font-bold text-lg hover:bg-yellow-400 hover:text-black disabled:bg-gray-800 transition-all duration-500 shadow-xl hover:shadow-yellow-400/20 active:scale-95 hover:scale-[1.02] hover:-translate-y-1"
            >
              {isSubmitting ? (
                <Loader2 size={24} className="animate-spin" />
              ) : (
                <>
                  <Send size={20} /> Send Inquiry
                </>
              )}
            </button>
          </form>
        </div>

      </motion.div>
    </section>
  );
}

export default Contact;
