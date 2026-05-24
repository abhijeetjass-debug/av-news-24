import { Article } from '../types';
import { getRelativeTime } from '../utils';

interface OpinionProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
}

export default function OpinionSection({ articles, onArticleClick }: OpinionProps) {
  // Pull opinion articles
  const opinions = articles.filter(item => item.category === 'Opinion');

  return (
    <section className="my-16 select-none bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/50 dark:border-zinc-850/80 p-6 sm:p-8 rounded-2xl">
      <div className="flex items-center justify-between border-b-2 border-zinc-200 dark:border-zinc-800 pb-2 mb-8">
        <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-zinc-905 dark:text-zinc-50 tracking-tight flex items-center gap-2">
          <span>✍️ Opinion &amp; Editorial</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {opinions.map((item) => (
          <div
            key={item.id}
            onClick={() => onArticleClick(item)}
            className="group cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-805 p-6 rounded-xl flex flex-col justify-between shadow-xs hover:shadow-md card-hover-effect relative border-t-4 border-t-brand-crimson dark:border-t-red-600"
            id={`opinion-card-${item.id}`}
          >
            {/* Massive decorative quote mark */}
            <span className="absolute top-4 right-6 text-6xl font-serif font-black text-zinc-105 dark:text-zinc-800/15 group-hover:text-red-600/10 pointer-events-none transition-colors duration-300">
              “
            </span>

            {/* Quote Block layout */}
            <div className="relative z-10 flex-grow">
              <span className="text-[10px] tracking-widest font-extrabold uppercase text-brand-crimson dark:text-red-400 block mb-3">
                Columnist Pick
              </span>
              
              <blockquote className="font-serif text-sm sm:text-base italic font-semibold leading-relaxed text-zinc-800 dark:text-zinc-100 block group-hover:text-brand-crimson dark:group-hover:text-red-400 transition-colors duration-200">
                "{item.quote}"
              </blockquote>
              
              <p className="mt-4 text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed font-sans line-clamp-3">
                {item.excerpt}
              </p>
            </div>

            {/* Author details footer */}
            <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-200/50 dark:border-zinc-800 shrink-0 shadow-sm">
                <img
                  src={item.authorAvatar}
                  alt={item.author}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-205">{item.author}</div>
                <div className="text-[10px] text-zinc-400">Contributor &bull; {getRelativeTime(item.timestamp)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
