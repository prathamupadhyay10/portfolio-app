import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import gadgetIcon from "../assets/icon.png";
import candyIcon from "../assets/candy_crush.png";

const projects = [
  {

    title: "Gym Food Delivery App",
    desc: "A full-featured mobile app built with Flutter and Firebase for seamless meal prep ordering and delivery tracking.",
    tags: ["Flutter", "Firebase", "Stripe"],
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop",
    github: "#",
    live: "#"
  },
  {
    title: "Gadget Inventory App",
    desc: "A robust inventory and sales management app built with Flutter and Firebase featuring real-time stock updates, weighted average cost calculation, due payment tracking, and role-based authentication with offline-first support.",
    tags: ["Flutter", "Firebase", "Android", "Firestore"],
    image: gadgetIcon,
    github: "#",
    live: "#"
  },
  {
    title: "Jet Fighter F-86 Game",
    desc: "An action-packed 2D jet fighter game developed using Unity and C# with joystick-based controls, intelligent missile tracking, collision detection, and integrated sound, vibration, and explosion effects, delivered as a complete Android game.",
    tags: ["Unity", "C#", "Android", "Game Development"],
    image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2070&auto=format&fit=crop",
    github: "#",
    live: "#"
  },
  {
    title: "Candy Crush Clone",
    desc: "A dynamic match-3 puzzle game developed using React.js, Node.js, and Express with drag-and-drop tile interactions, automatic match detection, server-driven validation, and a looping grid system for continuous gameplay.",
    tags: ["React.js", "Node.js", "Express", "Game Development"],
    image: candyIcon,
    github: "#",
    live: "#"
  },
  {
    title: "Spotify Clone",
    desc: "Personalized music streaming experience using the Spotify API. Features dark mode, playlist management, and real-time playback.",
    tags: ["React", "Spotify API", "Tailwind"],
    image: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=2070&auto=format&fit=crop",
    github: "#",
    live: "#"
  },
  {
    title: "Grocery Store Dashboard",
    desc: "Comprehensive admin dashboard for inventory management, sales analytics, and order fulfillment in the retail sector.",
    tags: ["ASP.NET", "MVC", "SQL Server"],
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2070&auto=format&fit=crop",
    github: "#",
    live: "#"
  },
];

function Projects() {
  return (
    <section id="projects" className="bg-black text-white py-32 px-6">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-20 space-y-3 sm:space-y-4"
        >
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium bg-gradient-to-r from-white to-yellow-400 bg-clip-text text-transparent">
            Selected Works
          </h2>
          <p className="text-gray-400 text-base sm:text-lg font-medium max-w-2xl mx-auto">
            A showcase of my recent projects, featuring full-stack development, mobile apps, and UI/UX design.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default Projects;
