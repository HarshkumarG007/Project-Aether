import { useState } from 'react';
import { useAetherStore } from '../../store/useAetherStore';
import { X, BookOpen, ArrowRight, ArrowLeft, PenLine, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { PERSONA } from '../../data/persona';

const tagColors = {
  'applied-ml': 'text-blue-400 border-blue-400/25 bg-blue-400/5',
  'generative-ai': 'text-purple-400 border-purple-400/25 bg-purple-400/5',
  'llm-rag': 'text-purple-300 border-purple-300/25 bg-purple-300/5',
  'ai-infrastructure': 'text-aether-green border-aether-green/25 bg-aether-green/5',
  'privacy-security': 'text-orange-400 border-orange-400/25 bg-orange-400/5',
  'statistical-modeling': 'text-cyan-400 border-cyan-400/25 bg-cyan-400/5',
  'training': 'text-yellow-400 border-yellow-400/25 bg-yellow-400/5',
  'recommendation-systems': 'text-emerald-400 border-emerald-400/25 bg-emerald-400/5',
};

const NotesWindow = () => {
  const activeWindow = useAetherStore((state) => state.activeWindow);
  const toggleWindow = useAetherStore((state) => state.toggleWindow);
  const [selectedNote, setSelectedNote] = useState(null);

  if (activeWindow !== 'notes') return null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[680px] h-[88vh] md:h-[520px] z-30 flex flex-col bg-[#080c12]/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-fade-in pointer-events-auto">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/8 shrink-0">
        <div className="flex items-center gap-2 font-mono text-xs text-white/60">
          <BookOpen size={13} className="text-aether-green" />
          <span>ENGINEERING NOTES</span>
          {selectedNote && (
            <>
              <span className="text-white/20 ml-1">//</span>
              <span className="text-white/40 truncate max-w-[200px]">{selectedNote.title}</span>
            </>
          )}
        </div>
        <button onClick={() => toggleWindow('notes')} aria-label="Close Notes Window" className="text-gray-600 hover:text-red-400 transition-colors">
          <X size={14} />
        </button>
      </div>

      {selectedNote ? (
        /* Note Article Reader View */
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-5 py-3 border-b border-white/8 shrink-0 flex items-center justify-between">
            <button
              onClick={() => setSelectedNote(null)}
              className="flex items-center gap-1.5 text-gray-500 hover:text-white font-mono text-[10px] tracking-widest transition-colors group"
            >
              <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
              ALL NOTES
            </button>
            <div className="flex items-center gap-3 text-[10px] font-mono text-gray-500">
              {selectedNote.date && (
                <span className="flex items-center gap-1"><Calendar size={11} /> {selectedNote.date}</span>
              )}
              {selectedNote.readTime && (
                <span className="flex items-center gap-1"><Clock size={11} /> {selectedNote.readTime}</span>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded border text-aether-green border-aether-green/30 bg-aether-green/5">
                  <CheckCircle2 size={10} /> PUBLISHED NOTE
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNote.tags?.map(t => (
                    <span key={t} className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${tagColors[t] || 'text-gray-400 border-white/10'}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <h2 className="text-lg font-semibold text-white leading-snug">{selectedNote.title}</h2>
              {selectedNote.summary && (
                <p className="text-xs text-gray-300 leading-relaxed mt-2.5 p-3 rounded-lg bg-white/5 border border-white/10 italic">
                  {selectedNote.summary}
                </p>
              )}
            </div>

            {selectedNote.sections?.map((sec, i) => (
              <div key={i} className="space-y-1.5 border-t border-white/5 pt-4">
                <h3 className="text-xs font-mono font-semibold text-aether-cyan uppercase tracking-wider">{sec.heading}</h3>
                <p className="text-xs text-gray-300 leading-relaxed">{sec.body}</p>
              </div>
            ))}

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-gray-500">
              <span>Author: Harsh Kumar Gupta</span>
              <a
                href={PERSONA.links.github}
                target="_blank"
                rel="noreferrer"
                className="text-aether-green hover:underline flex items-center gap-1"
              >
                Inspect Implementation on GitHub →
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* Notes List View */
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          <div className="mb-5">
            <p className="text-xs text-gray-400 leading-relaxed">
              Technical writing on engineering lessons, architectural trade-offs, and practical ML insights from actual project work.
            </p>
            <p className="text-[10px] text-gray-600 font-mono mt-1">Click published notes to read full technical breakdowns.</p>
          </div>

          <div className="space-y-3">
            {PERSONA.engineeringNotes.map((note) => {
              const isPublished = note.status === 'published';
              return (
                <div
                  key={note.id}
                  onClick={() => isPublished && setSelectedNote(note)}
                  className={`group border rounded-xl p-4 transition-all duration-200 ${
                    isPublished
                      ? 'border-aether-green/30 bg-white/4 hover:bg-white/8 hover:border-aether-green/60 cursor-pointer shadow-[0_0_15px_rgba(0,255,65,0.03)]'
                      : 'border-white/8 bg-white/2 opacity-70'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${
                      isPublished ? 'bg-aether-green/10 border-aether-green/30 text-aether-green' : 'bg-white/5 border-white/8 text-gray-500'
                    }`}>
                      <PenLine size={12} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={`text-sm leading-snug ${isPublished ? 'text-white group-hover:text-aether-green transition-colors font-medium' : 'text-gray-400'}`}>
                          {note.title}
                        </h4>
                        <div className="shrink-0 flex items-center gap-2">
                          <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${
                            isPublished
                              ? 'text-aether-green border-aether-green/30 bg-aether-green/10 font-semibold'
                              : 'text-gray-500 border-white/10 bg-white/3'
                          }`}>
                            {isPublished ? 'READ NOTE' : 'IDEA'}
                          </span>
                          {isPublished && (
                            <ArrowRight size={12} className="text-aether-green group-hover:translate-x-0.5 transition-transform" />
                          )}
                        </div>
                      </div>
                      {note.summary && isPublished && (
                        <p className="text-[11px] text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">
                          {note.summary}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {note.tags.map(tag => (
                          <span key={tag} className={`text-[9px] font-mono px-2 py-0.5 rounded border ${tagColors[tag] || 'text-gray-500 border-white/8'}`}>
                            {tag}
                          </span>
                        ))}
                        {note.readTime && isPublished && (
                          <span className="text-[9px] font-mono text-gray-500 ml-auto flex items-center gap-1">
                            <Clock size={10} /> {note.readTime}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-4 border border-dashed border-white/10 rounded-xl text-center">
            <p className="text-[10px] font-mono text-gray-600">
              Technical writing in progress. Check GitHub and LinkedIn for published engineering content.
            </p>
            <a
              href="https://www.linkedin.com/in/harshkumarg/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-mono text-blue-400 hover:text-blue-300 transition-colors mt-2"
            >
              LinkedIn <ArrowRight size={10} />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesWindow;
