import { Download, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import profileImg from "../assets/profile.jpg";

function About() {
  return (
    <section id="about" className="bg-black text-white py-32 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 overflow-hidden">

        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative group w-full max-w-md lg:max-w-none"
        >
          <div className="absolute inset-0 bg-yellow-400/10 rounded-3xl blur-2xl opacity-10 group-hover:opacity-30 transition-all duration-700"></div>
          <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 ring-1 ring-white/10 p-2 bg-white/5 shadow-2xl">
            <img
              src={profileImg}
              alt="Pratham"
              className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 hover:scale-110"
            />
          </div>
        </motion.div>

        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-6 sm:space-y-8"
        >
          <div className="space-y-3 sm:space-y-4 text-center lg:text-left">
            <span className="text-yellow-400 font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs">A Little Bit About Me</span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium text-white leading-tight">
              Building Beyond Expectations. <br className="hidden sm:block" /><span className="text-yellow-400">Crafting modern digital experiences</span> with precision.
            </h2>
          </div>

          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            I'm Pratham, a passionate Flutter & MERN Stack Developer who loves building beautiful
            and scalable applications. With over 1.5 years of experience in the digital realm,
            I focus on creating high-performance apps with clean UI and real-world impact.
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start">
            {["Quick Learner", "Problem Solver", "Goal Oriented", "Creative Thinker"].map((trait, i) => (
              <span key={i} className="flex items-center gap-2 bg-white/5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/10 text-[10px] sm:text-xs font-medium text-gray-300 hover:border-yellow-400/50 transition duration-300">
                <Sparkles size={12} className="text-yellow-400" /> {trait}
              </span>
            ))}
          </div>

          <div className="pt-4 sm:pt-6 text-center lg:text-left">
            <a
              href="https://drive.google.com/file/d/1lMU8OA8vmfUGZS7w0QK_aiRkMIfWKsM0/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 bg-white text-black px-6 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl font-medium hover:bg-yellow-400 hover:text-black transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-yellow-400/20 active:scale-95 text-sm sm:text-base"
            >
              <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
              Download Resume
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default About;
