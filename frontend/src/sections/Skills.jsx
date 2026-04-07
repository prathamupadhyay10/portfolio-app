import { Layout, Server, Database, Github, Cpu, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    icon: <Layout className="text-yellow-400" />,
    items: [
      { name: "React / Next.js", level: "83%" },
      { name: "Flutter / Dart", level: "91%" },
      { name: "Tailwind CSS", level: "85%" },
      { name: "JavaScript / TS", level: "80%" },
    ],
  },
  {
    title: "Backend",
    icon: <Server className="text-yellow-400" />,
    items: [
      { name: "Node.js / Express", level: "85%" },
      { name: "ASP.NET Core", level: "80%" },
      { name: "REST APIs", level: "90%" },
      { name: "JWT / Auth", level: "85%" },
    ],
  },
  {
    title: "Database & Cloud",
    icon: <Database className="text-yellow-400" />,
    items: [
      { name: "MongoDB", level: "85%" },
      { name: "Firebase", level: "92%" },
      { name: "SQL Server", level: "73%" },
      { name: "Cloudinary", level: "80%" },
    ],
  },
  {
    title: "Tools & DevOps",
    icon: <Cpu className="text-yellow-400" />,
    items: [
      { name: "Git / GitHub", level: "90%" },
      { name: "Docker", level: "70%" },
      { name: "Vite / Webpack", level: "80%" },
      { name: "Postman", level: "90%" },
    ],
  },
];

function Skills() {
  return (
    <section id="skills" className="bg-gray-950 text-white py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >

        <div className="text-center mb-12 sm:mb-20 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-yellow-500 bg-clip-text text-transparent">
            Technical Stack
          </h2>
          <p className="text-gray-400 text-base sm:text-lg font-medium max-w-2xl mx-auto">
            Tools and technologies I use to bring powerful digital ideas to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((cat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-500 group">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-white/10 group-hover:ring-yellow-400/50 transition">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold mb-6 text-white group-hover:text-yellow-400 transition">{cat.title}</h3>

              <div className="space-y-5">
                {cat.items.map((skill, j) => (
                  <div key={j} className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-gray-400">
                      <span>{skill.name}</span>
                      <span className="text-yellow-400">{skill.level}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: skill.level }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        className="h-full bg-yellow-400 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}

export default Skills;
