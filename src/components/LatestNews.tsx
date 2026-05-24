import { useState, useEffect } from 'react';
import { Article } from '../types';
import { getCategoryColor } from '../data';
import { getRelativeTime, estimateReadTime } from '../utils';
import { Clock, Play } from 'lucide-react';

interface LatestNewsProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
  onPlayVideo?: (url: string) => void;
}

export default function LatestNews({ articles, onArticleClick, onPlayVideo }: LatestNewsProps) {
  const [visibleCount, setVisibleCount] = useState(6);
  const [flashActive, setFlashActive] = useState(true);

  // Trigger yellow flash on entry
  useEffect(() => {
    const timer = setTimeout(() => {
      setFlashActive(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const sortedArticles = [...articles].sort((a, b) => b.timestamp - a.timestamp);
  
  // Backwards compatible logic: Slice out lists
  const sidebarItems = sortedArticles.slice(0, 10);
  const gridItems = sortedArticles.slice(3, 3 + visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, sortedArticles.length - 3));
  };

  return (
    <section id="latest" className="my-12">
      <div className="flex items-center justify-between border-b-2 border-zinc-200 dark:border-zinc-850 pb-2 mb-8 select-none">
        <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-zinc-955 dark:text-zinc-50 tracking-tight flex items-center gap-2">
          <span>⚡ Latest News</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left feeds column */}
        <div className="lg:col-span-1 bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-850/80 rounded-2xl p-5 h-fit max-h-[850px] overflow-y-auto custom-scroll flex flex-col gap-4">
          <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3 flex items-center justify-between">
            <h3 className="font-serif text-sm font-black uppercase tracking-wide text-brand-navy dark:text-red-400">
              ⏱ Feed Updates
            </h3>
            <span className="bg-red-100 text-brand-crimson dark:bg-red-955/40 dark:text-red-450 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase animate-pulse">
              Live
            </span>
          </div>

          <div className="flex flex-col gap-5">
            {sidebarItems.map((item, index) => {
              const getDotColor = (cat: string) => {
                switch (cat.toLowerCase()) {
                  case 'sports': return 'bg-green-650';
                  case 'technology': return 'bg-blue-650';
                  case 'business': return 'bg-amber-650';
                  case 'entertainment': return 'bg-pink-650';
                  case 'world': return 'bg-purple-650';
                  default: return 'bg-red-650';
                }
              };

              return (
                <div
                  key={`sidebar-${item.id}`}
                  onClick={() => onArticleClick(item)}
                  className={`cursor-pointer group pb-4 border-b border-zinc-100 dark:border-zinc-800/55 last:border-0 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30 p-2 rounded transition-colors duration-200 ${
                    flashActive && index < 2 ? 'bg-amber-100/35 dark:bg-amber-950/15' : ''
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${getDotColor(item.category)}`} />
                    <div className="overflow-hidden">
                      <h4 className="font-sans text-xs font-bold leading-normal text-zinc-900 dark:text-zinc-200 group-hover:text-brand-crimson dark:group-hover:text-red-400 transition-colors duration-150 line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-zinc-400 mt-1 flex items-center gap-1.5 font-mono">
                        <Clock size={10} />
                        {getRelativeTime(item.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next feed content list */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {gridItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => onArticleClick(item)}
                style={{
                  animationDelay: `${index * 110}ms`,
                  animationFillMode: 'both',
                }}
                className="group cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-200/55 dark:border-zinc-850 rounded-2xl overflow-hidden shadow-sm card-hover-effect flex flex-col justify-between border-l-3 border-l-zinc-300 dark:border-l-zinc-805 hover:border-l-brand-crimson dark:hover:border-l-red-500 animate-[fadeInUp_0.45s_ease-out_both]"
                id={`latest-card-${item.id}`}
              >
                <div className="relative aspect-[3/1.9] overflow-hidden bg-zinc-100 dark:bg-zinc-850 select-none">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <span className={`absolute top-3 left-3 text-[8px] tracking-widest font-black uppercase px-2 py-0.5 rounded shadow-xs ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>

                  {/* Play circle trigger buttons */}
                  {item.videoUrl && onPlayVideo && (
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayVideo(item.videoUrl!);
                      }}
                      className="absolute inset-0 m-auto w-11 h-11 bg-black/80 hover:bg-red-650 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md cursor-pointer hover:shadow-red-500/30 z-[5]"
                      title="Play media report stream"
                      aria-label="Play video"
                    >
                      <Play size={16} className="fill-current translate-x-0.5" />
                    </button>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-serif text-sm font-extrabold text-zinc-950 dark:text-zinc-50 leading-snug group-hover:text-brand-crimson dark:group-hover:text-red-400 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                      {item.excerpt}
                    </p>

                    {item.sourceName && (
                      <div className="text-[10px] font-mono text-zinc-450 dark:text-zinc-500 mt-1 flex items-center gap-1 select-none">
                        <span>Source:</span>
                        {item.sourceUrl ? (
                          <a 
                            href={item.sourceUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={(e) => e.stopPropagation()}
                            className="text-brand-crimson dark:text-red-400 font-sans font-bold hover:underline"
                          >
                            {item.sourceName}
                          </a>
                        ) : (
                          <span className="font-sans font-bold text-zinc-700 dark:text-zinc-350">{item.sourceName}</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-850 flex items-center justify-between text-[10px] text-zinc-400 font-mono select-none">
                    <span>
                      ⏱ {estimateReadTime(item)} MIN READ
                    </span>
                    <span className="text-[10px] text-brand-crimson dark:text-red-400 font-sans font-black tracking-tight opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      Read story &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount + 3 <= sortedArticles.length && (
            <button
              onClick={handleLoadMore}
              className="self-center bg-brand-crimson dark:bg-red-650 hover:bg-neutral-900 dark:hover:bg-white dark:hover:text-zinc-900 font-bold text-xs uppercase tracking-wider px-8 py-3 rounded-xl cursor-pointer shadow-md hover:shadow-lg transition-all active:scale-95 text-white dark:text-zinc-105"
            >
              Load More Stories
            </button>
          )}
        </div>

      </div>
    </section>
  );
}
