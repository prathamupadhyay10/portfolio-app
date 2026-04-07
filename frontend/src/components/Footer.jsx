import { Link } from "react-router-dom";
import { Github, Linkedin, Instagram, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-black text-white py-20 px-6 border-t border-white/5 relative"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">

        {/* Brand & Mission */}
        <div className="space-y-6">
          <Link to="/" className="text-xl sm:text-2xl font-bold text-yellow-400 hover:scale-110 transition italic">
            PRATHAM
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Designing and developing high-performance digital experiences.
            Focused on innovation, clean code, and user-centric architecture.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Navigation</h3>
          <ul className="space-y-4 text-sm font-bold text-gray-500">
            <li><Link to="/" className="hover:text-yellow-400 transition-colors duration-300 underline-offset-4 hover:underline">Home</Link></li>
            <li><Link to="/blogs" className="hover:text-yellow-400 transition-colors duration-300 underline-offset-4 hover:underline">Articles</Link></li>
            <li><Link to="/dashboard" className="hover:text-yellow-400 transition-colors duration-300 underline-offset-4 hover:underline">Dashboard</Link></li>
            <li><a href="#projects" className="hover:text-yellow-400 transition-colors duration-300 underline-offset-4 hover:underline">Portfolio</a></li>
          </ul>
        </div>

        {/* Socials */}
        <div className="space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Connect</h3>
          <div className="flex gap-4">
            {[
              { icon: <Github size={20} />, link: "https://github.com/prathamupadhyay10" },
              { icon: <Linkedin size={20} />, link: "https://www.linkedin.com/in/pratham-upadhyay-328874228/" },
              { icon: <Instagram size={20} />, link: "https://www.instagram.com/pratham.j.upadhyay/" }
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              >
                {social.icon}
              </a>
            ))}
          </div>
          <p className="text-xs text-gray-600 font-medium">prathamupadhyay1122@gmail.com</p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold text-gray-600 uppercase tracking-widest">
        <p>© 2026 Pratham Upadhyay. All Rights Reserved.</p>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 hover:text-white transition-colors duration-300 group"
        >
          Back To Top <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform duration-300" />
        </button>
      </div>

    </motion.footer>
  );
}

export default Footer;
