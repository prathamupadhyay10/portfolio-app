import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

function Hero() {
  return (
    <section className="relative min-h-[105vh] flex items-center justify-center bg-black overflow-hidden select-none">

      {/* Subtle Background Gradient Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-yellow-400/10 rounded-full blur-[120px]"
        ></motion.div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-yellow-400/10 rounded-full blur-[150px]"
        ></motion.div>
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8"
        >
          <Sparkles size={14} className="text-yellow-400" />
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-[0.3em] text-gray-300">Flutter and Full Stack Developer </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-medium text-white leading-none tracking-tighter mb-6 sm:mb-8"
        >
          Building Beyond <br />
          <span className="text-yellow-400">Expectations.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="text-gray-400 text-base sm:text-lg md:text-2xl font-medium max-w-3xl mx-auto mb-10 sm:mb-12 leading-relaxed"
        >
          Specializing in Flutter development and MERN stack architectures.
          I engineer powerful digital experiences with precision and passion.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <a
            href="#projects"
            className="group relative flex items-center gap-3 bg-white text-black px-10 py-5 rounded-2xl font-bold text-lg hover:bg-yellow-400 transition-all duration-300 hover:shadow-[0_0_40px_rgba(250,204,21,0.3)] hover:translate-y-[-2px] active:scale-95"
          >
            Explore Projects
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform duration-300" />
          </a>

          <a
            href="#contact"
            className="text-gray-300 font-bold hover:text-white transition-all duration-300 underline decoration-yellow-400 decoration-2 underline-offset-8 hover:decoration-4"
          >
            Get In Touch
          </a>
        </motion.div>

      </div>

      {/* Decorative Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[2px] h-12 bg-gradient-to-b from-white to-transparent"
        ></motion.div>
      </motion.div>

    </section>
  );
}

export default Hero;
