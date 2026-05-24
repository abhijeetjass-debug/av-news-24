import { useState } from 'react';
import { Article } from '../types';
import { getCategoryColor } from '../data';
import { getRelativeTime, estimateReadTime } from '../utils';
import { motion, AnimatePresence } from 'motion/react';
import { Play } from 'lucide-react';

interface CategoryTabsProps {
  articles: Article[];
  categories: string[];
  onArticleClick: (article: Article) => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  onPlayVideo?: (url: string) => void;
}

export default function CategoryTabs({ articles, categories, onArticleClick, activeTab, setActiveTab, onPlayVideo }: CategoryTabsProps) {
  // Pull tabs from dynamic categories
  const tabs = categories.length > 0 ? categories : ['Sports', 'Technology', 'Business', 'Entertainment', 'World'];
  const [localActiveTab, setLocalActiveTab] = useState<string>(() => tabs[0]);

  const currentActive = activeTab !== undefined ? activeTab : localActiveTab;
  const currentSet = setActiveTab !== undefined ? setActiveTab : setLocalActiveTab;

  const selectedTab = tabs.includes(currentActive) ? currentActive : tabs[0];

  const filteredArticles = articles.filter(
    (item) => item.category.toLowerCase() === selectedTab.toLowerCase()
  );

  return (
    <section id="category-focus" className="my-12 select-none">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-zinc-200 dark:border-zinc-850 pb-3 mb-8">
        <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-zinc-955 dark:text-zinc-50 tracking-tight mb-4 md:mb-0">
          📰 Category Focus
        </h2>

        {/* Sliding Tabs Switcher */}
        <div className="flex gap-1 sm:gap-2 bg-zinc-100 dark:bg-zinc-900 rounded-full p-1.5 overflow-x-auto no-scrollbar max-w-full">
          {tabs.map((tab) => {
            const isSelected = selectedTab === tab;
            return (
              <button
                key={tab}
                onClick={() => currentSet(tab)}
                className={`relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors duration-200 shrink-0 outline-none ${
                  isSelected 
                    ? 'text-white dark:text-zinc-950 z-10' 
                    : 'text-zinc-650 dark:text-zinc-450 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-brand-crimson dark:bg-white rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-20">{tab}</span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="w-full"
        >
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredArticles.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onArticleClick(item)}
                  className="group cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-850 rounded-xl overflow-hidden shadow-xs hover:shadow-md card-hover-effect flex flex-col justify-between"
                  id={`category-card-${item.id}`}
                >
                  <div className="relative aspect-[16/10.5] overflow-hidden bg-zinc-100 dark:bg-zinc-850 select-none">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    
                    <span className={`absolute top-3 left-3 text-[8.5px] tracking-widest font-black uppercase px-2 py-0.5 rounded shadow-xs ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>

                    {item.videoUrl && onPlayVideo && (
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPlayVideo(item.videoUrl!);
                        }}
                        className="absolute inset-0 m-auto w-10 h-10 bg-black/80 hover:bg-red-650 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md cursor-pointer z-10"
                        title="Play Video Dispatch Clip"
                        aria-label="Play video"
                      >
                        <Play size={14} className="fill-current translate-x-0.5" />
                      </button>
                    )}
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-sm font-extrabold text-zinc-950 dark:text-zinc-50 leading-snug group-hover:text-brand-crimson dark:group-hover:text-red-400 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 font-sans line-clamp-3 leading-relaxed">
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

                    <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-850/65 flex items-center justify-between text-[10px] text-zinc-400 font-mono select-none">
                      <span>
                        ⏱ {estimateReadTime(item)} MIN READ
                      </span>
                      
                      <span className="text-zinc-400 group-hover:text-brand-crimson dark:group-hover:text-red-400 group-hover:translate-x-0.5 transition-all font-bold">&rarr;</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-6 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl max-w-md mx-auto">
              <span className="text-3xl mb-2 block">📰</span>
              <h4 className="font-serif text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-1">No reports in {selectedTab}</h4>
              <p className="text-xs text-zinc-500">We don't have active headlines categorized under {selectedTab} at the present time. Check back later or write an article in the publisher desk!</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
