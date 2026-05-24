import { Article } from '../types';

interface TickerProps {
  articles: Article[];
  tickerText: string;
  useCustomTicker: boolean;
  onArticleClick?: (article: Article) => void;
}

export default function Ticker({ articles, tickerText, useCustomTicker, onArticleClick }: TickerProps) {
  // Pull breaking articles first, then fallback or fill with trending articles so we always have headlines
  const breakingArticles = articles.filter((a) => a.isBreaking);
  const trendingArticles = [...articles]
    .sort((a, b) => (b.trendingScore || 0) - (a.trendingScore || 0));
  
  const tickerArticles = Array.from(new Set([...breakingArticles, ...trendingArticles])).slice(0, 6);

  // Split ticker text by • or let it flow as solid block
  const customItems = tickerText.split('•').map(item => item.trim()).filter(Boolean);

  return (
    <div className="w-full bg-red-950 text-yellow-400 h-11 flex items-center overflow-hidden selective-none font-sans border-y border-red-900 shadow-inner">
      {/* Front Label */}
      <div className="bg-red-700 hover:bg-red-850 transition-colors px-4 sm:px-6 h-full flex items-center gap-2 font-black text-xs sm:text-sm tracking-widest text-white uppercase shadow-lg shrink-0 z-10 select-none border-r border-red-900">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-400"></span>
        </span>
        <span>BREAKING</span>
      </div>

      {/* Looping Marquee */}
      <div className="relative flex items-center overflow-hidden w-full h-full bg-red-950/95">
        <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] cursor-pointer">
          {/* First loop stack */}
          <div className="flex gap-16 pr-16 select-none items-center">
            {useCustomTicker ? (
              customItems.length > 0 ? (
                customItems.map((item, idx) => (
                  <span
                    key={`custom1-${idx}`}
                    className="text-amber-300 hover:text-yellow-250 font-extrabold text-xs sm:text-sm tracking-tight transition-colors flex items-center"
                  >
                    {item} <span className="ml-16 pr-1 text-red-700 font-bold">●</span>
                  </span>
                ))
              ) : (
                <span className="text-amber-300 font-extrabold text-xs sm:text-sm tracking-tight">{tickerText}</span>
              )
            ) : (
              tickerArticles.map((article) => (
                <span
                  key={`loop1-${article.id}`}
                  onClick={() => onArticleClick?.(article)}
                  className="text-yellow-400 hover:text-yellow-200 hover:underline font-extrabold text-xs sm:text-sm tracking-tight transition-colors flex items-center cursor-pointer"
                >
                  <span className="text-red-500 font-bold mr-2 text-[10px]">🚨</span> {article.title} <span className="ml-16 pr-1 text-red-700 font-bold">●</span>
                </span>
              ))
            )}
          </div>
          {/* Duplicate loop stack for seamless infinite loop */}
          <div className="flex gap-16 pr-16 select-none items-center" aria-hidden="true">
            {useCustomTicker ? (
              customItems.length > 0 ? (
                customItems.map((item, idx) => (
                  <span
                    key={`custom2-${idx}`}
                    className="text-amber-300 hover:text-yellow-250 font-extrabold text-xs sm:text-sm tracking-tight transition-colors flex items-center"
                  >
                    {item} <span className="ml-16 pr-1 text-red-700 font-bold">●</span>
                  </span>
                ))
              ) : (
                <span className="text-amber-300 font-extrabold text-xs sm:text-sm tracking-tight">{tickerText}</span>
              )
            ) : (
              tickerArticles.map((article) => (
                <span
                  key={`loop2-${article.id}`}
                  onClick={() => onArticleClick?.(article)}
                  className="text-yellow-400 hover:text-yellow-200 hover:underline font-extrabold text-xs sm:text-sm tracking-tight transition-colors flex items-center cursor-pointer"
                >
                  <span className="text-red-500 font-bold mr-2 text-[10px]">🚨</span> {article.title} <span className="ml-16 pr-1 text-red-700 font-bold">●</span>
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </div>
  );
}
