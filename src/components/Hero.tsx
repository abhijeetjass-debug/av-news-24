import { Article } from '../types';
import { getCategoryColor } from '../data';
import { getRelativeTime, estimateReadTime } from '../utils';
import { Play } from 'lucide-react';

interface HeroProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
  onPlayVideo?: (url: string) => void;
}

export default function Hero({ articles, onArticleClick, onPlayVideo }: HeroProps) {
  const featured = articles[0];
  const secondary = articles.slice(1, 5);

  if (!featured) return null;

  return (
    <section className="my-8 select-none">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Major Featured Post */}
        <div 
          onClick={() => onArticleClick(featured)}
          className="lg:col-span-8 group cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          id={`news-hero-main-${featured.id}`}
        >
          <div className="relative overflow-hidden aspect-[16/9.5] w-full bg-zinc-100 dark:bg-zinc-850">
            <img
              src={featured.image}
              alt={featured.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-[1.035] transition-transform duration-700 ease-out"
            />
            {/* vignette gradient */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none" />
            
            <span className={`absolute top-4 left-4 text-[9px] tracking-widest font-black uppercase px-3 py-1.5 rounded-md shadow-lg select-none z-[2] ${getCategoryColor(featured.category)}`}>
              {featured.category}
            </span>

            {/* Video overlay button */}
            {featured.videoUrl && onPlayVideo && (
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayVideo(featured.videoUrl!);
                }}
                className="absolute inset-0 m-auto w-14 h-14 bg-black/80 hover:bg-red-650 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer z-10"
                title="Play Featured Video"
                aria-label="Play video"
              >
                <Play size={20} className="fill-current translate-x-0.5" />
              </button>
            )}
          </div>

          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-white dark:bg-zinc-900">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3.5xl font-serif text-zinc-955 dark:text-zinc-50 tracking-tight leading-tight font-black group-hover:text-brand-crimson dark:group-hover:text-red-500 transition-colors duration-200">
                {featured.title}
              </h1>
              <p className="mt-4 text-sm sm:text-base text-zinc-650 dark:text-zinc-405 font-sans leading-relaxed line-clamp-3">
                {featured.excerpt}
              </p>

              {featured.sourceName && (
                <div className="text-[11px] font-mono text-zinc-450 dark:text-zinc-500 mt-2.5 flex items-center gap-1 select-none">
                  <span>Source:</span>
                  {featured.sourceUrl ? (
                    <a 
                      href={featured.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      onClick={(e) => e.stopPropagation()}
                      className="text-brand-crimson dark:text-red-400 font-sans font-black hover:underline"
                    >
                      {featured.sourceName}
                    </a>
                  ) : (
                    <span className="font-sans font-bold text-zinc-750 dark:text-zinc-355">{featured.sourceName}</span>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-805 pt-5">
              <div className="flex items-center gap-3">
                <div className="aspect-square w-9 rounded-full bg-brand-crimson/10 dark:bg-red-500/10 flex items-center justify-center font-black text-brand-crimson dark:text-red-400 text-xs shadow-inner">
                  {featured.author.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-850 dark:text-zinc-200 select-none">{featured.author}</div>
                  <div className="text-[10px] text-zinc-400 font-medium flex items-center gap-1.5 mt-0.5 select-none">
                    <span>{getRelativeTime(featured.timestamp)}</span>
                    <span>•</span>
                    <span className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-[9px] font-bold text-zinc-500 dark:text-zinc-400">⏱ {estimateReadTime(featured)} min read</span>
                  </div>
                </div>
              </div>
              
              <span className="text-xs text-brand-crimson dark:text-red-400 font-black tracking-wider uppercase flex items-center gap-1 opacity-100 lg:opacity-0 lg:translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 select-none">
                Full Coverage &rarr;
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Secondary Stack */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3 text-xs font-serif font-black uppercase tracking-widest text-brand-crimson dark:text-red-500">
            <span className="w-2 h-2 rounded-full bg-brand-crimson dark:bg-red-500 animate-pulse"></span>
            <span>TOP HEADLINES</span>
          </div>

          <div className="flex flex-col gap-4 flex-1">
            {secondary.map((item, index) => (
              <div
                key={item.id}
                onClick={() => onArticleClick(item)}
                className="group cursor-pointer bg-white dark:bg-zinc-900/40 border border-zinc-150 dark:border-zinc-800/80 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 rounded-xl p-3 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex gap-4 h-[105px] items-center"
                id={`news-hero-side-${item.id}`}
              >
                <div className="aspect-square w-18 shrink-0 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden relative shadow-inner border border-zinc-200/10 select-none">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-300"
                  />
                  <span className="absolute bottom-1 right-1 text-[8px] font-extrabold px-1.5 py-0.5 bg-black/75 rounded text-white backdrop-blur-xs scale-90">
                    {index + 1}
                  </span>

                  {item.videoUrl && onPlayVideo && (
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayVideo(item.videoUrl!);
                      }}
                      className="absolute inset-0 m-auto w-7 h-7 bg-black/85 hover:bg-red-650 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow z-5"
                      title="Play mini video clip"
                      aria-label="Play video"
                    >
                      <Play size={10} className="fill-current translate-x-0.5" />
                    </button>
                  )}
                </div>
                
                <div className="flex flex-col justify-between h-full py-0.5 overflow-hidden flex-1">
                  <div>
                    <span className="text-[9px] tracking-wider font-extrabold uppercase text-brand-crimson dark:text-red-450 block mb-0.5 select-none">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-xs font-black leading-snug line-clamp-2 text-zinc-900 dark:text-zinc-50 group-hover:text-brand-crimson dark:group-hover:text-red-400 transition-colors duration-200">
                      {item.title}
                    </h3>
                  </div>
                  
                  <div className="text-[10px] text-zinc-400 flex justify-between items-center font-medium select-none">
                    <span>{getRelativeTime(item.timestamp)}</span>
                    <span className="text-[9px] text-brand-crimson dark:text-red-400 group-hover:translate-x-0.5 transition-transform font-bold">&rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
