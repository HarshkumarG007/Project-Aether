import { useState, useEffect } from 'react';
import { useAetherStore } from '../../store/useAetherStore';
import { X, GitCommit, GitPullRequest, GitBranch, Terminal } from 'lucide-react';

const DevHQWindow = () => {
  const activeWindow = useAetherStore((state) => state.activeWindow);
  const toggleWindow = useAetherStore((state) => state.toggleWindow);
  
  const [stats, setStats] = useState({ repos: 0, followers: 0, commits: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activeWindow !== 'devhq') return;
    
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        setError(false);
        // Fetch user data
        const userRes = await fetch('https://api.github.com/users/HarshkumarG007');
        if (!userRes.ok) throw new Error('Rate limit exceeded');
        const userData = await userRes.json();
        
        // Fetch recent events for commits
        const eventsRes = await fetch('https://api.github.com/users/HarshkumarG007/events');
        if (!eventsRes.ok) throw new Error('Rate limit exceeded');
        const eventsData = await eventsRes.json();
        
        const recentCommits = eventsData
          .filter(e => e.type === 'PushEvent')
          .flatMap(e => e.payload.commits.map(c => ({
            repo: e.repo.name,
            msg: c.message,
            sha: c.sha.substring(0, 7)
          })))
          .slice(0, 5);

        setStats({
          repos: userData.public_repos,
          followers: userData.followers,
          commits: recentCommits
        });
      } catch {
        console.warn('GitHub API rate limited, using fallback data');
        setError(true);
        // Fallback data
        setStats({
          repos: 14,
          followers: 42,
          commits: [
            { repo: 'HarshkumarG007/Project-Aether', msg: 'feat: AI Assistant integration', sha: 'a1b2c3d' },
            { repo: 'HarshkumarG007/Project-Aether', msg: 'fix: Camera rig easing', sha: '4f5e6d7' },
            { repo: 'HarshkumarG007/MoodiesEngine', msg: 'chore: Update torch dependencies', sha: '8g9h0i1' }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [activeWindow]);

  if (activeWindow !== 'devhq') return null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[600px] h-[75vh] md:h-[450px] z-30 flex flex-col bg-[#0d1117]/95 backdrop-blur-lg border border-[#30363d] rounded-xl overflow-hidden shadow-2xl animate-fade-in pointer-events-auto">
      
      {/* Header - GitHub Styled */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#c9d1d9]">
          <Terminal size={14} className="text-[#58a6ff]" />
          <span>DEV_HQ // GITHUB_LINK</span>
        </div>
        <button onClick={() => toggleWindow('devhq')} className="text-red-400 hover:text-red-300">
          <X size={14} />
        </button>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar text-[#c9d1d9]">
        
        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-lg flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-[#58a6ff]">{loading ? '--' : stats.repos}</span>
            <span className="text-[10px] uppercase tracking-widest text-[#8b949e]">Public Repos</span>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-lg flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-[#3fb950]">{loading ? '--' : stats.followers}</span>
            <span className="text-[10px] uppercase tracking-widest text-[#8b949e]">Followers</span>
          </div>
          <div className="bg-[#161b22] border border-[#30363d] p-4 rounded-lg flex flex-col items-center justify-center md:col-span-2">
            <span className="text-sm font-mono text-[#8b949e] flex items-center gap-2"><GitBranch size={14}/> STATUS: <span className={error ? "text-yellow-400" : "text-[#3fb950]"}>{error ? 'FALLBACK (RATE LIMITED)' : 'API SYNCED'}</span></span>
          </div>
        </div>

        {/* Activity Stream */}
        <div className="flex-1 bg-[#161b22] border border-[#30363d] rounded-lg p-4 flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-[#8b949e] border-b border-[#30363d] pb-2">
            <GitPullRequest size={16} />
            <span className="text-xs uppercase tracking-widest">Recent Activity</span>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {loading ? (
              <div className="text-xs text-[#8b949e] font-mono animate-pulse">Fetching global state...</div>
            ) : (
              stats.commits.map((commit, i) => (
                <div key={i} className="flex flex-col gap-1 text-xs font-mono">
                  <div className="flex items-center gap-2 text-[#58a6ff]">
                    <GitCommit size={12} />
                    <span>{commit.repo}</span>
                  </div>
                  <div className="pl-5 text-[#c9d1d9] flex justify-between">
                    <span className="truncate max-w-[80%]">{commit.msg}</span>
                    <span className="text-[#8b949e] shrink-0">{commit.sha}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DevHQWindow;
