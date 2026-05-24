import { useState, useEffect } from 'react';
import { sampleArticles } from './data';
import { Article, SiteSettings } from './types';
import Header from './components/Header';
import Ticker from './components/Ticker';
import Hero from './components/Hero';
import LatestNews from './components/LatestNews';
import TrendingScroll from './components/TrendingScroll';
import CategoryTabs from './components/CategoryTabs';
import SportsSection from './components/SportsSection';
import AutoSection from './components/AutoSection';
import OpinionSection from './components/OpinionSection';
import VideoSection from './components/VideoSection';
import Footer from './components/Footer';
import ArticleReader from './components/ArticleReader';
import AdminPanel from './components/AdminPanel';
import { Search, X, AlertCircle, ShieldAlert, ArrowLeft, Home, BookOpen, Sparkles, CheckCircle2, AlertTriangle, Info, Flame, TrendingUp } from 'lucide-react';
import { getRelativeTime } from './utils';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchStartDate, setSearchStartDate] = useState('');
  const [searchEndDate, setSearchEndDate] = useState('');
  const [activeSection, setActiveSection] = useState('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeVideoPlaybackUrl, setActiveVideoPlaybackUrl] = useState<string | null>(null);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  // Apply Theme Toggle Class to document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const [selectedCategoryTab, setSelectedCategoryTab] = useState('Sports');
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('av_news_articles');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved articles', e);
      }
    }
    return sampleArticles;
  });

  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('av_news_categories');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing categories', e);
      }
    }
    return ['National', 'International', 'Sports', 'Entertainment', 'Business', 'Technology', 'Health', 'Politics'];
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('av_news_site_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing site settings', e);
      }
    }
    return {
      siteName: 'AV News24',
      tagline: 'Real-time premium digital global breaking news and high integrity reporting',
      logoUrl: '',
      socialFacebook: 'https://facebook.com',
      socialTwitter: 'https://twitter.com/avnews24',
      socialInstagram: 'https://instagram.com',
      socialYoutube: 'https://youtube.com',
      contactEmail: 'contact@avnews24.com',
      contactPhone: '+91 11-2301-2000'
    };
  });

  const [tickerText, setTickerText] = useState(() => {
    return localStorage.getItem('av_news_ticker_text') || '⚠️ WARNING: Meteorological department issues heavy rainfall advisory for coastal sectors. • 📈 MARKET FLASH: Sensex climbs 650 points tracking solid performance in tech indices. • 🏏 CRICKET CUP: India defeats South Africa by 4 wickets in historic decider tournament.';
  });

  const [useCustomTicker, setUseCustomTicker] = useState(() => {
    return localStorage.getItem('av_news_use_custom_ticker') === 'true';
  });

  // Client-Side Dynamic Router
  const [currentView, setCurrentView] = useState<'home' | 'admin' | '404'>('home');

  // Custom Toast Notifier liststate
  interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
  }
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Sync state modifications safely with LocalStorage
  useEffect(() => {
    localStorage.setItem('av_news_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('av_news_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('av_news_site_settings', JSON.stringify(siteSettings));
    // Set Document title to match site name dynamically
    document.title = `${siteSettings.siteName} | Real-time Global Breaking News`;
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem('av_news_ticker_text', tickerText);
  }, [tickerText]);

  useEffect(() => {
    localStorage.setItem('av_news_use_custom_ticker', String(useCustomTicker));
  }, [useCustomTicker]);

  // URL Path router parser
  useEffect(() => {
    const handleUrlNav = () => {
      const path = window.location.pathname;
      const search = window.location.search;
      const hash = window.location.hash;

      if (path === '/admin' || search.includes('view=admin') || hash === '#admin') {
        setCurrentView('admin');
      } else if (path === '/' || path === '' || search.includes('view=home') || hash === '#home') {
        setCurrentView('home');
      } else {
        // Simple client side path routing detection: if some path is typed that doesn't correspond to root/admin
        setCurrentView('404');
      }
    };

    handleUrlNav();
    window.addEventListener('popstate', handleUrlNav);
    window.addEventListener('hashchange', handleUrlNav);
    return () => {
      window.removeEventListener('popstate', handleUrlNav);
      window.removeEventListener('hashchange', handleUrlNav);
    };
  }, []);

  const navigateTo = (view: 'home' | 'admin' | '404') => {
    setCurrentView(view);
    const resolvedPath = view === 'admin' ? '/admin' : view === '404' ? '/not-found' : '/';
    window.history.pushState({}, '', resolvedPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Smooth scroll handler inside dynamic frontend
  const handleNavClick = (sectionId: string) => {
    if (currentView !== 'home') {
      navigateTo('home');
    }
    setSearchQuery('');
    
    // If sectionId corresponds to a category, map and trigger category tabs focus
    const catMap: Record<string, string> = {
      world: 'World',
      politics: 'Politics',
      technology: 'Technology',
      business: 'Business',
      entertainment: 'Entertainment',
      sports: 'Sports',
      auto: 'Auto',
      national: 'National',
      opinion: 'Opinion'
    };

    const isCategory = catMap[sectionId.toLowerCase()] !== undefined;

    if (isCategory) {
      setSelectedCategoryTab(catMap[sectionId.toLowerCase()]);
    }

    setActiveSection(sectionId.toLowerCase());

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  };

  // Filter articles globally if search query exists
  const isSearching = searchQuery.trim() !== '';
  const searchResults = articles.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesQuery = (
      item.title.toLowerCase().includes(q) ||
      item.excerpt.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.author.toLowerCase().includes(q)
    );

    let matchesStartDate = true;
    if (searchStartDate) {
      const startMs = new Date(`${searchStartDate}T00:00:00`).getTime();
      matchesStartDate = item.timestamp >= startMs;
    }

    let matchesEndDate = true;
    if (searchEndDate) {
      const endMs = new Date(`${searchEndDate}T23:59:59`).getTime();
      matchesEndDate = item.timestamp <= endMs;
    }

    return matchesQuery && matchesStartDate && matchesEndDate;
  });

  // Track active anchor scroll sections and highlight navigation items
  useEffect(() => {
    const handleScrollAnchorHighlight = () => {
      if (isSearching || currentView !== 'home') return;

      const offsets = [
        { id: 'home', el: document.getElementById('home') },
        { id: 'latest', el: document.getElementById('latest') },
        { id: 'sports', el: document.getElementById('sports') },
        { id: 'technology', el: document.getElementById('technology') },
        { id: 'business', el: document.getElementById('business') },
      ];

      const scrollPosition = window.scrollY + 205;

      for (const section of offsets) {
        if (section.el) {
          const top = section.el.offsetTop;
          const height = section.el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollAnchorHighlight);
    return () => window.removeEventListener('scroll', handleScrollAnchorHighlight);
  }, [isSearching, currentView]);

  // Handle article display transitions
  const handleArticleSelect = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-navy dark:text-zinc-100 transition-colors duration-300 flex flex-col justify-between relative">
      
      {/* Scroll Position Anchors & Nav Headers */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeSection={activeSection}
        setActiveSection={handleNavClick}
        siteSettings={siteSettings}
        onNavigate={navigateTo}
        currentView={currentView}
        articles={articles}
        onArticleClick={handleArticleSelect}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Breaking Ticker Loop */}
      {currentView !== 'admin' && (
        <Ticker 
          articles={articles} 
          tickerText={tickerText} 
          useCustomTicker={useCustomTicker} 
          onArticleClick={handleArticleSelect}
        />
      )}

      {/* Main Container Wrapper */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full pb-16">
        
        {/* VIEW 1: ADMIN PANEL */}
        {currentView === 'admin' ? (
          <div className="my-8 animate-[fadeInUp_0.4s_ease-out_both]" id="adminPanelPortal">
            <AdminPanel
              articles={articles}
              setArticles={setArticles}
              categories={categories}
              setCategories={setCategories}
              siteSettings={siteSettings}
              setSiteSettings={setSiteSettings}
              tickerText={tickerText}
              setTickerText={setTickerText}
              useCustomTicker={useCustomTicker}
              setUseCustomTicker={setUseCustomTicker}
              onBackToPortal={() => navigateTo('home')}
              addToast={addToast}
            />
          </div>
        ) : currentView === '404' ? (
          /* VIEW 2: 404 NOT FOUND SYSTEM PAGE */
          <div className="my-16 flex flex-col items-center justify-center text-center select-none py-16 px-6 max-w-lg mx-auto bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800 rounded-3xl shadow-xl animate-[fadeInUp_0.3s_ease]">
            <div className="bg-red-50 dark:bg-red-950/40 p-5 rounded-full mb-6 text-brand-crimson dark:text-red-500 border border-red-100 dark:border-red-900/30 animate-pulse">
              <ShieldAlert size={48} />
            </div>
            
            <h1 className="font-serif text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-2">
              404 ERROR
            </h1>
            <p className="text-zinc-450 dark:text-zinc-400 font-mono text-xs uppercase tracking-widest font-bold mb-4">
              Headline Missing or Redacted
            </p>
            <div className="w-12 h-1 bg-brand-crimson dark:bg-red-650 rounded-full mb-6 mx-auto" />
            
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8 max-w-sm">
              The reporting dispatch or url link you entered contains typos, is outdated, or has been archived from {siteSettings.siteName} primary feeds.
            </p>

            <button
              onClick={() => navigateTo('home')}
              className="px-6 py-3 bg-brand-crimson hover:bg-zinc-900/90 dark:bg-red-650 dark:hover:bg-zinc-100 dark:hover:text-zinc-950 text-white font-bold text-xs rounded-xl uppercase tracking-wider flex items-center gap-2 group shadow-lg active:scale-95 transition-all cursor-pointer"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back into main agency</span>
            </button>
          </div>
        ) : (
          /* VIEW 3: TRADITIONAL NEWSPAPER HOMEPAGE */
          <>
            {isSearching ? (
              <div className="my-12 select-none animate-[fadeInUp_0.4s_ease-out_both]" id="searchResultsPane">
                <div className="flex justify-between items-center border-b-2 border-zinc-200 dark:border-zinc-800 pb-2 mb-6">
                  <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-zinc-950 dark:text-zinc-50 flex items-center gap-2">
                    <Search size={22} className="text-brand-crimson dark:text-red-500" />
                    <span>Search Results for "{searchQuery}"</span>
                  </h2>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSearchStartDate('');
                      setSearchEndDate('');
                    }}
                    className="text-xs font-bold text-zinc-500 hover:text-brand-crimson hover:underline cursor-pointer flex items-center gap-1"
                    aria-label="Clear searches"
                  >
                    <X size={14} /> Clear Results
                  </button>
                </div>

                {/* Date Filter Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 mb-8 text-xs font-mono font-bold text-zinc-650 dark:text-zinc-300">
                  <div className="flex items-center gap-1.5 text-brand-crimson dark:text-red-400 shrink-0">
                    <span className="w-2 h-2 rounded-full bg-brand-crimson animate-ping" />
                    <span>📅 DATE SEARCH RANGE:</span>
                  </div>
                  
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="font-sans text-xs text-zinc-500 font-normal">From</span>
                    <input 
                      type="date" 
                      value={searchStartDate}
                      onChange={(e) => setSearchStartDate(e.target.value)}
                      className="bg-white dark:bg-zinc-950 px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 outline-none text-zinc-900 dark:text-zinc-100 font-sans cursor-pointer focus:border-red-500 focus:ring-1 focus:ring-red-500/25 w-full sm:w-auto"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="font-sans text-xs text-zinc-500 font-normal">To</span>
                    <input 
                      type="date" 
                      value={searchEndDate}
                      onChange={(e) => setSearchEndDate(e.target.value)}
                      className="bg-white dark:bg-zinc-950 px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 outline-none text-zinc-900 dark:text-zinc-100 font-sans cursor-pointer focus:border-red-500 focus:ring-1 focus:ring-red-500/25 w-full sm:w-auto"
                    />
                  </div>

                  {(searchStartDate || searchEndDate) && (
                    <button
                      onClick={() => {
                        setSearchStartDate('');
                        setSearchEndDate('');
                      }}
                      className="text-[10px] text-red-500 dark:text-red-400 hover:underline font-black cursor-pointer bg-red-500/10 px-3 py-1.5 rounded-full border border-red-500/15"
                    >
                      Reset Date Slices
                    </button>
                  )}
                </div>

                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {searchResults.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleArticleSelect(item)}
                        className="group cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-850 rounded-xl overflow-hidden shadow-xs hover:shadow-md card-hover-effect flex flex-col justify-between border-l-3 border-l-brand-crimson"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-850">
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-3 left-3 bg-brand-navy/80 text-white text-[9px] uppercase font-extrabold px-2 py-0.5 rounded shadow-sm">
                            {item.category}
                          </span>
                        </div>

                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-serif text-sm font-extrabold text-zinc-950 dark:text-zinc-50 leading-snug group-hover:text-brand-crimson dark:group-hover:text-red-400 transition-colors line-clamp-2">
                              {item.title}
                            </h3>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                              {item.excerpt}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-850 flex justify-between items-center text-[10px] text-zinc-400">
                            <span>{item.time || 'A moment ago'}</span>
                            <span className="text-brand-crimson dark:text-red-400 font-bold tracking-tight">Read story &rarr;</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 bg-zinc-100/50 dark:bg-zinc-900/20 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 text-center text-zinc-500 max-w-lg mx-auto p-6">
                    <AlertCircle size={40} className="text-zinc-350 dark:text-zinc-650 mb-3" />
                    <h3 className="font-serif text-base font-bold text-zinc-800 dark:text-zinc-200 mb-1">No headlines found</h3>
                    <p className="text-xs leading-normal">
                      We couldn't locate any stories match your terms. Try searching for different keywords or checking settings.
                    </p>
                  </div>
                )}
              </div>
            ) : activeSection !== 'home' ? (
              /* VIEW: CATEGORY FILTER VIEW */
              <div id="category-focus" className="my-8 select-none animate-[fadeInUp_0.4s_ease-out_both]">
                {/* Visual Section Header */}
                <div className="border-b-4 border-zinc-900 dark:border-zinc-800 pb-4 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-crimson dark:bg-red-500 animate-pulse" />
                      <span className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Live Wire Dispatch</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-zinc-900 dark:text-zinc-50 uppercase">
                      {activeSection} Feed
                    </h2>
                  </div>
                  <button
                    onClick={() => handleNavClick('home')}
                    className="text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-brand-crimson dark:hover:text-red-400 hover:underline cursor-pointer flex items-center gap-1.5 font-mono"
                  >
                    &larr; Back to Main Newspaper
                  </button>
                </div>

                {/* Filter matches */}
                {articles.filter(art => {
                  const targetCat = activeSection.toLowerCase();
                  const artCat = art.category.toLowerCase();
                  if (targetCat === 'politics' && artCat === 'national') return true;
                  if (targetCat === 'national' && artCat === 'politics') return true;
                  if (targetCat === 'tech' && artCat === 'technology') return true;
                  if (targetCat === 'technology' && artCat === 'tech') return true;
                  return artCat === targetCat;
                }).length > 0 ? (
                  (() => {
                    const filteredList = articles.filter(art => {
                      const targetCat = activeSection.toLowerCase();
                      const artCat = art.category.toLowerCase();
                      if (targetCat === 'politics' && artCat === 'national') return true;
                      if (targetCat === 'national' && artCat === 'politics') return true;
                      if (targetCat === 'tech' && artCat === 'technology') return true;
                      if (targetCat === 'technology' && artCat === 'tech') return true;
                      return artCat === targetCat;
                    });
                    const featured = filteredList[0];
                    const remaining = filteredList.slice(1);

                    return (
                      <div className="space-y-10">
                        {/* Elite Featured Lead Story Card */}
                        {featured && (
                          <div 
                            onClick={() => handleArticleSelect(featured)}
                            className="group cursor-pointer grid grid-cols-1 md:grid-cols-12 gap-6 bg-white dark:bg-zinc-900/45 border border-zinc-200/60 dark:border-zinc-800/80 rounded-3xl overflow-hidden shadow-xs hover:shadow-lg card-hover-effect"
                          >
                            <div className="md:col-span-7 aspect-[16/10] md:aspect-auto md:h-96 overflow-hidden relative">
                              <img 
                                src={featured.image} 
                                alt={featured.title} 
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-700"
                              />
                              <span className="absolute top-4 left-4 bg-brand-crimson text-white text-[9px] uppercase font-mono font-black py-1 px-3.5 rounded-full shadow">
                                LEAD DISPATCH
                              </span>
                            </div>
                            <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                              <div className="space-y-4">
                                <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-brand-crimson dark:text-red-400">
                                  {featured.category} / {getRelativeTime(featured.timestamp)}
                                </span>
                                <h3 className="text-xl sm:text-2xl font-serif font-black leading-tight text-zinc-900 dark:text-white group-hover:text-brand-crimson dark:group-hover:text-red-400 transition-colors">
                                  {featured.title}
                                </h3>
                                <p className="text-zinc-650 dark:text-zinc-300 text-sm leading-relaxed font-sans">
                                  {featured.excerpt}
                                </p>
                              </div>
                              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 mt-6 flex justify-between items-center text-xs font-medium text-zinc-500 font-mono">
                                <span>Reported by {featured.author}</span>
                                <span className="text-brand-crimson dark:text-red-400 font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">Read Story &rarr;</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Traditional Grid Feed for Remainder */}
                        {remaining.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {remaining.map(item => (
                              <div
                                key={`catGrid-${item.id}`}
                                onClick={() => handleArticleSelect(item)}
                                className="group cursor-pointer bg-white dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md card-hover-effect flex flex-col justify-between"
                              >
                                <div className="aspect-[16/10] overflow-hidden relative bg-zinc-100 dark:bg-zinc-855">
                                  <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                                  />
                                </div>
                                <div className="p-4 flex-grow flex flex-col justify-between">
                                  <div>
                                    <span className="text-[9px] font-mono font-extrabold pb-1.5 text-zinc-400 uppercase tracking-widest block">
                                      {getRelativeTime(item.timestamp)}
                                    </span>
                                    <h4 className="font-serif text-sm font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-brand-crimson dark:group-hover:text-red-400 transition-colors leading-snug line-clamp-2">
                                      {item.title}
                                    </h4>
                                    <p className="text-zinc-500 dark:text-zinc-400 text-xs mt-2 leading-relaxed line-clamp-3">
                                      {item.excerpt}
                                    </p>
                                  </div>
                                  <div className="mt-4 pt-3 border-t border-zinc-100/60 dark:border-zinc-800/65 flex justify-between items-center text-[10px] text-zinc-400 font-mono">
                                    <span>By {item.author}</span>
                                    <span className="text-brand-crimson dark:text-red-400 font-bold group-hover:translate-x-0.5 transition-transform">Read &rarr;</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 bg-zinc-100/40 dark:bg-zinc-900/10 rounded-3xl border border-zinc-200/50 dark:border-zinc-800/80 text-center max-w-md mx-auto p-6">
                    <AlertCircle size={40} className="text-zinc-350 dark:text-zinc-650 mb-3 animate-pulse" />
                    <h3 className="font-serif text-base font-bold text-zinc-800 dark:text-zinc-200 mb-1">No News Items Available</h3>
                    <p className="text-xs text-zinc-500 leading-normal mb-6">
                      There are currently no published articles found under the "{activeSection}" classification.
                    </p>
                    <button
                      onClick={() => handleNavClick('home')}
                      className="px-5 py-2.5 bg-brand-crimson hover:bg-red-700 text-white text-xs font-bold rounded-xl uppercase tracking-wider"
                    >
                      Return Home
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* traditional newspaper layouts */
              <div id="home" className="animate-[fade-in_0.5s_ease_out]">
                
                {/* Dedicated High-Impact Breaking News Courier Spotlight */}
                {articles.filter((art) => art.isBreaking).length > 0 && (
                  <div className="mb-8 p-5 sm:p-6 bg-red-600/[0.03] dark:bg-red-500/[0.03] border-2 border-red-500/20 rounded-3xl relative overflow-hidden select-none animate-[pulse-subtle_4s_infinite]">
                    <div className="absolute -right-12 -top-12 w-48 h-48 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-red-500/10">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-405 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                        </span>
                        <h3 className="font-serif text-xs sm:text-sm font-black text-brand-crimson dark:text-red-400 tracking-widest uppercase flex items-center gap-1.5 font-mono">
                          🚨 NEWS Spotlight • BREAKING ALERTS
                        </h3>
                      </div>
                      <span className="text-[9px] font-mono font-black tracking-widest text-red-550 border border-red-500/10 bg-red-500/10 px-2 py-0.5 rounded shadow-sm">
                        TOTAL: {articles.filter((art) => art.isBreaking).length} ACTIVE
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {articles.filter((art) => art.isBreaking).slice(0, 3).map((art) => (
                        <div 
                          key={`breaking-spotlight-${art.id}`}
                          onClick={() => handleArticleSelect(art)}
                          className="group cursor-pointer bg-white dark:bg-zinc-900 border border-red-500/10 hover:border-red-500/30 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between animate-fade-in"
                        >
                          <div>
                            <div className="relative aspect-[16/9.5] rounded-xl overflow-hidden mb-3 bg-zinc-100 dark:bg-zinc-850 border border-zinc-200/10">
                              <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" referrerPolicy="no-referrer" />
                              <span className="absolute top-2 left-2 bg-red-600 text-white text-[8px] font-black tracking-widest uppercase px-2 py-0.5 rounded shadow-md animate-pulse">
                                BREAKING
                              </span>
                            </div>
                            <h4 className="font-serif font-black text-sm text-zinc-950 dark:text-zinc-100 line-clamp-2 leading-snug group-hover:text-brand-crimson dark:group-hover:text-red-400 transition-colors">
                              {art.title}
                            </h4>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                              {art.excerpt}
                            </p>
                          </div>
                          <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex justify-between items-center text-[10px] text-zinc-400 font-mono">
                            <span>By {art.author}</span>
                            <span className="text-brand-crimson dark:text-red-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">COVERAGE &rarr;</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hero Main Cover panels */}
                <Hero articles={articles} onArticleClick={handleArticleSelect} onPlayVideo={setActiveVideoPlaybackUrl} />

                {/* 12-Column Responsive Layout with Right Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                  
                  {/* Left Column (8 out of 12) */}
                  <div className="lg:col-span-8 flex flex-col gap-8">
                    {/* Scrollable Hot cards */}
                    <TrendingScroll articles={articles} onArticleClick={handleArticleSelect} />

                    {/* Custom Interactive Tab section switcher */}
                    <CategoryTabs 
                      articles={articles} 
                      categories={categories} 
                      onArticleClick={handleArticleSelect} 
                      activeTab={selectedCategoryTab}
                      setActiveTab={setSelectedCategoryTab}
                      onPlayVideo={setActiveVideoPlaybackUrl}
                    />

                    {/* Latest stories row column feeds */}
                    <LatestNews articles={articles} onArticleClick={handleArticleSelect} onPlayVideo={setActiveVideoPlaybackUrl} />

                    {/* Live Sports broadcast with simulated commentary panel */}
                    <SportsSection articles={articles} onArticleClick={handleArticleSelect} onPlayVideo={setActiveVideoPlaybackUrl} />

                    {/* Review Mobility spec rating listings */}
                    <AutoSection articles={articles} onArticleClick={handleArticleSelect} onPlayVideo={setActiveVideoPlaybackUrl} />

                    {/* Writer picks quote deck */}
                    <OpinionSection articles={articles} onArticleClick={handleArticleSelect} />

                    {/* Streaming Video Theater modals grid */}
                    <VideoSection articles={articles} />
                  </div>

                  {/* Right Sidebar Column (4 out of 12) */}
                  <aside className="lg:col-span-4 flex flex-col gap-8 self-start">
                    
                    {/* Top 5 Numbered Trending Stories */}
                    <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800 rounded-3xl p-6 shadow-xs select-none">
                      <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-5">
                        <Flame size={18} className="text-red-650 fill-red-500 animate-pulse shrink-0" />
                        <h3 className="font-serif text-[13px] font-black text-zinc-950 dark:text-zinc-50 tracking-widest uppercase">
                          TRENDING TOP 5
                        </h3>
                      </div>

                      <div className="flex flex-col gap-5">
                        {articles
                          .slice()
                          .sort((a, b) => (b.views || 0) - (a.views || 0))
                          .slice(0, 5)
                          .map((article, idx) => (
                            <div
                              key={`trend-${article.id}`}
                              onClick={() => handleArticleSelect(article)}
                              className="group cursor-pointer flex gap-4 items-start"
                            >
                              <div className="text-2xl sm:text-3xl font-serif font-black text-zinc-200 dark:text-zinc-800 w-6 text-center select-none group-hover:text-brand-crimson dark:group-hover:text-red-500 transition-colors shrink-0 mt-0.5">
                                {idx + 1}
                              </div>
                              <div className="flex-grow min-w-0">
                                <span className="text-[8px] tracking-widest font-extrabold uppercase text-brand-crimson dark:text-red-400 block mb-1">
                                  {article.category}
                                </span>
                                <h4 className="font-serif text-xs md:text-[13px] font-bold text-zinc-900 dark:text-zinc-100 leading-snug group-hover:text-brand-crimson dark:group-hover:text-red-400 transition-colors line-clamp-2">
                                  {article.title}
                                </h4>
                                <div className="flex items-center gap-1 text-[9px] text-zinc-400 dark:text-zinc-500 font-bold font-mono uppercase mt-1">
                                  <span>🔥 {article.views} Views</span>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Most Read stories */}
                    <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200/60 dark:border-zinc-800 rounded-3xl p-6 shadow-xs select-none">
                      <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-5">
                        <TrendingUp size={18} className="text-amber-500 shrink-0" />
                        <h3 className="font-serif text-[13px] font-black text-zinc-950 dark:text-zinc-50 tracking-widest uppercase">
                          MOST READ STORIES
                        </h3>
                      </div>

                      <div className="flex flex-col gap-4">
                        {articles
                          .slice()
                          .sort((a, b) => b.timestamp - a.timestamp)
                          .slice(0, 4)
                          .map((article) => (
                            <div
                              key={`most-read-${article.id}`}
                              onClick={() => handleArticleSelect(article)}
                              className="group cursor-pointer flex gap-3.5 items-center pb-3.5 border-b border-zinc-100 dark:border-zinc-800 last:border-0 last:pb-0"
                            >
                              <img
                                src={article.image}
                                alt={article.title}
                                loading="lazy"
                                referrerPolicy="no-referrer"
                                className="w-12 h-12 rounded-xl object-cover bg-zinc-100 dark:bg-zinc-800 shrink-0 shadow-xs border border-zinc-200/10"
                              />
                              <div className="overflow-hidden min-w-0">
                                <h4 className="font-serif text-xs font-bold text-zinc-900 dark:text-zinc-100 leading-snug group-hover:text-brand-crimson dark:group-hover:text-red-450 transition-colors line-clamp-2">
                                  {article.title}
                                </h4>
                                <span className="text-[8px] text-zinc-400 dark:text-zinc-500 font-extrabold font-mono uppercase tracking-wider block mt-1.5 animate-pulse">
                                  {getRelativeTime(article.timestamp)}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>

                  </aside>
                </div>

              </div>
            )}
          </>
        )}
      </main>

      {/* Directory Footer segment */}
      <Footer 
        onNavClick={handleNavClick} 
        siteSettings={siteSettings} 
        onNavigate={navigateTo} 
      />

      {/* Full layout Article details Modal controller */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-[200] overflow-y-auto bg-white dark:bg-zinc-900 animate-[fadeInUp_0.3s_ease-out_both]"
          style={{ scrollBehavior: 'smooth' }}
        >
          <ArticleReader
            article={selectedArticle}
            onClose={handleCloseArticle}
            allArticles={articles}
            onArticleClick={handleArticleSelect}
          />
        </div>
      )}

      {/* Toast Overlay stack alert manager */}
      <div className="fixed bottom-6 right-6 z-[300] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto w-full p-4 rounded-xl shadow-2xl border backdrop-blur-md text-xs font-bold leading-relaxed flex items-center justify-between gap-3 animate-[slideUp_0.25s_ease-out-back] transform-gpu ${
              toast.type === 'success'
                ? 'bg-emerald-500/90 dark:bg-emerald-950/95 border-emerald-400 dark:border-emerald-800 text-white text-emerald-100'
                : toast.type === 'error'
                ? 'bg-red-600/90 dark:bg-red-950/95 border-red-400 dark:border-red-900 text-white text-red-105'
                : 'bg-zinc-900/90 dark:bg-zinc-950/95 border-zinc-700 dark:border-zinc-800 text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === 'success' && <CheckCircle2 size={16} className="text-emerald-100 animate-bounce" />}
              {toast.type === 'error' && <AlertTriangle size={16} className="text-red-100" />}
              {toast.type === 'info' && <Info size={16} />}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-white/70 hover:text-white hover:bg-white/10 rounded p-1 cursor-pointer"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>

      {/* Video Playback Lightbox Modal */}
      {activeVideoPlaybackUrl && (
        (() => {
          const url = activeVideoPlaybackUrl;
          const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
          const isTwitter = url.includes('twitter.com') || url.includes('x.com');
          let embedUrl = url;
          if (isYouTube) {
            if (url.includes('youtube.com/embed/')) {
              // already embed url
            } else if (url.includes('youtu.be/')) {
              const videoId = url.split('/').pop()?.split('?')[0];
              embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            } else if (url.includes('watch?v=')) {
              const videoId = url.split('v=')[1]?.split('&')[0];
              embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            }
          }
          return (
            <div 
              className="fixed inset-0 bg-black/90 p-4 sm:p-6 flex items-center justify-center z-[400] backdrop-blur-md select-none animate-[fadeInUp_0.3s_ease-out_both]"
              onClick={() => setActiveVideoPlaybackUrl(null)}
            >
              <div 
                className="relative w-full max-w-4xl bg-zinc-950 rounded-3xl overflow-hidden shadow-2xl border border-zinc-805"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  type="button"
                  onClick={() => setActiveVideoPlaybackUrl(null)}
                  className="absolute top-4 right-4 bg-zinc-900/85 hover:bg-zinc-800 text-white p-2 rounded-full cursor-pointer z-25 transition-colors border border-white/10"
                >
                  <X size={18} className="stroke-[2.5]" />
                </button>

                <div className="relative aspect-video w-full">
                  {isYouTube ? (
                    <iframe
                      src={embedUrl}
                      title="YouTube Video Player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-x-0 inset-y-0 w-full h-full border-0"
                    />
                  ) : isTwitter ? (
                    <div className="absolute inset-0 bg-zinc-950 p-6 flex flex-col items-center justify-center gap-4 text-center">
                      <span className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-white border border-zinc-800 text-lg font-black">X</span>
                      <div>
                        <h4 className="text-sm font-serif font-black text-white">Social Network Coverage</h4>
                        <p className="text-[11px] text-zinc-450 mt-1 max-w-sm">Click below to open live posts containing social network clips and coverage streams directly.</p>
                      </div>
                      <a 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-5 py-2.5 bg-white hover:bg-zinc-200 text-black font-extrabold text-[10px] rounded-xl tracking-wider uppercase transition-all shadow-md active:scale-95 animate-pulse"
                      >
                        View live post on X &rarr;
                      </a>
                    </div>
                  ) : (
                    <video 
                      src={url} 
                      controls 
                      autoPlay 
                      preload="auto"
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })()
      )}

      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(30px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .text-red-105 {
          color: #fee2e2;
        }
        .bg-red-750 {
          background-color: #b91c1c;
        }
        .bg-red-650 {
          background-color: #dc2626;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
