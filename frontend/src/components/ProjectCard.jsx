import { ExternalLink, Github } from "lucide-react";

function ProjectCard({ project }) {
  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-yellow-400/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(250,204,21,0.15)] hover:-translate-y-2 ease-[cubic-bezier(0.23,1,0.32,1)]">
      
      {/* Image Placeholder */}
      <div className="aspect-video bg-gradient-to-br from-yellow-900/20 to-black overflow-hidden relative">
        <img 
          src={project.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"} 
          alt={project.title}
          className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
      </div>

      <div className="p-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags?.map((tag, i) => (
            <span key={i} className="text-[10px] font-bold uppercase tracking-widest text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          {project.desc}
        </p>

        <div className="flex gap-4">
          <a 
            href={project.live} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 text-xs font-bold text-black bg-yellow-400 px-5 py-2.5 rounded-xl hover:bg-yellow-500 transition shadow-lg shadow-yellow-500/20"
          >
            <ExternalLink size={14} /> Live Demo
          </a>
          <a 
            href={project.github} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 text-xs font-bold text-gray-300 bg-white/5 px-5 py-2.5 rounded-xl hover:bg-white/10 transition border border-white/10"
          >
            <Github size={14} /> Source
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
