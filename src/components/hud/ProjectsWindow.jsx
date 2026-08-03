import React from 'react';
import { useAetherStore } from '../../store/useAetherStore';
import { X, Database, ExternalLink, Code } from 'lucide-react';
const ProjectsWindow = () => {
  const activeWindow = useAetherStore((state) => state.activeWindow);
  const toggleWindow = useAetherStore((state) => state.toggleWindow);

  if (activeWindow !== 'projects') return null;

  const projects = [
    {
      name: "MOODIES™ ENGINE",
      type: "AI / NLP Platform",
      description: "Proprietary emotional intelligence and text analysis platform featuring real-time sentiment vectoring.",
      tech: ["Python", "FastAPI", "PyTorch", "React"],
      status: "DEPLOYED"
    },
    {
      name: "PROJECT AETHER",
      type: "WebGL / React Architecture",
      description: "Interactive 3D neural interface portfolio bridging FAANG-level frontend engineering with cinematic WebGL.",
      tech: ["Three.js", "React", "GSAP", "Tailwind v4"],
      status: "IN DEVELOPMENT"
    },
    {
      name: "ROBOTICS KINEMATICS",
      type: "Embedded ML",
      description: "Automated robotics control system built for the Codeavour 7.0 regional competition teams.",
      tech: ["C++", "Python", "Computer Vision"],
      status: "ARCHIVED"
    }
  ];

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[750px] h-[85vh] md:h-[500px] z-30 flex flex-col bg-black/80 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden shadow-2xl animate-fade-in pointer-events-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/10 border-b border-white/10">
        <div className="flex items-center gap-2 text-xs font-mono text-white">
          <Database size={14} className="text-blue-400" />
          <span>SYSTEM_ARCHIVE // PROJECT_RECORDS</span>
        </div>
        <button onClick={() => toggleWindow('projects')} className="text-red-400 hover:text-red-300">
          <X size={14} />
        </button>
      </div>

      {/* Projects Grid */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid gap-4">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group relative border border-white/10 bg-white/5 p-5 rounded-lg transition-all duration-300 hover:bg-white/10 hover:border-blue-400/50"
            >
              <div className="absolute left-0 top-0 w-1 h-full bg-blue-500 scale-y-0 origin-top transition-transform duration-300 group-hover:scale-y-100 rounded-l-lg"></div>
              
              <div className="flex justify-between items-start mb-2 pl-2">
                <div>
                  <h3 className="text-white font-mono text-sm tracking-wider">{project.name}</h3>
                  <p className="text-[10px] text-blue-400 font-mono tracking-widest">{project.type}</p>
                </div>
                <div className="flex gap-3 text-gray-400">
                  <Code size={16} className="hover:text-white cursor-pointer transition-colors" />
                  <ExternalLink size={16} className="hover:text-white cursor-pointer transition-colors" />
                </div>
              </div>
              
              <p className="text-xs text-gray-400 mt-3 pl-2 max-w-[85%] leading-relaxed">
                {project.description}
              </p>
              
              <div className="mt-4 pl-2 flex items-center justify-between">
                <div className="flex gap-2">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
                <span className={`text-[9px] font-mono tracking-widest ${
                  project.status === 'DEPLOYED' ? 'text-aether-green' : 
                  project.status === 'IN DEVELOPMENT' ? 'text-yellow-400' : 'text-gray-500'
                }`}>
                  [{project.status}]
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsWindow;