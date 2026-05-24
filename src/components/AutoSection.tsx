import { Article } from '../types';
import { getRelativeTime, estimateReadTime } from '../utils';
import { Star, StarHalf, Play } from 'lucide-react';

interface AutoSectionProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
  onPlayVideo?: (url: string) => void;
}

export default function AutoSection({ articles, onArticleClick, onPlayVideo }: AutoSectionProps) {
  const autoArticles = articles.filter((item) => item.category.toLowerCase() === 'auto');

  const renderStars = (rating = 4.5) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const starsArray = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        starsArray.push(
          <Star key={`star-${i}`} size={11} className="fill-amber-400 text-amber-400 shrink-0" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        starsArray.push(
          <StarHalf key={`star-half-${i}`} size={11} className="fill-amber-400 text-amber-400 shrink-0" />
        );
      } else {
        starsArray.push(
          <Star key={`star-empty-${i}`} size={11} className="text-zinc-350 dark:text-zinc-700 shrink-0" />
        );
      }
    }
    return <div className="flex items-center gap-0.5">{starsArray}</div>;
  };

  return (
    <section className="my-16 select-none">
      <div className="flex items-center justify-between border-b-2 border-zinc-200 dark:border-zinc-850 pb-2 mb-8">
        <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-zinc-955 dark:text-zinc-50 tracking-tight flex items-center gap-2">
          <span>🚗 Auto &amp; Mobility</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {autoArticles.map((item) => (
          <div
            key={item.id}
            onClick={() => onArticleClick(item)}
            className="group cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-200/55 dark:border-zinc-855 rounded-xl overflow-hidden shadow-xs hover:shadow-md card-hover-effect flex flex-col justify-between"
            id={`auto-card-${item.id}`}
          >
            <div className="relative aspect-[3/1.9] overflow-hidden bg-zinc-100 dark:bg-zinc-850 select-none">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              
              {item.specs && (
                <span className="absolute bottom-3 left-3 bg-zinc-950/85 backdrop-blur-xs text-white text-[8.5px] tracking-wider uppercase font-extrabold px-2.5 py-1 rounded shadow border border-zinc-800 z-[2]">
                  {item.specs}
                </span>
              )}

              {item.videoUrl && onPlayVideo && (
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayVideo(item.videoUrl!);
                  }}
                  className="absolute inset-0 m-auto w-10 h-10 bg-black/80 hover:bg-red-650 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md cursor-pointer z-10"
                  title="Play Mobility Report"
                  aria-label="Play video"
                >
                  <Play size={14} className="fill-current translate-x-0.5" />
                </button>
              )}
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9.5px] tracking-widest font-black uppercase text-amber-600 dark:text-amber-500">
                    Review Special
                  </span>
                  {item.rating && (
                    <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-805/80 px-2 py-0.5 rounded text-[10px] font-bold select-none">
                      {renderStars(item.rating)}
                      <span className="text-zinc-750 dark:text-zinc-350 font-mono text-[9px]">{item.rating}</span>
                    </div>
                  )}
                </div>

                <h3 className="font-serif text-sm font-extrabold text-zinc-950 dark:text-zinc-50 leading-snug group-hover:text-brand-crimson dark:group-hover:text-red-400 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-zinc-650 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                  {item.excerpt}
                </p>

                {item.sourceName && (
                  <div className="text-[10px] font-mono text-zinc-450 dark:text-zinc-500 mt-1.5 flex items-center gap-1 select-none">
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
                      <span className="font-sans font-bold text-zinc-750 dark:text-zinc-350">{item.sourceName}</span>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-850 flex items-center justify-between text-[10px] text-zinc-400 font-mono select-none">
                <span>⏱ {estimateReadTime(item)} MIN READ</span>
                <span className="text-zinc-450 dark:text-zinc-400 font-bold">&rarr;</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
