import { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Search, Menu, X, CloudSun, Shield, Flame } from 'lucide-react';
import { Article, SiteSettings } from '../types';
import { getCategoryColor } from '../data';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  siteSettings: SiteSettings;
  onNavigate: (view: string) => void;
  currentView: string;
  articles?: Article[];
  onArticleClick?: (article: Article) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  activeSection,
  setActiveSection,
  siteSettings,
  onNavigate,
  currentView,
  articles = [],
  onArticleClick,
  theme,
  toggleTheme,
}: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavShrunk, setIsNavShrunk] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [weather, setWeather] = useState<{ temp: number; text: string } | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch live weather for New Delhi
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.20&current=temperature_2m,weather_code')
      .then((res) => {
        if (!res.ok) throw new Error('Weather API error');
        return res.json();
      })
      .then((data) => {
        if (data && data.current) {
          const temp = Math.round(data.current.temperature_2m);
          const code = data.current.weather_code;
          let text = 'Sunny';
          if (code === 0) text = 'Clear';
          else if ([1, 2, 3].includes(code)) text = 'Partly Cloudy';
          else if ([45, 48].includes(code)) text = 'Foggy';
          else if ([51, 53, 55, 56, 57].includes(code)) text = 'Drizzle';
          else if ([61, 63, 65, 66, 67].includes(code)) text = 'Rainy';
          else if ([71, 73, 75, 77].includes(code)) text = 'Snowy';
          else if ([80, 81, 82].includes(code)) text = 'Shower';
          else if ([95, 96, 99].includes(code)) text = 'Thunderstorm';
          setWeather({ temp, text });
        }
      })
      .catch((err) => {
        console.warn('Weather API failed, fallback configured', err);
        setWeather({ temp: 35, text: 'Clear' });
      });
  }, []);

  // Auto-generate Date and Day
  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    // Force target date context
    setCurrentDate(new Date().toLocaleDateString('en-US', options));
  }, []);

  // Sticky Navbar shrink effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsNavShrunk(true);
      } else {
        setIsNavShrunk(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click-outside of search container
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCategoryThemeColors = (filter: string) => {
    switch (filter) {
      case 'politics':
      case 'national':
        return {
          dotBg: 'bg-blue-600',
          textColorActive: 'text-blue-600 dark:text-blue-400',
          borderActive: 'border-blue-600 dark:border-blue-400'
        };
      case 'sports':
        return {
          dotBg: 'bg-green-600',
          textColorActive: 'text-green-600 dark:text-green-400',
          borderActive: 'border-green-600 dark:border-green-400'
        };
      case 'technology':
        return {
          dotBg: 'bg-purple-600',
          textColorActive: 'text-purple-600 dark:text-purple-400',
          borderActive: 'border-purple-600 dark:border-purple-400'
        };
      case 'world':
        return {
          dotBg: 'bg-orange-600',
          textColorActive: 'text-orange-600 dark:text-orange-400',
          borderActive: 'border-orange-600 dark:border-orange-400'
        };
      case 'business':
        return {
          dotBg: 'bg-amber-600',
          textColorActive: 'text-amber-600 dark:text-amber-400',
          borderActive: 'border-amber-600 dark:border-amber-400'
        };
      case 'entertainment':
        return {
          dotBg: 'bg-pink-600',
          textColorActive: 'text-pink-600 dark:text-pink-450',
          borderActive: 'border-pink-600 dark:border-pink-450'
        };
      case 'auto':
        return {
          dotBg: 'bg-rose-600',
          textColorActive: 'text-rose-600 dark:text-rose-450',
          borderActive: 'border-rose-600 dark:border-rose-450'
        };
      case 'opinion':
        return {
          dotBg: 'bg-teal-600',
          textColorActive: 'text-teal-600 dark:text-teal-400',
          borderActive: 'border-teal-605 dark:border-teal-400'
        };
      default:
        return {
          dotBg: 'bg-brand-crimson',
          textColorActive: 'text-brand-crimson dark:text-red-500',
          borderActive: 'border-brand-crimson dark:border-red-500'
        };
    }
  };

  const menuItems = [
    { label: 'Home', filter: 'home' },
    { label: 'National', filter: 'national' },
    { label: 'World', filter: 'world' },
    { label: 'Politics', filter: 'politics' },
    { label: 'Tech', filter: 'technology' },
    { label: 'Sports', filter: 'sports' },
    { label: 'Business', filter: 'business' },
    { label: 'Auto', filter: 'auto' },
    { label: 'Opinion', filter: 'opinion' },
    { label: 'Entertainment', filter: 'entertainment' },
  ];

  const handleNavClick = (filter: string) => {
    setIsMobileMenuOpen(false);
    
    // If we're not currently on the main homepage view, route back first
    if (currentView !== 'home') {
      onNavigate('home');
    }
    
    setActiveSection(filter);
    
    // Smooth scroll to relevant elements
    setTimeout(() => {
      const targetElement = document.getElementById(filter);
      if (targetElement) {
        const offset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <header className="w-full bg-white dark:bg-brand-navy border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      {/* Top Bar */}
      <div className="border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50 dark:bg-brand-navy/95 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs font-semibold text-zinc-600 dark:text-zinc-400 font-sans">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 dark:text-zinc-400">{currentDate}</span>
            {articles.some((a) => a.isBreaking) && (
              <span className="inline-flex items-center gap-1 bg-red-650 animate-pulse text-white px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-widest shadow-sm select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                LIVE REPORTING
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1.5 text-red-600 dark:text-red-500 hover:opacity-90 transition-opacity select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-450 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            <span className="font-serif tracking-tight font-black text-sm text-brand-crimson dark:text-red-500">{siteSettings.siteName}</span>
          </div>
          
          <div className="flex items-center gap-1.5" title="Live New Delhi Weather courtesy of Open-Meteo">
            <CloudSun size={14} className="text-amber-500 shrink-0" />
            <span className="font-mono text-[11px] text-zinc-650 dark:text-zinc-300">
              {weather ? `${weather.temp}°C • New Delhi (${weather.text})` : 'New Delhi • loading...'}
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Navbar wrapper */}
      <nav
        className={`sticky top-0 bg-white/95 dark:bg-brand-navy/95 backdrop-blur-sm shadow-md transition-all duration-300 z-50 ${
          isNavShrunk ? 'py-1.5 shadow-lg' : 'py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Menu Drawer Toggle on Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden flex items-center p-1.5 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-100"
            aria-label="Open menu"
            id="mobileMenuBtn"
          >
            <Menu size={20} />
          </button>

          {/* Logo on current left */}
          <div
            onClick={() => {
              if (currentView !== 'home') onNavigate('home');
              handleNavClick('home');
            }}
            className="cursor-pointer flex items-center gap-2"
          >
            {siteSettings.logoUrl ? (
              <img src={siteSettings.logoUrl} alt={siteSettings.siteName} className="h-8 max-w-[180px] object-contain rounded" />
            ) : (
              <div className="flex items-center gap-1.5 font-serif text-xl sm:text-2xl font-black tracking-tighter text-zinc-900 dark:text-white">
                <span className="text-brand-crimson dark:text-red-500 uppercase">{siteSettings.siteName.split(' ')[0] || 'AV'}</span>
                {siteSettings.siteName.split(' ').slice(1).join(' ') && (
                  <span className="bg-brand-crimson dark:bg-red-650 text-white px-1.5 py-0.5 rounded text-xs sm:text-sm tracking-wider font-sans font-extrabold shadow-sm uppercase">
                    {siteSettings.siteName.split(' ').slice(1).join(' ')}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Navigation Links for Desktop */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {menuItems.map((item) => {
              const themeColors = getCategoryThemeColors(item.filter);
              const isActive = activeSection === item.filter;
              return (
                <button
                  key={item.filter}
                  onClick={() => handleNavClick(item.filter)}
                  className={`text-xs lg:text-sm font-bold uppercase tracking-wider relative transition-colors duration-200 cursor-pointer flex items-center gap-2 py-1 ${
                    isActive
                      ? themeColors.textColorActive
                      : 'text-zinc-700 hover:text-brand-crimson dark:text-zinc-300 dark:hover:text-red-500'
                  }`}
                >
                  {item.filter !== 'home' && (
                    <span className={`w-2 h-2 rounded-full shrink-0 ${themeColors.dotBg}`} />
                  )}
                  <span>{item.label}</span>
                  {isActive && (
                    <span className={`absolute left-0 right-0 -bottom-1 h-0.5 rounded-full animate-fade-in ${themeColors.dotBg}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Search, Theme controls */}
          <div className="flex items-center gap-4 text-zinc-700 dark:text-zinc-300">
                      {/* Expanded Search with Real-time Dropdown */}
            <div ref={searchRef} className="relative flex items-center">
              <input
                type="text"
                placeholder="Search headlines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
                className={`transition-all duration-300 ease-in-out bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs rounded-full border border-zinc-200 dark:border-zinc-750 outline-none ${
                  isSearchOpen ? 'w-44 sm:w-60 px-4 py-1.5 opacity-100' : 'w-0 opacity-0 pointer-events-none'
                }`}
              />
              <button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  if (isSearchOpen) setSearchQuery('');
                }}
                className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                id="searchToggleBtn"
              >
                {isSearchOpen ? <X size={20} className="text-brand-crimson" /> : <Search size={20} />}
              </button>

              {/* Dynamic Real-time Search Dropdown results list */}
              {isSearchOpen && searchQuery.trim() !== '' && (
                <div className="absolute right-0 top-12 w-72 sm:w-80 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl shadow-2xl z-50 overflow-hidden divide-y divide-zinc-100 dark:divide-zinc-800/80">
                  <div className="px-3.5 py-2 bg-zinc-50 dark:bg-zinc-950/70 flex justify-between items-center text-[10px] text-zinc-450 dark:text-zinc-400 font-mono font-bold select-none border-b border-zinc-100 dark:border-zinc-800/60">
                    <span>LIVE MATCHING SHOTS ({
                      articles.filter((art) => 
                        art.title.toLowerCase().includes(searchQuery.toLowerCase())
                      ).length
                    })</span>
                    <button onClick={() => setSearchQuery('')} className="hover:text-brand-crimson dark:hover:text-red-400 hover:underline">Clear</button>
                  </div>
                  
                  <div className="max-h-72 overflow-y-auto no-scrollbar">
                    {articles.filter((art) => 
                      art.title.toLowerCase().includes(searchQuery.toLowerCase())
                    ).slice(0, 5).length > 0 ? (
                      articles.filter((art) => 
                        art.title.toLowerCase().includes(searchQuery.toLowerCase())
                      ).slice(0, 5).map((article) => (
                        <div
                          key={`dropdown-${article.id}`}
                          onClick={() => {
                            if (onArticleClick) {
                              onArticleClick(article);
                            }
                            setSearchQuery('');
                            setIsSearchOpen(false);
                          }}
                          className="p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 cursor-pointer flex gap-3 transition-colors items-center"
                        >
                          <img
                            src={article.image}
                            alt={article.title}
                            referrerPolicy="no-referrer"
                            className="w-11 h-11 rounded-lg object-cover bg-zinc-100 dark:bg-zinc-800 shrink-0 shadow-xs border border-zinc-200/10"
                          />
                          <div className="overflow-hidden flex-1 text-left">
                            <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase ${getCategoryColor(article.category)}`}>
                              {article.category}
                            </span>
                            <h4 className="font-serif text-[11px] font-black leading-tight text-zinc-900 dark:text-zinc-100 mt-1 line-clamp-2 hover:text-brand-crimson dark:hover:text-red-400 transition-colors">
                              {article.title}
                            </h4>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-zinc-455 dark:text-zinc-500 font-sans text-xs">
                        No matching headlines found.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle dark mode"
              id="themeToggleBtn"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} className="text-amber-500" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer (Slide in from Left) */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 backdrop-blur-xs transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`fixed top-0 bottom-0 left-0 w-72 bg-white dark:bg-brand-navy/95 p-6 shadow-2xl transition-transform duration-300 flex flex-col justify-between ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex justify-between items-center mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                {siteSettings.logoUrl ? (
                  <img src={siteSettings.logoUrl} alt={siteSettings.siteName} className="h-6 max-w-[120px] object-contain" />
                ) : (
                  <div className="flex items-center gap-1 font-serif text-lg font-black uppercase">
                    <span className="text-brand-crimson dark:text-red-500">{siteSettings.siteName.split(' ')[0] || 'AV'}</span>
                    <span className="bg-brand-crimson dark:bg-red-600 text-white px-1.5 py-0.5 rounded text-[10px] font-sans font-extrabold uppercase">
                      {siteSettings.siteName.split(' ').slice(1).join(' ') || 'NEWS'}
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {menuItems.map((item) => {
                const themeColors = getCategoryThemeColors(item.filter);
                const isActive = activeSection === item.filter;
                return (
                  <button
                    key={item.filter}
                    onClick={() => handleNavClick(item.filter)}
                    className={`text-left text-sm font-bold uppercase tracking-wider py-2 border-b border-zinc-100 dark:border-zinc-800/60 pb-2 flex items-center gap-2 transition-colors ${
                      isActive
                        ? themeColors.textColorActive
                        : 'text-zinc-800 dark:text-zinc-300 hover:text-brand-crimson dark:hover:text-red-500'
                    }`}
                  >
                    {item.filter !== 'home' && (
                      <span className={`w-2 h-2 rounded-full shrink-0 ${themeColors.dotBg}`} />
                    )}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 flex flex-col gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <div>📍 New Delhi • {weather ? `${weather.text} ${weather.temp}°C` : '32°C'}</div>
            <div>📅 {currentDate}</div>
            <div className="mt-4 text-zinc-400 text-[10px]">&copy; 2026 {siteSettings.siteName} Premium Media</div>
          </div>
        </div>
      </div>
    </header>
  );
}
