import { useState } from 'react';
import { Article } from '../types';
import { Play, Eye, X, Maximize, Volume2, Globe, Clock } from 'lucide-react';

interface VideoSectionProps {
  articles: Article[];
}

export default function VideoSection({ articles }: VideoSectionProps) {
  // Filter video category articles
  const videoArticles = articles.filter(item => item.category === 'Video');
  
  // Player Modal state
  const [activeVideo, setActiveVideo] = useState<Article | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(80);

  const openVideo = (video: Article) => {
    setActiveVideo(video);
    setIsPlaying(true);
  };

  const closeVideo = () => {
    setActiveVideo(null);
  };

  return (
    <section className="my-16 select-none bg-zinc-900 text-white p-6 sm:p-8 rounded-2xl relative overflow-hidden border border-zinc-950 shadow-xl">
      {/* Dynamic background lighting elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between border-b border-zinc-805 pb-3 mb-8 relative z-10">
        <h2 className="text-xl sm:text-2xl font-serif font-black tracking-tight text-white flex items-center gap-2">
          <span className="text-red-500 animate-pulse">●</span> Video News Reports
        </h2>
        <span className="text-[10px] tracking-widest font-extrabold uppercase bg-red-600 border border-red-800 text-white px-3 py-1 rounded">
          Hot Clips
        </span>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {videoArticles.map((item) => (
          <div
            key={item.id}
            onClick={() => openVideo(item)}
            className="group cursor-pointer bg-zinc-950 border border-zinc-850 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            id={`video-card-${item.id}`}
          >
            {/* Aspect box */}
            <div className="relative aspect-[16/10] overflow-hidden bg-zinc-800">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              />

              {/* Black overlay vignette gradient */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

              {/* Floating play button center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-red-600 group-hover:bg-red-550 flex items-center justify-center shadow-lg transform group-hover:scale-115 transition-all duration-300 relative">
                  <span className="absolute inset-0 rounded-full bg-red-500 opacity-0 group-hover:opacity-30 group-hover:animate-ping pointer-events-none" />
                  <Play size={16} className="fill-white text-white ml-0.5" />
                </div>
              </div>

              {/* Duration badge overlay bottom-right */}
              {item.duration && (
                <span className="absolute bottom-3 right-3 bg-zinc-950/90 text-white text-[9px] font-black px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                  <Clock size={10} />
                  {item.duration}
                </span>
              )}

              {/* Views count badge overlay bottom-left */}
              {item.views && (
                <span className="absolute bottom-3 left-3 bg-black/60 text-zinc-300 text-[9px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                  <Eye size={10} />
                  {item.views} Views
                </span>
              )}
            </div>

            {/* Headline and authors */}
            <div className="p-4 bg-zinc-950 flex flex-col justify-between h-28">
              <h3 className="font-serif text-xs sm:text-sm font-extrabold text-zinc-100 leading-snug line-clamp-2 group-hover:text-red-400 transition-colors">
                {item.title}
              </h3>
              <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-black flex justify-between items-center border-t border-zinc-900 pt-2">
                <span>Reporter Desk</span>
                <span>{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Theater Mock Player Modal overlays */}
      {activeVideo && (
        <div
          className="fixed inset-0 bg-black/95 z-[99] backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={closeVideo}
        >
          <div
            className="w-full max-w-4xl bg-zinc-950 border border-zinc-850 rounded-2xl overflow-hidden shadow-2xl flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header toolbar */}
            <div className="bg-zinc-900 border-b border-zinc-805 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-red-500 animate-spin-slow" />
                <span className="text-[10px] tracking-widest font-black uppercase text-zinc-400">Theater broadcast system</span>
              </div>
              <button
                onClick={closeVideo}
                className="p-1 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
                aria-label="Exit theater"
              >
                <X size={20} />
              </button>
            </div>

            {/* Screen player panel */}
            <div className="relative aspect-[16/9] bg-zinc-90 w-full flex items-center justify-center group/screen">
              <img
                src={activeVideo.image}
                alt={activeVideo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-90 brightness-[0.7]"
              />

              {/* Big state overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                {!isPlaying ? (
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="w-16 h-16 rounded-full bg-red-600/95 hover:bg-red-550 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer"
                    aria-label="Play video"
                  >
                    <Play size={24} className="fill-white text-white ml-1" />
                  </button>
                ) : (
                  <div className="absolute inset-0 bg-transparent flex items-center justify-center pointer-events-none">
                    <span className="bg-black/60 font-black tracking-wider text-xs px-4 py-2 rounded-full border border-zinc-800 text-white opacity-0 group-hover/screen:opacity-100 transition-opacity">
                      Streaming Active
                    </span>
                  </div>
                )}
              </div>

              {/* Audio controller tray */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/40 to-transparent p-4 flex flex-col gap-2">
                {/* Simulated playback bar */}
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden cursor-pointer relative group/bar">
                  <div className="h-full bg-red-600 w-1/3 group-hover/bar:bg-red-500" />
                </div>

                <div className="flex justify-between items-center text-xs text-zinc-200">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="font-bold cursor-pointer hover:text-red-400"
                    >
                      {isPlaying ? 'PAUSE' : 'PLAY'}
                    </button>

                    <div className="flex items-center gap-2">
                      <Volume2 size={14} className="text-zinc-400" />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="w-16 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                        aria-label="Adjust volume"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-405">
                    <span>02:40 / {activeVideo.duration || '10:00'}</span>
                    <Maximize size={13} className="cursor-pointer hover:text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Description card details */}
            <div className="p-6 bg-zinc-950 text-zinc-300">
              <span className="bg-red-950/60 text-red-400 border border-red-900 text-[8px] tracking-widest px-2.5 py-0.5 rounded font-bold uppercase select-none inline-block mb-2">
                HD Report
              </span>
              <h1 className="font-serif text-base sm:text-xl font-black text-white leading-snug">
                {activeVideo.title}
              </h1>
              <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans pb-3">
                {activeVideo.excerpt}
              </p>
              <div className="border-t border-zinc-900 pt-4 flex justify-between text-[10px] text-zinc-500 uppercase tracking-widest font-black">
                <span>View count: {activeVideo.views}</span>
                <span>Reporter: {activeVideo.author}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
