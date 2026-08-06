import { useState } from 'react';
import skillsData from '../../data/skills.json';
import projectsData from '../../data/projects.json';

const SkillParticleGraph = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Simple hardcoded positions for the small number of skill nodes
  // in a circular layout for aesthetics
  const radius = 80;
  const nodes = skillsData.map((skill, index) => {
    const angle = (index / skillsData.length) * Math.PI * 2;
    return {
      ...skill,
      x: 150 + radius * Math.cos(angle),
      y: 100 + radius * Math.sin(angle)
    };
  });

  // Calculate connected projects for the hovered skill
  const connectedProjects = hoveredSkill 
    ? projectsData.filter(p => p.techStack.some(t => t.toLowerCase().includes(hoveredSkill.name.toLowerCase()) || hoveredSkill.name.toLowerCase().includes(t.toLowerCase())))
    : [];

  return (
    <div className="relative w-full h-full min-h-[200px] flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
        {/* Draw connections between all nodes faintly */}
        {nodes.map((node, i) => 
          nodes.map((target, j) => {
            if (i >= j) return null;
            return (
              <line 
                key={`${node.id}-${target.id}`} 
                x1={node.x} y1={node.y} x2={target.x} y2={target.y} 
                stroke="rgba(255,255,255,0.05)" 
                strokeWidth="1" 
              />
            );
          })
        )}
      </svg>
      
      {/* Draw Nodes */}
      {nodes.map((node) => (
        <div 
          key={node.id}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-[8px] font-mono cursor-pointer transition-all duration-300 ${hoveredSkill?.id === node.id ? 'bg-aether-green text-black scale-110 z-10 shadow-[0_0_15px_rgba(0,255,65,0.8)]' : 'bg-black border border-white/20 text-gray-400 hover:border-aether-green hover:text-aether-green'}`}
          style={{ 
            left: `${node.x}px`, 
            top: `${node.y}px`,
            width: '60px',
            height: '24px'
          }}
          onMouseEnter={() => setHoveredSkill(node)}
          onMouseLeave={() => setHoveredSkill(null)}
        >
          {node.name.split(' ')[0]}
        </div>
      ))}

      {/* Connected Projects Overlay */}
      {hoveredSkill && (
        <div className="absolute bottom-2 left-2 right-2 bg-black/80 border border-aether-green/30 p-2 rounded text-[10px] text-aether-green font-mono pointer-events-none z-20">
          <div className="mb-1 text-white opacity-50">Projects using {hoveredSkill.name}:</div>
          {connectedProjects.length > 0 ? (
            <ul className="list-disc list-inside">
              {connectedProjects.map(p => <li key={p.id}>{p.title}</li>)}
            </ul>
          ) : (
            <span className="opacity-50">No tagged projects</span>
          )}
        </div>
      )}
    </div>
  );
};

export default SkillParticleGraph;
