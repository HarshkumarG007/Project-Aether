import projectsData from '../../data/projects.json';
import skillsData from '../../data/skills.json';

export const parseCommand = (input) => {
  const cmd = input.trim().toLowerCase();

  switch (cmd) {
    case 'help':
      return { output: [{ type: 'system', text: 'AVAILABLE COMMANDS: whoami, projects, skills, experience, contact, github, theme, city, status, clear, sudo hire-me' }] };
    
    case 'whoami':
      return { output: [
        { type: 'system', text: 'HARSH KUMAR GUPTA' },
        { type: 'system', text: 'AI & Robotics Specialist | Transitioning to Core ML Engineering.' }
      ]};
    
    case 'skills':
      return { output: skillsData.map(s => ({ type: 'system', text: `${s.category.toUpperCase().padEnd(10)}: ${s.name} (${s.proficiency}%)` })) };
    
    case 'projects':
      return { output: projectsData.map(p => ({ type: 'system', text: `> ${p.title}: ${p.description}` })) };
      
    case 'experience':
    case 'resume':
      return { output: [
        { type: 'system', text: 'Experience details are available in the visual HUD or by downloading the resume.' },
        { type: 'system', text: 'Type "sudo hire-me" to download full resume.' }
      ]};

    case 'contact':
      return { output: [{ type: 'system', text: 'Email: contact@example.com | LinkedIn: /in/yourprofile' }] };
      
    case 'github':
      return { output: [{ type: 'system', text: 'GitHub: https://github.com/HarshkumarG007' }] };
      
    case 'theme':
      return { output: [{ type: 'system', text: 'Theme toggling will be fully supported in Phase 3/4.' }] };
      
    case 'city':
      return { output: [{ type: 'system', text: 'Welcome to Project Aether. A neural-interface city.' }] };

    case 'status':
      return { output: [{ type: 'system', text: 'SYSTEM STATUS: ONLINE. ALL CORES NOMINAL.' }] };

    case 'coffee':
      return { action: 'SPAWN_COFFEE', output: [{ type: 'system', text: 'Spawning coffee mesh in 3D scene... (Easter Egg)' }] };

    case 'sudo hire-me':
      return { action: 'DOWNLOAD_RESUME', output: [{ type: 'system', text: 'ACCESS GRANTED. Initializing interview protocols... Downloading resume.' }] };

    case 'clear':
      return { action: 'CLEAR' };

    case '':
      return { output: [] };

    default:
      return { output: [{ type: 'system', text: `Command not found: ${cmd}` }] };
  }
};
