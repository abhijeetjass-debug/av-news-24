import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { X, Calendar, User, Eye, ArrowLeft, Clock, Share2, Facebook, Twitter, MessageCircle, Link2, Check, Video } from 'lucide-react';
import { getCategoryColor } from '../data';
import { getRelativeTime, formatArticleBody, estimateReadTime } from '../utils';

interface ArticleReaderProps {
  article: Article | null;
  onClose: () => void;
  allArticles?: Article[];
  onArticleClick?: (article: Article) => void;
}

export default function ArticleReader({ article, onClose, allArticles = [], onArticleClick }: ArticleReaderProps) {
  const [copied, setCopied] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  // Monitor page scroll to update reading progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const topHeight = window.scrollY;
      const fullHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (fullHeight > 10) {
        setScrollPercent((topHeight / fullHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!article) return null;

  // Filter exactly 3 related articles from same category (fallback to general list if needed)
  let relatedArticles = allArticles
    .filter((art) => art.category.toLowerCase() === article.category.toLowerCase() && art.id !== article.id)
    .slice(0, 3);

  if (relatedArticles.length === 0) {
    relatedArticles = allArticles
      .filter((art) => art.id !== article.id)
      .slice(0, 3);
  }

  // Calculate read time using robust word calculation
  const dynamicReadTime = estimateReadTime(article);

  const shareText = encodeURIComponent(`${article.title} - ${article.category} Bureau`);
  const shareUrl = encodeURIComponent(window.location.origin + `?articleId=${article.id}`);

  const handleCopyLink = () => {
    const url = window.location.origin + `?articleId=${article.id}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      }
    } catch (err) {
      console.warn("Clipboard API blocked, attempting fallback option", err);
    }

    const textArea = document.createElement("textarea");
    textArea.value = url;
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Link copy fallback option failed:", err);
    }
    document.body.removeChild(textArea);
  };

  const renderEmbeddedPlayer = (url?: string) => {
    if (!url) return null;

    const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
    const isTwitter = url.includes('twitter.com') || url.includes('x.com');
    const isDirectMp4 = url.toLowerCase().endsWith('.mp4') || url.includes('/mp4') || url.includes('.m4v') || url.includes('video');

    if (isYouTube) {
      let embedUrl = url;
      if (url.includes('youtube.com/embed/')) {
        // already embed link
      } else if (url.includes('youtu.be/')) {
        const videoId = url.split('/').pop()?.split('?')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if (url.includes('watch?v=')) {
        const videoId = url.split('v=')[1]?.split('&')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
      return (
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg bg-black">
          <iframe
            src={embedUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>
      );
    }

    if (isTwitter) {
      return (
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 bg-zinc-50 dark:bg-zinc-950/40 flex flex-col gap-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 font-sans font-black text-xs">X</span>
              <div>
                <h4 className="text-[11px] font-black leading-tight text-zinc-900 dark:text-zinc-100">X / Twitter Live Coverage</h4>
                <p className="text-[9px] text-zinc-450 dark:text-zinc-500">Official Social Media Clip</p>
              </div>
            </div>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-3 py-1 bg-zinc-950 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-250 text-white dark:text-zinc-950 font-sans text-[10px] font-black rounded-lg transition-colors cursor-pointer"
            >
              Open Post
            </a>
          </div>
          <div className="text-xs text-zinc-650 dark:text-zinc-350 italic bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-150 dark:border-zinc-900 shadow-xs leading-relaxed max-w-full overflow-hidden break-words">
            <div className="font-bold flex items-center gap-1.5 mb-2 text-brand-crimson dark:text-red-400 font-mono text-[10px]">
              <Video size={12} />
              <span>EMBEDDED MEDIA DEPLOYED</span>
            </div>
            <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600 dark:text-blue-400 font-medium">Click here to view live thread commentary</a>
          </div>
        </div>
      );
    }

    // Direct MP4 browser native video controls
    return (
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-lg bg-black border border-zinc-300/10">
        <video 
          src={url} 
          controls 
          preload="metadata"
          className="w-full h-full"
        />
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-xl border border-zinc-200/55 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 flex flex-col mb-12 animate-[fadeInUp_0.35s_ease-out_both]" id="dedicatedArticleReader">
      
      {/* Article Header Bar */}
      <div className="bg-white/90 dark:bg-zinc-900/95 w-full sticky top-[57px] md:top-[61px] backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800 p-4 sm:px-6 flex justify-between items-center z-10 transition-colors duration-300">
        <button
          onClick={onClose}
          className="text-xs font-bold uppercase tracking-widest text-zinc-550 dark:text-zinc-400 hover:text-brand-crimson dark:hover:text-red-500 flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <ArrowLeft size={14} className="stroke-[2.5]" />
          <span>Back to feeds</span>
        </button>
        
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-805 dark:hover:text-white cursor-pointer transition-colors"
          aria-label="Close article"
        >
          <X size={18} className="stroke-[2.5]" />
        </button>

        {/* Dynamic scroll reading progress line */}
        <div className="absolute bottom-0 left-0 w-full h-[3px] bg-zinc-100 dark:bg-zinc-800">
          <div 
            className="h-full bg-brand-crimson dark:bg-red-550 transition-all duration-100" 
            style={{ width: `${scrollPercent}%` }} 
          />
        </div>
      </div>

      {/* Main Narrative document block */}
      <div className="p-6 sm:p-10 space-y-7">
        
        {/* Topic Pill & Relative Time Stamp */}
        <div className="flex items-center gap-3">
          <span className={`text-[9px] tracking-widest uppercase font-extrabold px-3 py-1 rounded shadow-sm ${getCategoryColor(article.category)}`}>
            {article.category}
          </span>
          <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-bold uppercase tracking-wider font-mono">
            <Calendar size={11} className="text-zinc-450 dark:text-zinc-500" />
            <span>{getRelativeTime(article.timestamp)}</span>
          </div>
        </div>

        {/* Story Primary Headline */}
        <h1 className="font-serif text-2xl sm:text-3.5xl md:text-4xl font-extrabold text-zinc-950 dark:text-white tracking-tight leading-tight">
          {article.title}
        </h1>

        {/* Underline summary excerpt */}
        <p className="font-sans text-sm sm:text-base text-zinc-650 dark:text-zinc-300 leading-relaxed border-l-4 border-l-brand-crimson dark:border-l-red-500 pl-4 py-0.5 italic font-medium">
          {article.excerpt}
        </p>

        {/* Featured Card Image Banner */}
        <div className="relative aspect-[16/9.5] w-full bg-zinc-100 dark:bg-zinc-800 rounded-2.5xl overflow-hidden shadow-inner select-none border border-zinc-200/10">
          <img
            src={article.image}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Credit line & Source indicator */}
        {(article.source || article.sourceName) && (
          <div className="flex items-center justify-between gap-4 mt-2 py-2.5 border-b border-dashed border-zinc-150 dark:border-zinc-800 text-[10px] font-mono leading-none tracking-wider text-zinc-500 dark:text-zinc-400">
            <span className="font-bold text-zinc-400 uppercase">⚡ ARCHIVE VERIFICATION CODE DIRECTIVE</span>
            <div className="flex items-center gap-1">
              <span className="font-sans text-[10.5px]">Source:</span>
              {article.sourceUrl || article.source ? (
                <a 
                  href={article.sourceUrl || article.source} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-sans font-black text-brand-crimson dark:text-red-400 hover:underline hover:opacity-90 transition-opacity flex items-center"
                >
                  {article.sourceName || 'Visit Publisher Source'} &rarr;
                </a>
              ) : (
                <span className="font-sans font-bold text-zinc-850 dark:text-zinc-250">{article.sourceName}</span>
              )}
            </div>
          </div>
        )}

        {/* Editorial Reporting Desk Attributes */}
        <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-4 border-y border-zinc-100 dark:border-zinc-800 py-4 text-[10px] text-zinc-550 dark:text-zinc-400 font-bold tracking-wider uppercase font-mono select-none">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-brand-crimson/10 dark:bg-red-500/15 flex items-center justify-center font-black text-[9px] text-brand-crimson dark:text-red-400 border border-brand-crimson/15">
              {article.authorAvatar ? (
                <img src={article.authorAvatar} alt={article.author} className="w-full h-full object-cover rounded-full" />
              ) : (
                article.author.slice(0,2).toUpperCase()
              )}
            </div>
            <span>By {article.author}</span>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <Clock size={12} className="text-zinc-405" />
              <span>{dynamicReadTime} MIN READ</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye size={12} className="text-zinc-405" />
              <span>{article.views || 0} read hits</span>
            </div>
          </div>
        </div>

        {/* Narrative HTML layout */}
        <div className="font-serif text-base text-zinc-805 dark:text-zinc-200 leading-relaxed max-w-none break-words">
          {article.body ? (
            <div 
              className="prose dark:prose-invert max-w-none text-zinc-805 dark:text-zinc-200 leading-relaxed font-serif space-y-5"
              dangerouslySetInnerHTML={{ __html: formatArticleBody(article.body) }}
            />
          ) : (
            <div className="space-y-5">
              <p>
                In a rapidly developing turn of events, this major announcement signals significant paradigm shifts inside the domain of {article.category.toLowerCase()}. Policy makers and senior industry experts have expressed immediate feedback regarding the strategic options and challenges ahead.
              </p>
              <p>
                Initial response logs from multiple public forums indicate high support, alongside minor concerns detailing systemic deployment, economic impacts, and integration margins. Key executives noted that the upcoming structural reforms are designed carefully to safeguard public security, bolster market resiliencies, and ensure baseline compliance on all levels.
              </p>
              {article.quote && (
                <blockquote className="my-6 bg-zinc-50 dark:bg-zinc-950/60 p-5 rounded-2xl border-l-4 border-l-brand-crimson dark:border-l-red-500 italic text-zinc-900 dark:text-zinc-100 font-bold shadow-sm">
                  "{article.quote}"
                </blockquote>
              )}
              <p>
                As active monitoring processes continue over the details of this story, subsequent guidelines and administrative notes are expected to release shortly. Stay tuned as we deploy field reporters to gather primary insights firsthand.
              </p>
            </div>
          )}
        </div>

        {/* Video Player Segment if loaded in details */}
        {article.videoUrl && (
          <div className="border-t border-zinc-150 dark:border-zinc-800 pt-7">
            <h4 className="font-serif text-base font-black text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
              <Video className="text-brand-crimson dark:text-red-500 shrink-0" size={18} />
              <span>Broadcast Reporting Coverage</span>
            </h4>
            {renderEmbeddedPlayer(article.videoUrl)}
          </div>
        )}

        {/* Staff Author bio cards */}
        <div className="bg-zinc-50 dark:bg-zinc-950/40 rounded-2xl p-5 flex flex-col sm:flex-row gap-4 items-center border border-zinc-200/40 dark:border-zinc-800/80">
          <div className="w-12 h-12 rounded-full bg-brand-crimson/10 dark:bg-red-500/10 flex items-center justify-center font-black text-xs text-brand-crimson dark:text-red-400 shrink-0 border border-brand-crimson/15">
            {article.authorAvatar ? (
              <img src={article.authorAvatar} alt={article.author} className="w-full h-full object-cover rounded-full" />
            ) : (
              article.author.slice(0, 2).toUpperCase()
            )}
          </div>
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-1.5 justify-center sm:justify-start">
              <span className="text-xs font-black text-zinc-900 dark:text-zinc-100">{article.author}</span>
              <span className="bg-brand-crimson/10 text-brand-crimson dark:bg-red-500/10 dark:text-red-400 text-[8px] font-black uppercase px-2 py-0.5 rounded-full select-none">Staff Reporter</span>
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-[11px] font-medium leading-relaxed mt-1">
              Senior Correspondent at {article.category} Bureau. Award-winning journalist covering global policy, regulatory updates, and field intelligence reports.
            </p>
          </div>
        </div>

        {/* Social Share grid */}
        <div className="border-t border-zinc-150 dark:border-zinc-800 pt-7">
          <h4 className="font-sans text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-1.5 select-none">
            <Share2 size={12} className="text-brand-crimson dark:text-red-500 animate-pulse" />
            <span>Share news analysis</span>
          </h4>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5">
            <a
              href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-bold rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer flex-1 sm:flex-none"
              title="Share on WhatsApp"
            >
              <MessageCircle size={14} />
              <span>WhatsApp</span>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-sans text-xs font-bold rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer flex-1 sm:flex-none"
              title="Share on Facebook"
            >
              <Facebook size={14} />
              <span>Facebook</span>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-black text-white font-sans text-xs font-bold rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer flex-1 sm:flex-none"
              title="Share on Twitter"
            >
              <Twitter size={14} />
              <span>Twitter</span>
            </a>
            <button
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-zinc-800 dark:text-zinc-100 font-sans text-xs font-bold rounded-xl shadow-xs transition-colors active:scale-95 cursor-pointer flex-1 sm:flex-none"
              title="Copy Article Link"
            >
              {copied ? <Check size={14} className="text-emerald-550 dark:text-emerald-450" /> : <Link2 size={14} />}
              <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        {/* Related Category Stories ("Related Articles" component list) */}
        <div className="border-t border-zinc-150 dark:border-zinc-800 pt-7">
          <h3 className="font-serif text-base font-black text-zinc-950 dark:text-white mb-5 select-none uppercase tracking-wide border-l-3 border-brand-crimson dark:border-l-red-500 pl-2">
            Related Category Coverage
          </h3>
          {relatedArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => {
                    if (onArticleClick) onArticleClick(art);
                  }}
                  className="flex sm:flex-col gap-3.5 sm:gap-2 bg-zinc-50 dark:bg-zinc-950/40 hover:bg-zinc-100/70 dark:hover:bg-zinc-850 p-3 rounded-2xl border border-zinc-200/40 dark:border-zinc-800/60 cursor-pointer group transition-all duration-300 transform-gpu hover:-translate-y-0.5"
                >
                  <div className="w-20 sm:w-full h-16 sm:h-28 rounded-xl bg-zinc-100 dark:bg-zinc-800 overflow-hidden shrink-0 relative border border-zinc-200/10">
                    <img
                      src={art.image}
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col justify-between py-0.5 flex-grow sm:mt-1 overflow-hidden">
                    <h4 className="font-serif text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-brand-crimson dark:group-hover:text-red-400 line-clamp-2 leading-snug transition-colors">
                      {art.title}
                    </h4>
                    <span className="text-[8px] text-zinc-400 dark:text-zinc-500 font-extrabold uppercase mt-2 self-start font-mono">
                      {art.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-zinc-450 italic">No related category publications exist.</p>
          )}
        </div>

      </div>
    </div>
  );
}
