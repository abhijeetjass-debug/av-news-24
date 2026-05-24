import { useState, useEffect, FormEvent } from 'react';
import { 
  Mail, ArrowUp, Send, Smartphone, Facebook, Twitter, Instagram, 
  Youtube, Award, Phone, ShieldCheck, Info, MapPin, X, BookOpen 
} from 'lucide-react';
import { SiteSettings } from '../types';

interface FooterProps {
  onNavClick: (filter: string) => void;
  siteSettings: SiteSettings;
  onNavigate: (view: string) => void;
}

export default function Footer({ onNavClick, siteSettings, onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  // Modal display state for legal links
  const [modalType, setModalType] = useState<'about' | 'contact' | 'privacy' | 'disclaimer' | null>(null);

  // Monitor scroll height to show/hide Scroll-To-Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollBtn(true);
      } else {
        setShowScrollBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Perform simple validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full select-none bg-brand-navy dark:bg-zinc-950 text-white mt-16 font-sans relative">
      
      {/* Newsletter subscription banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-gradient-to-br from-red-750 to-brand-crimson dark:from-red-900 dark:to-brand-crimson/90 rounded-2xl p-6 sm:p-10 shadow-xl border border-red-800 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Decorative icons */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-zinc-950/20 rounded-full pointer-events-none" />

          {/* Texts */}
          <div className="md:w-1/2 relative z-10 text-center md:text-left">
            <h3 className="text-lg sm:text-2xl font-serif font-black tracking-tight text-white">
              Stay ahead of the flash. Subscribe.
            </h3>
            <p className="mt-2 text-xs text-red-100 leading-relaxed font-semibold max-w-sm">
              Deliver daily, high-integrity news summaries directly from {siteSettings.siteName} reporters to your mail tray.
            </p>
          </div>

          {/* Form Actions */}
          <div className="w-full md:w-1/2 relative z-10 max-w-md">
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-red-300" size={16} />
                  <input
                    type="email"
                    required
                    placeholder="Enter your security email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/10 hover:bg-white/15 focus:bg-white text-zinc-900 dark:text-zinc-50 placeholder-red-200 outline-none text-xs rounded-lg py-3 pl-10 pr-4 border border-white/20 focus:border-white transition-all ml-0"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-zinc-950 hover:bg-zinc-90 w-28 sm:w-32 flex items-center justify-center gap-1.5 font-bold text-xs rounded-lg uppercase cursor-pointer text-white shadow-md active:scale-95 transition-transform"
                >
                  <Send size={12} />
                  <span>Subscribe</span>
                </button>
              </form>
            ) : (
              <div className="p-4 bg-zinc-950/80 border border-emerald-500 rounded-lg text-emerald-400 text-center text-xs font-bold animate-fade-in flex items-center justify-center gap-2">
                <Award size={14} className="animate-bounce" />
                <span>Subscription successful! Thank you form joining us.</span>
              </div>
            )}
            
            <p className="text-[10px] text-red-200 mt-2 text-center md:text-left select-none">
              &copy; High integrity newsletter system. Unsubscribe with single-clicks anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Red accent ribbon strip wrapper */}
      <div className="h-1 bg-brand-crimson hover:bg-red-500 transition-colors mt-12" />

      {/* High-Fidelity 4 Column structured Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Block 1: Brand Info */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              {siteSettings.logoUrl ? (
                <img src={siteSettings.logoUrl} alt={siteSettings.siteName} className="h-8 max-w-[150px] object-contain" />
              ) : (
                <div className="flex items-center gap-1.5 font-serif text-2xl font-black tracking-tighter">
                  <span className="text-white uppercase">{siteSettings.siteName.split(' ')[0] || 'AV'}</span>
                  {siteSettings.siteName.split(' ').slice(1).join(' ') && (
                    <span className="bg-brand-crimson text-white px-1.5 py-0.5 rounded text-xs font-sans font-extrabold pb-1 shadow-sm uppercase">
                      {siteSettings.siteName.split(' ').slice(1).join(' ')}
                    </span>
                  )}
                </div>
              )}
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-semibold">
              {siteSettings.tagline || 'Premium high-integrity digital news publication. We deliver real-time news with strict layout transparency and verification algorithms.'}
            </p>
            
            {/* Socials */}
            <div className="flex items-center gap-3.5 mt-2 text-zinc-400">
              {siteSettings.socialFacebook && (
                <a href={siteSettings.socialFacebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Facebook">
                  <Facebook size={16} />
                </a>
              )}
              {siteSettings.socialTwitter && (
                <a href={siteSettings.socialTwitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Twitter">
                  <Twitter size={16} />
                </a>
              )}
              {siteSettings.socialInstagram && (
                <a href={siteSettings.socialInstagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Instagram">
                  <Instagram size={16} />
                </a>
              )}
              {siteSettings.socialYoutube && (
                <a href={siteSettings.socialYoutube} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="YouTube">
                  <Youtube size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Block 2: Category directories */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-sm font-black uppercase tracking-wider text-white border-b border-zinc-800 pb-2">
              Sections
            </h4>
            <div className="grid grid-cols-1 gap-2.5 text-xs text-zinc-400 font-bold text-left">
              <button onClick={() => onNavClick('home')} className="text-left hover:text-white transition-colors cursor-pointer">Main Home Hub</button>
              <button onClick={() => onNavClick('latest')} className="text-left hover:text-white transition-colors cursor-pointer">Latest Broadcaster</button>
              <button onClick={() => onNavClick('sports')} className="text-left hover:text-white transition-colors cursor-pointer">Live Sports Box</button>
              <button onClick={() => onNavClick('technology')} className="text-left hover:text-white transition-colors cursor-pointer">Tech Center</button>
              <button onClick={() => onNavClick('business')} className="text-left hover:text-white transition-colors cursor-pointer">Business Index</button>
            </div>
          </div>

          {/* Block 3: Support resources */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-sm font-black uppercase tracking-wider text-white border-b border-zinc-800 pb-2">
              Legal Desk
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-zinc-400 font-bold">
              <button onClick={() => setModalType('about')} className="text-left hover:text-white transition-colors cursor-pointer">About Us</button>
              <button onClick={() => setModalType('contact')} className="text-left hover:text-white transition-colors cursor-pointer">Contact Us</button>
              <button onClick={() => setModalType('privacy')} className="text-left hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
              <button onClick={() => setModalType('disclaimer')} className="text-left hover:text-white transition-colors cursor-pointer">Disclaimer</button>
            </div>
          </div>

          {/* Block 4: App Download references */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-sm font-black uppercase tracking-wider text-white border-b border-zinc-800 pb-2">
              Corporate Contacts
            </h4>
            <div className="flex flex-col gap-2 text-xs text-zinc-400 font-semibold leading-relaxed">
              <div className="flex items-center gap-1.5">
                <Mail size={13} className="text-zinc-550" />
                <span className="hover:text-white transition-colors">{siteSettings.contactEmail || 'contact@avnews24.com'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone size={13} className="text-zinc-550" />
                <span className="hover:text-white transition-colors">{siteSettings.contactPhone || '+91 11-2301-2000'}</span>
              </div>
              <div className="flex items-start gap-1.5">
                <MapPin size={13} className="text-zinc-550 mt-0.5" />
                <span>Executive Office, Connaught Place, New Delhi, India</span>
              </div>
            </div>
          </div>

        </div>

        {/* Brand Copyright footer */}
        <div className="border-t border-zinc-800/80 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500 select-none">
          <div className="font-bold">
            &copy; 2026 {siteSettings.siteName} Premium Media Inc. All rights reserved.
          </div>
          <div className="flex gap-4 font-bold text-zinc-450">
            <button onClick={() => onNavigate('admin')} className="text-zinc-500 hover:text-brand-crimson cursor-pointer flex items-center gap-1 relative pl-2 border-l border-zinc-700">
              <ShieldCheck size={12} />
              <span>Publisher Desk (admin)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top button */}
      {showScrollBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-brand-crimson hover:bg-zinc-900 dark:bg-red-650 dark:hover:bg-zinc-100 dark:hover:text-zinc-950 text-white rounded-full cursor-pointer shadow-lg active:scale-95 z-50 transition-all duration-300 transform animate-[bounceIn_0.3s_ease]"
          title="Scroll up"
          aria-label="Back to Top"
          id="backToTopBtn"
        >
          <ArrowUp size={18} />
        </button>
      )}

      {/* Interactive Beautiful Modal overlay for legal pages */}
      {modalType && (
        <div className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-4 backdrop-blur-xs animate-fade-in" onClick={() => setModalType(null)}>
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded-2xl shadow-2xl p-6 relative overflow-hidden flex flex-col max-h-[85vh] animate-[slideUp_0.3s_ease-out-back]" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal header */}
            <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-3 mb-4 shrink-0 select-none">
              <div className="flex items-center gap-2 text-brand-crimson dark:text-red-500 font-serif font-extrabold text-base">
                {modalType === 'about' && <Info size={18} />}
                {modalType === 'contact' && <Phone size={18} />}
                {modalType === 'privacy' && <ShieldCheck size={18} />}
                {modalType === 'disclaimer' && <BookOpen size={18} />}
                <span className="capitalize">{modalType} {modalType === 'about' ? 'Us' : 'Notice'}</span>
              </div>
              <button onClick={() => setModalType(null)} className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer">
                <X size={18} />
              </button>
            </div>

            {/* Modal scrollable text box */}
            <div className="overflow-y-auto text-xs sm:text-sm text-zinc-650 dark:text-zinc-305 leading-relaxed space-y-3.5 pr-2">
              {modalType === 'about' && (
                <>
                  <p className="font-serif text-sm font-black text-zinc-900 dark:text-white leading-tight">About {siteSettings.siteName} publication:</p>
                  <p>
                    Launched in India with a clear mission to support strict factual reporting, <strong>{siteSettings.siteName}</strong> stands as a premier beacon of progressive news and multimedia journalism. We carry a stellar reputation for delivering verified 24/7 breaking events across National, International, Technology, Sports, Business, Automotive, and Entertainment sectors.
                  </p>
                  <p>
                    With deep coverage and strict news validation checkpoints, our editorial desks are comprised of independent specialists committed to objective analyses.
                  </p>
                </>
              )}

              {modalType === 'contact' && (
                <>
                  <p className="font-serif text-sm font-black text-zinc-900 dark:text-white leading-tight">Connect with our news Desks:</p>
                  <p>Have an exclusive scoop, general editorial comment, or partnership proposal? Get in touch with our team instantly!</p>
                  
                  <div className="bg-zinc-50 dark:bg-zinc-950 rounded-xl p-3.5 space-y-2 border border-zinc-150 mt-2 font-mono text-xs text-zinc-700 dark:text-zinc-300">
                    <div>📧 Email: {siteSettings.contactEmail || 'contact@avnews24.com'}</div>
                    <div>📞 Hotline: {siteSettings.contactPhone || '+91 11-2301-2000'}</div>
                    <div>📍 Address: CP, New Delhi, India</div>
                  </div>
                  <p className="text-[10px] text-zinc-400 italic">Letters are answered within standard 24-48 administrative hours.</p>
                </>
              )}

              {modalType === 'privacy' && (
                <>
                  <p className="font-serif text-sm font-black text-zinc-900 dark:text-white leading-tight">Terms of user privacy protection:</p>
                  <p>
                    At {siteSettings.siteName}, user trust forms our strategic cornerstone. This guidelines page details our methodologies regarding local storage caching, cookies tracking, and administrative contact forms.
                  </p>
                  <p>
                    No analytical data blocks are ever distributed or traded with external marketing hubs. We leverage native encryption parameters designed to safeguard reader browsing preferences on all devices.
                  </p>
                </>
              )}

              {modalType === 'disclaimer' && (
                <>
                  <p className="font-serif text-sm font-black text-zinc-900 dark:text-white leading-tight">General editorial disclaimer:</p>
                  <p>
                    All reports and summaries published of active events are curated carefully and reviewed under tight standards. However, informational items should not serve as substituted formal commercial, financial, or legal consultations.
                  </p>
                  <p>
                    Quotes, user comments, or guest op-eds are views strictly belonging to independent authors and do not represent the administrative stances of {siteSettings.siteName} Media Inc.
                  </p>
                </>
              )}
            </div>

            <button onClick={() => setModalType(null)} className="mt-5 w-full bg-brand-crimson dark:bg-red-650 hover:bg-zinc-900 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white shadow-md cursor-pointer select-none">
              Acknowledge details
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </footer>
  );
}
