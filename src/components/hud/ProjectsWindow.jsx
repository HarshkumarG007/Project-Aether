import { useState, useRef, useEffect } from 'react';
import { useAetherStore } from '../../store/useAetherStore';
import { X, Database, ExternalLink, Code, ArrowLeft } from 'lucide-react';
import projectsData from '../../data/projects.json';
import ParallaxWrapper from '../ui/ParallaxWrapper';

const TiltCard = ({ children, onClick }) => {
  const ref = useRef(null);
  const [style, setStyle] = useState({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const x = ((clientX - left) / width - 0.5) * 2;
    const y = ((clientY - top) / height - 0.5) * 2;

    const tiltX = -y * 10;
    const tiltY = x * 10;
    
    setStyle({
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'none'
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out'
    });
  };

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative border border-white/10 bg-white/5 p-5 rounded-lg hover:bg-white/10 hover:border-blue-400/50 cursor-pointer shadow-xl will-change-transform z-10"
      style={style}
    >
      {children}
    </div>
  );
};

const ProjectsWindow = () => {
  const activeWindow = useAetherStore((state) => state.activeWindow);
  const toggleWindow = useAetherStore((state) => state.toggleWindow);
  const [selectedProject, setSelectedProject] = useState(null);

  // Reset selected project if window closes
  useEffect(() => {
    if (activeWindow !== 'projects') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedProject(null);
    }
  }, [activeWindow]);

  if (activeWindow !== 'projects') return null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto">
      <ParallaxWrapper amount={15}>
        <div className="w-[95vw] md:w-[750px] h-[85vh] md:h-[500px] flex flex-col bg-black/80 backdrop-blur-lg border border-white/20 rounded-xl overflow-hidden shadow-2xl animate-fade-in">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-white/10 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-white">
              <Database size={14} className="text-blue-400" />
              <span>SYSTEM_ARCHIVE // PROJECT_RECORDS</span>
            </div>
            <button onClick={() => toggleWindow('projects')} className="text-red-400 hover:text-red-300 transition-colors">
              <X size={14} />
            </button>
          </div>

          {/* Projects Grid or Detail View */}
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar relative">
            {selectedProject ? (
              <div className="animate-fade-in h-full flex flex-col">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="flex items-center gap-2 text-gray-400 hover:text-white font-mono text-xs mb-4 w-max transition-colors"
                >
                  <ArrowLeft size={14} /> BACK TO ARCHIVE
                </button>
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-mono text-white tracking-widest">{selectedProject.title}</h2>
                  <div className="flex gap-4">
                    {selectedProject.links?.github && (
                      <a href={selectedProject.links.github} className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-xs font-mono">
                        <Code size={14}/> REPO
                      </a>
                    )}
                    {selectedProject.links?.live && (
                      <a href={selectedProject.links.live} className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-xs font-mono">
                        <ExternalLink size={14}/> LIVE
                      </a>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-gray-300 leading-relaxed max-w-2xl mb-6">
                  {selectedProject.description}
                </p>

                <div className="grid grid-cols-2 gap-6 mt-auto">
                  <div className="border border-white/10 bg-white/5 p-4 rounded-lg">
                    <h4 className="text-[10px] text-gray-400 tracking-widest mb-2 font-mono">TECH STACK</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map(tech => (
                         <span key={tech} className="px-2 py-1 bg-white/10 rounded text-xs text-white">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div className="border border-white/10 bg-blue-500/10 p-4 rounded-lg">
                    <h4 className="text-[10px] text-blue-400 tracking-widest mb-2 font-mono">DEMONSTRATES</h4>
                    <ul className="list-disc list-inside text-xs text-blue-200 space-y-1">
                      {selectedProject.demonstrates.map(tag => (
                         <li key={tag}>{tag.toUpperCase()}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-4">
                {projectsData.map((project) => (
                  <TiltCard 
                    key={project.id} 
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="absolute left-0 top-0 w-1 h-full bg-blue-500 scale-y-0 origin-top transition-transform duration-300 group-hover:scale-y-100 rounded-l-lg z-0"></div>
                    
                    <div className="flex justify-between items-start mb-2 pl-2 relative z-10">
                      <div>
                        <h3 className="text-white font-mono text-sm tracking-wider">{project.title}</h3>
                      </div>
                      <div className="text-gray-500 group-hover:text-white transition-colors">
                        <ExternalLink size={16} />
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-400 mt-3 pl-2 max-w-[85%] leading-relaxed relative z-10">
                      {project.description}
                    </p>
                    
                    <div className="mt-4 pl-2 flex items-center justify-between relative z-10">
                      <div className="flex gap-2">
                        {project.techStack.map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-gray-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </div>
            )}
          </div>
        </div>
      </ParallaxWrapper>
    </div>
  );
};

export default ProjectsWindow;