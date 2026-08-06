import projects from './projects.json';
import skills from './skills.json';

export const queryAssistant = (query) => {
  const lowerQuery = query.toLowerCase();

  // General questions
  if (lowerQuery.includes('why react over vue')) {
    return { type: 'text', content: "React's vast ecosystem and robust library support (like React Three Fiber) make it ideal for complex, immersive applications like this portfolio." };
  }
  
  if (lowerQuery.includes('show frontend projects')) {
    const matches = projects.filter(p => p.techStack.some(t => t.toLowerCase() === 'react' || t.toLowerCase() === 'tailwind'));
    return { type: 'projects', data: matches };
  }

  // Tag matching for projects
  const matches = projects.filter(p => p.demonstrates.some(tag => lowerQuery.includes(tag)));
  if (matches.length > 0) {
    return { type: 'projects', data: matches };
  }

  // Check for skill-related queries
  const skillMatches = skills.filter(s => lowerQuery.includes(s.name.toLowerCase()));
  if (skillMatches.length > 0) {
    return { type: 'skills', data: skillMatches };
  }

  // Authentication specific as requested in spec
  if (lowerQuery.includes('authentication')) {
    const authMatches = projects.filter(p => p.demonstrates.includes('authentication'));
    return { type: 'projects', data: authMatches };
  }

  return { type: 'text', content: "I couldn't find specific data regarding that in my current knowledge base." };
};
