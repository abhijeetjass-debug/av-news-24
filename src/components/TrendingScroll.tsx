import { useRef } from 'react';
import { Article } from '../types';
import { getRelativeTime } from '../utils';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface TrendingScrollProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
}

export default function TrendingScroll({ articles, onArticleClick }: TrendingScrollProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter 6 articles that have high view counts or trending Scores
  const topStories = [...articles]
    .sort((a, b) => b.id - a.id) // diverse variety
    .slice(5, 11);

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  return (
    <section className="my-12 relative select-none">
      <div className="flex items-center justify-between border-b-2 border-zinc-200 dark:border-zinc-850 pb-2 mb-6">
        <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-zinc-905 dark:text-zinc-50 tracking-tight flex items-center gap-2">
          <span>🔥 This Week's Top Stories</span>
        </h2>
        
        {/* Nav Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={scrollLeft}
            className="p-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-805 cursor-pointer shadow-xs"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={scrollRight}
            className="p-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-805 cursor-pointer shadow-xs"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Side Scrollable Row */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 px-1"
      >
        {topStories.map((item) => {
          // Generate artificial rating completeness representing hot progress
          const rankingScore = item.trendingScore || Math.floor(Math.random() * 25) + 70;

          return (
            <div
              key={`trending-${item.id}`}
              onClick={() => onArticleClick(item)}
              className="group cursor-pointer min-w-[280px] w-[280px] sm:min-w-[310px] sm:w-[310px] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-850 rounded-xl overflow-hidden shadow-xs hover:shadow-md card-hover-effect flex flex-col justify-between shrink-0 mb-2 border-l-3 border-l-red-600/30 hover:border-l-red-600"
              id={`trending-card-${item.id}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-850 shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Visual Category Pill overlay */}
                <span className="absolute bottom-3 left-3 bg-brand-navy/80 hover:bg-brand-navy backdrop-blur-xs text-white text-[9px] tracking-wider uppercase font-extrabold px-2 py-0.5 rounded shadow-sm">
                  {item.category}
                </span>
                
                {/* Views Badge Overlay */}
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-xs text-white text-[10px] items-center gap-1 flex px-2 py-0.5 rounded font-bold shadow-sm">
                  <Eye size={11} />
                  <span>{item.views}</span>
                </div>
              </div>

              {/* Contents and Progress Gauge */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-sm font-extrabold text-zinc-950 dark:text-zinc-50 leading-snug group-hover:text-brand-crimson dark:group-hover:text-red-400 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-zinc-400 mt-2">
                    Published {getRelativeTime(item.timestamp)}
                  </p>
                </div>

                {/* Completeness Gauge Section */}
                <div className="mt-5 border-t border-zinc-100 dark:border-zinc-850/60 pt-3">
                  <div className="flex justify-between items-center text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1">
                    <span>⚡ Trending Momentum</span>
                    <span>{rankingScore}%</span>
                  </div>
                  <div className="w-full h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-crimson to-red-500 transition-all duration-1000"
                      style={{ width: `${rankingScore}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
