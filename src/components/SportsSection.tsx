import React from 'react';
import { Article } from '../types';
import { getRelativeTime, estimateReadTime } from '../utils';
import { Play } from 'lucide-react';

interface SportsProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
  onPlayVideo?: (url: string) => void;
}

export default function SportsSection({ articles, onArticleClick, onPlayVideo }: SportsProps) {
  const sportsArticles = articles.filter(item => item.category.toLowerCase() === 'sports');
  
  const leadSport = sportsArticles[0] || articles[1] || {
    id: 999,
    category: 'Sports',
    title: 'Historic T20 Cricket Chase Rewrites Individual Death Batsmanship Records',
    excerpt: 'Witness a batting clinic as dynamic batters produce a masterclass chase under pressure, setting a stellar blueprint for calculated calculations in deep-pressure tournament environments.',
    author: 'Staff Writer',
    time: '1 hour ago',
    timestamp: Date.now() - 3600000,
    image: 'https://images.unsplash.com/photo-1540747737956-37872404453b?auto=format&fit=crop&q=80&w=1200',
    views: '12K'
  };

  const secondarySports = sportsArticles.slice(1, 5);

  return (
    <section id="sports" className="my-16 select-none animate-[fadeIn_0.5s_ease-out]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-zinc-200 dark:border-zinc-850 pb-3 mb-8 gap-4">
        <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-zinc-955 dark:text-zinc-50 tracking-tight flex items-center gap-2">
          <span>🏏 Sports News Coverage</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Featured Left Column */}
        <div 
          onClick={() => onArticleClick(leadSport)}
          className="lg:col-span-2 group cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-200/55 dark:border-zinc-850 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between relative"
          id="sports-lead-card"
        >
          <div className="relative aspect-[16/9] overflow-hidden bg-zinc-100 dark:bg-zinc-850">
            <img
              src={leadSport.image}
              alt={leadSport.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700"
            />
            <span className="absolute top-4 left-4 bg-emerald-600 text-white text-[9px] tracking-widest font-extrabold uppercase px-3 py-1 rounded-full shadow-md z-[2]">
              Featured Coverage
            </span>

            {/* Video center indicator overlay */}
            {leadSport.videoUrl && onPlayVideo && (
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayVideo(leadSport.videoUrl!);
                }}
                className="absolute inset-0 m-auto w-12 h-12 bg-black/85 hover:bg-red-650 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer z-10"
                title="Play report dispatch"
                aria-label="Play video"
              >
                <Play size={18} className="fill-current translate-x-0.5" />
              </button>
            )}
          </div>

          <div className="p-6">
            <h3 className="text-lg sm:text-2xl font-serif text-zinc-950 dark:text-zinc-50 font-black tracking-tight group-hover:text-brand-crimson dark:group-hover:text-red-400 leading-snug transition-colors duration-250">
              {leadSport.title}
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-zinc-650 dark:text-zinc-450 line-clamp-3 leading-relaxed">
              {leadSport.excerpt}
            </p>

            {leadSport.sourceName && (
              <div className="text-[10px] font-mono text-zinc-400 mt-2.5 flex items-center gap-1 select-none">
                <span>Source:</span>
                {leadSport.sourceUrl ? (
                  <a 
                    href={leadSport.sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={(e) => e.stopPropagation()}
                    className="text-brand-crimson dark:text-red-400 font-sans font-black hover:underline"
                  >
                    {leadSport.sourceName}
                  </a>
                ) : (
                  <span className="font-sans font-bold text-zinc-700 dark:text-zinc-300">{leadSport.sourceName}</span>
                )}
              </div>
            )}

            <div className="mt-5 text-[10px] text-zinc-400 font-bold border-t border-zinc-150 dark:border-zinc-850/50 pt-3 flex justify-between items-center font-mono select-none">
              <span>By {leadSport.author} &bull; ⏱ {estimateReadTime(leadSport)} MIN READ</span>
              <span>{getRelativeTime(leadSport.timestamp)}</span>
            </div>
          </div>
        </div>

        {/* Right side trending highlights column */}
        <div className="lg:col-span-1 flex flex-col gap-6 justify-between">
          <div className="p-6 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/50 dark:border-zinc-850 rounded-2xl">
            <div className="border-b border-zinc-200 dark:border-zinc-850 pb-2 mb-4">
              <span className="text-[10.5px] font-mono font-black text-orange-500 dark:text-orange-400 uppercase tracking-widest">
                Trending Sports Highlights
              </span>
            </div>
            
            <div className="space-y-4">
              {secondarySports.slice(0, 2).map((item, index) => (
                <div 
                  key={item.id} 
                  onClick={() => onArticleClick(item)}
                  className="group cursor-pointer border-b border-zinc-100 dark:border-zinc-850/50 last:border-0 pb-4 last:pb-0"
                >
                  <span className="text-[9px] font-mono font-extrabold text-emerald-600 dark:text-emerald-450 uppercase tracking-wider block">
                    HIGHLIGHT #0{index + 1}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-zinc-950 dark:text-zinc-50 group-hover:text-brand-crimson dark:group-hover:text-red-450 transition-colors leading-snug mt-1 line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-[9.5px] text-zinc-400 mt-1 font-mono tracking-normal leading-none font-medium">
                    ⏱ {estimateReadTime(item)} MIN READ &bull; {getRelativeTime(item.timestamp)}
                  </p>
                </div>
              ))}

              {secondarySports.length === 0 && (
                <div className="text-zinc-400 dark:text-zinc-500 text-xs py-8 text-center font-mono italic">
                  Additional highlight streams coming soon.
                </div>
              )}
            </div>
          </div>

          <div className="p-6 bg-zinc-900 text-white rounded-2xl border border-zinc-800 flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-mono tracking-widest text-orange-400 uppercase font-black">
                Exclusive Commentary Desk
              </span>
              <p className="mt-2.5 font-serif text-sm sm:text-base font-extrabold text-[#f3f4f6] leading-normal italic">
                "Modern tournament formats reward high tactical versatility and analytical squad selections over traditional static strategies."
              </p>
            </div>
            <div className="mt-5 border-t border-zinc-800 pt-3 text-[9px] text-zinc-400 font-bold uppercase tracking-wider font-mono">
              AV News24 Panel Discussion
            </div>
          </div>
        </div>

      </div>

      {/* Styled Grid Highlight Rows */}
      {secondarySports.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {secondarySports.map((item) => (
            <div
              key={item.id}
              onClick={() => onArticleClick(item)}
              className="group cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-850 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10.5] overflow-hidden bg-zinc-100 dark:bg-zinc-850 select-none">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />

                {item.videoUrl && onPlayVideo && (
                  <button 
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayVideo(item.videoUrl!);
                    }}
                    className="absolute inset-0 m-auto w-10 h-10 bg-black/80 hover:bg-red-650 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md cursor-pointer z-10"
                    title="Play Video Clip"
                    aria-label="Play video"
                  >
                    <Play size={14} className="fill-current translate-x-0.5" />
                  </button>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-xs font-extrabold text-zinc-950 dark:text-zinc-50 leading-snug group-hover:text-brand-crimson dark:group-hover:text-red-400 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  
                  {item.sourceName && (
                    <div className="text-[9.5px] font-mono text-zinc-400 mt-1.5 flex items-center gap-1 select-none">
                      <span>Source:</span>
                      {item.sourceUrl ? (
                        <a 
                          href={item.sourceUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          onClick={(e) => e.stopPropagation()}
                          className="text-brand-crimson dark:text-red-450 hover:underline font-sans font-bold"
                        >
                          {item.sourceName}
                        </a>
                      ) : (
                        <span className="font-sans font-semibold text-zinc-700 dark:text-zinc-350">{item.sourceName}</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-2.5 border-t border-zinc-100 dark:border-zinc-850 flex items-center justify-between text-[10px] text-zinc-400 font-mono select-none">
                  <span>⏱ {estimateReadTime(item)} MIN READ</span>
                  <span className="text-zinc-450 dark:text-zinc-400 font-bold">&rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
