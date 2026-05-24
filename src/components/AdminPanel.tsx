import React, { useState, useRef, useEffect, DragEvent } from 'react';
import { 
  FileText, Plus, Edit2, Trash2, Settings, List, Image, Bell, 
  LogOut, Save, Search, Filter, Hash, Sparkles, Link as LinkIcon, 
  Bold, Italic, Underline, List as ListIcon, Globe, AlertTriangle, 
  CheckCircle, Play, Eye, RotateCcw, ArrowLeft, Upload, Copy, Check, Users, X
} from 'lucide-react';
import { Article, SiteSettings } from '../types';
import { formatArticleBody } from '../utils';

interface AdminPanelProps {
  articles: Article[];
  setArticles: (articles: Article[]) => void;
  categories: string[];
  setCategories: (categories: string[]) => void;
  siteSettings: SiteSettings;
  setSiteSettings: (settings: SiteSettings) => void;
  tickerText: string;
  setTickerText: (text: string) => void;
  useCustomTicker: boolean;
  setUseCustomTicker: (use: boolean) => void;
  onBackToPortal: () => void;
  addToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export default function AdminPanel({
  articles,
  setArticles,
  categories,
  setCategories,
  siteSettings,
  setSiteSettings,
  tickerText,
  setTickerText,
  useCustomTicker,
  setUseCustomTicker,
  onBackToPortal,
  addToast
}: AdminPanelProps) {
  // Live Metrics Helpers (Issue 6)
  const getWordCount = (htmlStr: string) => {
    if (!htmlStr) return 0;
    // Strip HTML elements safely
    const cleanText = htmlStr.replace(/<\/?[^>]+(>|$)/g, "");
    const words = cleanText.trim().split(/\s+/).filter(w => w.length > 0);
    return words.length;
  };
  
  const estimatedReadTime = () => {
    const totalWords = getWordCount(formTitle) + getWordCount(formExcerpt) + getWordCount(formBody);
    return Math.max(1, Math.ceil(totalWords / 200));
  };

  // Core Users Database & Session Administration (Issue 12)
  const [users, setUsers] = useState<any[]>(() => {
    const saved = localStorage.getItem('av_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback below
      }
    }
    const defaultList = [
      {
        id: 'super-admin',
        name: 'Abhijeet Jass',
        email: 'abhijeet.jass@gmail.com',
        role: 'Admin',
        password: 'admin123'
      },
      {
        id: 'jane-editor',
        name: 'Jane Doe',
        email: 'editor@avnews24.com',
        role: 'Editor',
        password: 'editor123'
      },
      {
        id: 'john-reporter',
        name: 'John Smith',
        email: 'reporter@avnews24.com',
        role: 'Reporter',
        password: 'reporter123'
      }
    ];
    localStorage.setItem('av_users', JSON.stringify(defaultList));
    return defaultList;
  });

  const [currentUser, setCurrentUser] = useState<any>(() => {
    const email = sessionStorage.getItem('av_admin_current_user_email') || 'abhijeet.jass@gmail.com';
    const usersList = JSON.parse(localStorage.getItem('av_users') || '[]');
    const matched = usersList.find((u: any) => u.email === email);
    if (matched) return matched;
    return {
      id: 'super-admin',
      name: 'Abhijeet Jass',
      email: 'abhijeet.jass@gmail.com',
      role: 'Admin',
      password: 'admin123'
    };
  });

  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('av_admin_logged_in') === 'true';
  });
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'articles' | 'edit-article' | 'categories' | 'media' | 'settings' | 'users'>(() => {
    const email = sessionStorage.getItem('av_admin_current_user_email');
    if (email) {
      const savedUsers = JSON.parse(localStorage.getItem('av_users') || '[]');
      const matched = savedUsers.find((u: any) => u.email === email);
      if (matched?.role === 'Reporter') return 'edit-article';
    }
    return 'articles';
  });

  // Change Password States
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profileCurrentPassword, setProfileCurrentPassword] = useState('');
  const [profileNewPassword, setProfileNewPassword] = useState('');
  const [profileConfirmPassword, setProfileConfirmPassword] = useState('');
  const [profilePassError, setProfilePassError] = useState('');

  // User Management Admin Form States
  const [userFormEmail, setUserFormEmail] = useState('');
  const [userFormName, setUserFormName] = useState('');
  const [userFormPassword, setUserFormPassword] = useState('');
  const [userFormRole, setUserFormRole] = useState<'Admin' | 'Editor' | 'Reporter'>('Reporter');
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  // Article Management States
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingArticleId, setEditingArticleId] = useState<number | null>(null);

  // Article Form Fields
  const [formStep, setFormStep] = useState<'content' | 'seo' | 'publish'>('content');
  const [isMetaTitleCustomized, setIsMetaTitleCustomized] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formAuthorAvatar, setFormAuthorAvatar] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formSubcategory, setFormSubcategory] = useState('');
  const [formAuthor, setFormAuthor] = useState('');
  const [formSchDate, setFormSchDate] = useState('');
  const [formSchTime, setFormSchTime] = useState('');
  const [formBody, setFormBody] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formTags, setFormTags] = useState('');
  const [formMetaTitle, setFormMetaTitle] = useState('');
  const [formMetaDesc, setFormMetaDesc] = useState('');
  const [formFocusKeyword, setFormFocusKeyword] = useState('');
  const [formStatus, setFormStatus] = useState<'draft' | 'published' | 'scheduled'>('published');
  const [formIsBreaking, setFormIsBreaking] = useState(false);
  const [formIsTrending, setFormIsTrending] = useState(false);
  const [formVideoUrl, setFormVideoUrl] = useState('');
  const [formSource, setFormSource] = useState('');
  const [formSourceName, setFormSourceName] = useState('');
  const [formSourceUrl, setFormSourceUrl] = useState('');

  // URL Import Modal State
  const [showUrlImportModal, setShowUrlImportModal] = useState(false);
  const [importUrl, setImportUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState('');


  // Category State
  const [newCatName, setNewCatName] = useState('');
  const [editingCatIndex, setEditingCatIndex] = useState<number | null>(null);
  const [editCatName, setEditCatName] = useState('');

  // Media Management State
  const [mediaList, setMediaList] = useState<string[]>(() => {
    const saved = localStorage.getItem('av_media_manager');
    if (saved) return JSON.parse(saved);
    return [
      'https://picsum.photos/seed/world1/800/450',
      'https://picsum.photos/seed/world2/600/400',
      'https://picsum.photos/seed/tech1/600/400',
      'https://picsum.photos/seed/tech2/600/400',
      'https://picsum.photos/seed/sport1/800/450',
      'https://picsum.photos/seed/sport2/600/400',
      'https://picsum.photos/seed/ent1/600/400',
      'https://picsum.photos/seed/biz1/600/400'
    ];
  });
  const [dragActive, setDragActive] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize Site Settings Inputs
  const [settingsName, setSettingsName] = useState(siteSettings.siteName);
  const [settingsTagline, setSettingsTagline] = useState(siteSettings.tagline);
  const [settingsLogo, setSettingsLogo] = useState(siteSettings.logoUrl);
  const [settingsFB, setSettingsFB] = useState(siteSettings.socialFacebook);
  const [settingsTW, setSettingsTW] = useState(siteSettings.socialTwitter);
  const [settingsIG, setSettingsIG] = useState(siteSettings.socialInstagram);
  const [settingsYT, setSettingsYT] = useState(siteSettings.socialYoutube);
  const [settingsEmail, setSettingsEmail] = useState(siteSettings.contactEmail);
  const [settingsPhone, setSettingsPhone] = useState(siteSettings.contactPhone);

  // Ensure settings inputs load correctly
  useEffect(() => {
    setSettingsName(siteSettings.siteName);
    setSettingsTagline(siteSettings.tagline);
    setSettingsLogo(siteSettings.logoUrl);
    setSettingsFB(siteSettings.socialFacebook);
    setSettingsTW(siteSettings.socialTwitter);
    setSettingsIG(siteSettings.socialInstagram);
    setSettingsYT(siteSettings.socialYoutube);
    setSettingsEmail(siteSettings.contactEmail);
    setSettingsPhone(siteSettings.contactPhone);
  }, [siteSettings]);

  // Handle auto slug creation from title and dynamic SEO Meta Title pre-fill
  useEffect(() => {
    if (editingArticleId === null && formTitle) {
      const slug = formTitle
        .toLowerCase()
        .replace(/[^a-z0-0\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      setFormSlug(slug);
    }

    if (!isMetaTitleCustomized) {
      setFormMetaTitle(formTitle);
    }
  }, [formTitle, editingArticleId, isMetaTitleCustomized]);

  // Enforce Default category value
  useEffect(() => {
    if (categories.length > 0 && !formCategory) {
      setFormCategory(categories[0]);
    }
  }, [categories, formCategory]);

  // Admin Handle Login Action
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = loginEmail.trim().toLowerCase();
    const cleanPassword = loginPassword.trim();

    const matchedUser = users.find(u => u.email.toLowerCase() === cleanEmail && u.password === cleanPassword);

    if (matchedUser) {
      setIsLoggedIn(true);
      sessionStorage.setItem('av_admin_logged_in', 'true');
      sessionStorage.setItem('av_admin_current_user_email', matchedUser.email);
      setCurrentUser(matchedUser);
      setLoginError('');
      
      // If reporter logs in, auto switch to edit-article view (Write Article)
      if (matchedUser.role === 'Reporter') {
        setActiveTab('edit-article');
        setEditingArticleId(null);
        setFormTitle('');
        setFormSlug('');
        setFormExcerpt('');
        setFormBody('');
        setFormCategory(categories[0] || 'National');
        setFormAuthor(matchedUser.name); // Automatically set reporter's name as author
        setFormAuthorAvatar('');
      } else {
        setActiveTab('articles');
      }

      addToast(`Welcome back, ${matchedUser.name}!`, 'success');
    } else {
      setLoginError('Invalid email or password. Super admin default is abhijeet.jass@gmail.com / admin123');
      addToast('Authentication failed', 'error');
    }
  };

  // Enforce Logout Action
  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('av_admin_logged_in');
    sessionStorage.removeItem('av_admin_current_user_email');
    setCurrentUser(null);
    setLoginEmail('');
    setLoginPassword('');
    setIsProfileOpen(false);
    addToast('Logged out securely', 'info');
  };

  // Rich text simulated toolbar formatter helper
  const insertFormatting = (tagStart: string, tagEnd: string) => {
    const el = document.getElementById('article-body-textarea') as HTMLTextAreaElement;
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;
    const text = el.value;
    const selected = text.substring(start, end);
    const replacement = tagStart + (selected || '') + tagEnd;

    setFormBody(text.substring(0, start) + replacement + text.substring(end));
    
    // Focus back on text area and reset formatting cursor index
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + tagStart.length, start + tagStart.length + (selected ? selected.length : 0));
    }, 50);
  };

  // Drag and drop event handlers
  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageNativeUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageNativeUpload(e.target.files[0]);
    }
  };

  const handleImageNativeUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Url = reader.result as string;
      const updatedMedia = [base64Url, ...mediaList];
      setMediaList(updatedMedia);
      localStorage.setItem('av_media_manager', JSON.stringify(updatedMedia));
      addToast('Image uploaded to media assets!', 'success');

      // If adding article, set current main featured image
      if (activeTab === 'edit-article') {
        setFormImage(base64Url);
      }
    };
    reader.readAsDataURL(file);
  };

  // Copy media links
  const copyToClipboard = (url: string, index: number) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedIndex(index);
      addToast('Image URL copied to clipboard!', 'info');
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  // Add / Create or Save Category Action
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = newCatName.trim();
    if (!cleanName) return;

    if (categories.some(cat => cat.toLowerCase() === cleanName.toLowerCase())) {
      addToast('Category already exists', 'error');
      return;
    }

    const updated = [...categories, cleanName];
    setCategories(updated);
    localStorage.setItem('av_categories', JSON.stringify(updated));
    setNewCatName('');
    addToast(`Category "${cleanName}" added successfully`, 'success');
  };

  const startEditCategory = (index: number) => {
    setEditingCatIndex(index);
    setEditCatName(categories[index]);
  };

  const saveEditCategory = (index: number) => {
    const cleanName = editCatName.trim();
    if (!cleanName) return;

    if (categories.some((cat, idx) => cat.toLowerCase() === cleanName.toLowerCase() && idx !== index)) {
      addToast('Category name already in use', 'error');
      return;
    }

    const previousName = categories[index];
    const updated = [...categories];
    updated[index] = cleanName;
    setCategories(updated);
    localStorage.setItem('av_categories', JSON.stringify(updated));

    // Rename categories inside existing articles as well to prevent orphan links
    const updatedArticles = articles.map(art => {
      if (art.category === previousName) {
        return { ...art, category: cleanName };
      }
      return art;
    });
    setArticles(updatedArticles);
    localStorage.setItem('av_articles', JSON.stringify(updatedArticles));

    setEditingCatIndex(null);
    addToast('Category renamed and articles migrated!', 'success');
  };

  const handleDeleteCategory = (catName: string) => {
    const affectedArticles = articles.filter(art => art.category === catName);
    if (affectedArticles.length > 0) {
      if (!window.confirm(`Warning: There are ${affectedArticles.length} articles matching this category. Deleting it will re-categorize them to "Uncategorized". Continue?`)) {
        return;
      }

      // Re-categorize affected articles
      const updatedArticles = articles.map(art => {
        if (art.category === catName) {
          return { ...art, category: 'National' }; // Default fallback
        }
        return art;
      });
      setArticles(updatedArticles);
      localStorage.setItem('av_articles', JSON.stringify(updatedArticles));
    }

    const updated = categories.filter(cat => cat !== catName);
    setCategories(updated);
    localStorage.setItem('av_categories', JSON.stringify(updated));
    addToast(`Category "${catName}" deleted`, 'info');
  };

  // Save Site settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSettings: SiteSettings = {
      siteName: settingsName.trim() || 'AV News24',
      tagline: settingsTagline.trim(),
      logoUrl: settingsLogo.trim(),
      socialFacebook: settingsFB.trim(),
      socialTwitter: settingsTW.trim(),
      socialInstagram: settingsIG.trim(),
      socialYoutube: settingsYT.trim(),
      contactEmail: settingsEmail.trim(),
      contactPhone: settingsPhone.trim()
    };
    setSiteSettings(updatedSettings);
    localStorage.setItem('av_settings', JSON.stringify(updatedSettings));
    addToast('Site configuration updated successfully!', 'success');
  };

  // Handle Edit Article trigger
  const triggerEditArticle = (article: Article) => {
    setFormStep('content');
    setIsMetaTitleCustomized(true);
    setImageError(false);
    setEditingArticleId(article.id);
    setFormTitle(article.title);
    setFormSlug(article.slug || '');
    setFormExcerpt(article.excerpt || '');
    setFormAuthorAvatar(article.authorAvatar || '');
    setFormCategory(article.category);
    setFormSubcategory(article.subcategory || '');
    setFormAuthor(article.author);
    
    // Parse scheduled dates or assign default empty
    setFormSchDate(new Date(article.timestamp).toISOString().split('T')[0]);
    const d = new Date(article.timestamp);
    const hrs = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    setFormSchTime(`${hrs}:${mins}`);

    setFormBody(article.body || article.excerpt);
    setFormImage(article.image);
    setFormTags((article.tags || []).join(', '));
    setFormMetaTitle(article.metaTitle || '');
    setFormMetaDesc(article.metaDescription || '');
    setFormFocusKeyword(article.focusKeyword || '');
    setFormStatus(article.status || 'published');
    setFormIsBreaking(article.isBreaking || false);
    setFormIsTrending(article.isTrending || false);
    setFormVideoUrl(article.videoUrl || '');
    setFormSource(article.source || '');
    setFormSourceName(article.sourceName || '');
    setFormSourceUrl(article.sourceUrl || '');
    
    setActiveTab('edit-article');
  };

  // Article creation / save actions
  const triggerNewArticle = () => {
    setFormStep('content');
    setIsMetaTitleCustomized(false);
    setImageError(false);
    setEditingArticleId(null);
    setFormTitle('');
    setFormSlug('');
    setFormExcerpt('');
    setFormAuthorAvatar('');
    setFormCategory(categories[0] || 'National');
    setFormSubcategory('');
    setFormAuthor('Admin Editor');
    
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    setFormSchDate(today);
    setFormSchTime(`${hrs}:${mins}`);

    setFormBody('');
    setFormImage('https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=600&auto=format&fit=crop'); // premium default thumbnail placeholder
    setFormTags('');
    setFormMetaTitle('');
    setFormMetaDesc('');
    setFormFocusKeyword('');
    setFormStatus('published');
    setFormIsBreaking(false);
    setFormIsTrending(false);
    setFormVideoUrl('');
    setFormSource('');
    setFormSourceName('');
    setFormSourceUrl('');

    setActiveTab('edit-article');
  };

  const handleUrlImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!importUrl.trim()) {
      setImportError('Please enter a valid URL.');
      return;
    }

    setIsImporting(true);
    setImportError('');

    try {
      const url = importUrl.trim();
      const corsUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      const res = await fetch(corsUrl);
      if (!res.ok) throw new Error('CORS proxy reported connection failure. Make sure URL is correct.');
      
      const data = await res.json();
      const html = data.contents;
      if (!html) throw new Error('Target website did not return any HTML body. Unable to scrape.');

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const getMeta = (property: string) => {
        const meta = doc.querySelector(`meta[property="${property}"]`) || 
                     doc.querySelector(`meta[name="${property}"]`);
        return meta ? meta.getAttribute('content') : '';
      };

      const parsedTitle = getMeta('og:title') || doc.querySelector('title')?.textContent || '';
      const parsedExcerpt = getMeta('og:description') || getMeta('description') || '';
      let parsedImage = getMeta('og:image') || '';

      let parsedVideoUrl = '';
      let parsedSourceName = '';
      let parsedSourceUrl = '';

      try {
        const urlObj = new URL(url);
        parsedSourceName = urlObj.hostname.replace('www.', '');
        parsedSourceUrl = urlObj.origin;

        // Auto-detect YouTube embeds
        if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
          parsedVideoUrl = url;
          let vId = '';
          if (urlObj.hostname.includes('youtube.com')) {
            vId = urlObj.searchParams.get('v') || '';
          } else {
            vId = urlObj.pathname.split('/')[1] || '';
          }
          if (vId && !parsedImage) {
            parsedImage = `https://img.youtube.com/vi/${vId}/hqdefault.jpg`;
          }
        } else if (urlObj.hostname.includes('twitter.com') || urlObj.hostname.includes('x.com')) {
          parsedVideoUrl = url;
        } else if (urlObj.pathname.toLowerCase().endsWith('.mp4')) {
          parsedVideoUrl = url;
        }
      } catch (err) {
        console.warn('URL parsing fallback:', err);
      }

      const finalTitle = parsedTitle.trim() || 'Imported Link Coverage';
      const finalExcerpt = parsedExcerpt.trim() || 'Review this live imported news reference report.';
      const finalImage = parsedImage.trim() || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=600&auto=format&fit=crop';

      // Load form fields
      setFormTitle(finalTitle);
      setFormSlug(finalTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
      setFormExcerpt(finalExcerpt);
      setFormBody(finalExcerpt);
      setFormImage(finalImage);
      setFormSourceName(parsedSourceName);
      setFormSourceUrl(parsedSourceUrl);
      setFormVideoUrl(parsedVideoUrl);

      setFormStep('content');
      setIsMetaTitleCustomized(true);
      setEditingArticleId(null);
      setFormStatus('published');

      addToast('Open Graph Metadata successfully pulled and pre-filled!', 'success');
      setShowUrlImportModal(false);
      setActiveTab('edit-article');
    } catch (err: any) {
      console.error(err);
      setImportError(err.message || 'Error occurred while resolving the URL details.');
    } finally {
      setIsImporting(false);
    }
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      addToast('Article title is required', 'error');
      return;
    }

    // Capture scheduled timestamps
    let finalTimestamp = Date.now();
    if (formSchDate) {
      const timeStr = formSchTime || '00:00';
      finalTimestamp = new Date(`${formSchDate}T${timeStr}`).getTime();
    }

    const cleanedTags = formTags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');

    if (editingArticleId !== null) {
      // Edit mode
      const updatedArticles = articles.map(art => {
        if (art.id === editingArticleId) {
          return {
            ...art,
            title: formTitle.trim(),
            slug: formSlug.trim(),
            category: formCategory,
            subcategory: formSubcategory.trim(),
            author: formAuthor.trim(),
            authorAvatar: formAuthorAvatar.trim() || undefined,
            timestamp: finalTimestamp,
            time: 'Edited minutes ago',
            excerpt: formExcerpt.trim() || (formBody.substring(0, 150).replace(/<[^>]*>/g, '') + '...'),
            body: formBody,
            image: formImage || 'https://picsum.photos/seed/placeholder/600/400',
            tags: cleanedTags,
            metaTitle: formMetaTitle.trim(),
            metaDescription: formMetaDesc.trim(),
            focusKeyword: formFocusKeyword.trim(),
            status: formStatus,
            isBreaking: formIsBreaking,
            isTrending: formIsTrending,
            videoUrl: formVideoUrl.trim(),
            source: formSource.trim(),
            sourceName: formSourceName.trim(),
            sourceUrl: formSourceUrl.trim(),
            lastUpdated: Date.now()
          };
        }
        return art;
      });

      setArticles(updatedArticles);
      localStorage.setItem('av_articles', JSON.stringify(updatedArticles));
      addToast('Article successfully edited and updated!', 'success');
    } else {
      // Create mode
      const newArticle: Article = {
        id: Math.max(0, ...articles.map(a => a.id)) + 1,
        title: formTitle.trim(),
        slug: formSlug.trim(),
        category: formCategory,
        subcategory: formSubcategory.trim(),
        author: formAuthor.trim(),
        authorAvatar: formAuthorAvatar.trim() || undefined,
        timestamp: finalTimestamp,
        time: 'Just now',
        views: '0',
        excerpt: formExcerpt.trim() || (formBody.substring(0, 150).replace(/<[^>]*>/g, '') + '...'),
        body: formBody,
        image: formImage || 'https://picsum.photos/seed/placeholder/600/400',
        tags: cleanedTags,
        metaTitle: formMetaTitle.trim(),
        metaDescription: formMetaDesc.trim(),
        focusKeyword: formFocusKeyword.trim(),
        status: formStatus,
        isBreaking: formIsBreaking,
        isTrending: formIsTrending,
        videoUrl: formVideoUrl.trim(),
        source: formSource.trim(),
        sourceName: formSourceName.trim(),
        sourceUrl: formSourceUrl.trim(),
        lastUpdated: Date.now()
      };

      const updatedArticles = [newArticle, ...articles];
      setArticles(updatedArticles);
      localStorage.setItem('av_articles', JSON.stringify(updatedArticles));
      addToast('News article successfully published to portal!', 'success');
    }

    setActiveTab('articles');
  };

  const handleDeleteArticle = (id: number) => {
    if (currentUser?.role === 'Reporter') {
      addToast('Error: Reporters are not permitted to delete articles.', 'error');
      return;
    }
    if (window.confirm('Are you absolutely sure you want to delete this article? This is permanent.')) {
      const updated = articles.filter(art => art.id !== id);
      setArticles(updated);
      localStorage.setItem('av_articles', JSON.stringify(updated));
      addToast('Article permanently deleted', 'info');
    }
  };

  // Filters application
  const filteredArticles = articles.filter(art => {
    const matchesSearch = searchQuery.trim() === '' || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      art.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || art.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || (art.status || 'published') === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Login View
  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200/50 dark:border-zinc-800 p-8">
          <div className="flex flex-col items-center mb-6">
            <span className="p-3 bg-red-100 dark:bg-red-950/50 text-brand-crimson dark:text-red-500 rounded-full mb-3">
              <Settings size={28} className="animate-[spin_4s_linear_infinite]" />
            </span>
            <h2 className="text-2xl font-serif font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight text-center">
              AV News24 Executive Desk
            </h2>
            <p className="text-xs text-zinc-450 dark:text-zinc-400 mt-1">Please authenticate to gain workspace publishing tokens</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest mb-1.5 select-none" style={{ textAlign: "left" }}>Email Address</label>
              <input 
                type="email" 
                required
                placeholder="abhijeet.jass@gmail.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950/60 rounded-xl px-4 py-3 text-xs border border-zinc-200 dark:border-zinc-805 outline-none focus:border-brand-crimson dark:focus:border-red-500 transition-colors text-zinc-900 dark:text-white"
                id="login-email-input"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest mb-1.5 select-none" style={{ textAlign: "left" }}>Password</label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950/60 rounded-xl px-4 py-3 text-xs border border-zinc-200 dark:border-zinc-805 outline-none focus:border-brand-crimson dark:focus:border-red-500 transition-colors text-zinc-900 dark:text-white"
                id="login-password-input"
              />
            </div>

            {loginError && (
              <p className="text-xs text-brand-crimson dark:text-red-400 font-bold bg-red-50 dark:bg-red-955/25 p-2.5 rounded-lg border border-red-200 dark:border-red-900 flex items-center gap-2 text-left">
                <AlertTriangle size={14} className="shrink-0" />
                <span>{loginError}</span>
              </p>
            )}

            <button 
              type="submit"
              className="w-full bg-brand-crimson dark:bg-red-650 hover:opacity-90 py-3 text-white text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer shadow-md select-none active:scale-[0.98] transition-all"
              id="login-submit-button"
            >
              Sign In to Workbench
            </button>
          </form>

          <button 
            onClick={onBackToPortal}
            className="w-full mt-4 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-950 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer flex items-center justify-center gap-2 transition-all"
          >
            <ArrowLeft size={14} />
            <span>Return to Live Portal</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 select-none animate-[fadeIn_0.3s_ease-out]">
      
      {/* Admin Sidebar Navigation Panel */}
      <div className="lg:col-span-3 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-850 rounded-2xl p-5 flex flex-col justify-between shadow-sm h-fit">
        <div>
          <div className="flex items-center gap-3 pb-5 mb-5 border-b border-zinc-100 dark:border-zinc-800">
            <span className="w-10 h-10 bg-brand-crimson dark:bg-red-650 text-white flex items-center justify-center font-bold text-sm font-sans rounded-xl shadow-md uppercase select-none">
              AV
            </span>
            <div>
              <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold block leading-none select-none">Control Panel</span>
              <span className="text-sm font-black font-serif text-zinc-900 dark:text-zinc-50 leading-tight">WordPress Pro Desk</span>
            </div>
          </div>

          <div className="space-y-1">
            {currentUser?.role !== 'Reporter' ? (
              <>
                <button 
                  onClick={() => setActiveTab('articles')}
                  className={`w-full text-left font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center gap-3 cursor-pointer transition-colors ${
                    activeTab === 'articles' || activeTab === 'edit-article'
                      ? 'bg-brand-crimson dark:bg-red-650 text-white shadow-xs' 
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-950 hover:text-zinc-900'
                  }`}
                >
                  <FileText size={16} />
                  <span>Articles Manager</span>
                </button>

                <button 
                  onClick={() => setActiveTab('categories')}
                  className={`w-full text-left font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center gap-3 cursor-pointer transition-colors ${
                    activeTab === 'categories'
                      ? 'bg-brand-crimson dark:bg-red-650 text-white shadow-xs' 
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-950 hover:text-zinc-900'
                  }`}
                >
                  <List size={16} />
                  <span>Category Manager</span>
                </button>

                <button 
                  onClick={() => setActiveTab('media')}
                  className={`w-full text-left font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center gap-3 cursor-pointer transition-colors ${
                    activeTab === 'media'
                      ? 'bg-brand-crimson dark:bg-red-650 text-white shadow-xs' 
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-950 hover:text-zinc-900'
                  }`}
                >
                  <Image size={16} />
                  <span>Media Drive</span>
                </button>

                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`w-full text-left font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center gap-3 cursor-pointer transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-brand-crimson dark:bg-red-650 text-white shadow-xs' 
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-955 hover:text-zinc-909'
                  }`}
                >
                  <Settings size={16} />
                  <span>Settings desk</span>
                </button>

                {currentUser?.role === 'Admin' && (
                  <button 
                    onClick={() => setActiveTab('users')}
                    className={`w-full text-left font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center gap-3 cursor-pointer transition-colors ${
                      activeTab === 'users'
                        ? 'bg-brand-crimson dark:bg-red-650 text-white shadow-xs' 
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-950 hover:text-zinc-900'
                    }`}
                  >
                    <Users size={16} />
                    <span>User Management</span>
                  </button>
                )}
              </>
            ) : (
              <button 
                onClick={() => setActiveTab('edit-article')}
                className={`w-full text-left font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center gap-3 cursor-pointer transition-colors ${
                  activeTab === 'edit-article'
                    ? 'bg-brand-crimson dark:bg-red-650 text-white shadow-xs' 
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-950 hover:text-zinc-900'
                }`}
              >
                <Plus size={16} />
                <span>Write Article</span>
              </button>
            )}
          </div>
        </div>

        <div className="border-t border-zinc-100 dark:border-zinc-800/80 pt-5 mt-6 space-y-3">
          <button 
            onClick={onBackToPortal}
            className="w-full text-left font-bold text-xs uppercase tracking-wider py-2.5 px-4 text-zinc-600 dark:text-zinc-400 hover:text-brand-crimson hover:bg-zinc-100 dark:hover:bg-zinc-950 rounded-xl flex items-center gap-3 transition-colors duration-200 cursor-pointer"
          >
            <Globe size={16} />
            <span>Live site preview</span>
          </button>

          <button 
            onClick={handleLogout}
            className="w-full text-left font-bold text-xs uppercase tracking-wider py-2.5 px-4 text-brand-crimson dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-955/20 rounded-xl flex items-center gap-3 transition-colors duration-205 cursor-pointer"
          >
            <LogOut size={16} />
            <span>Secure Log out</span>
          </button>
        </div>
      </div>

      {/* Main Admin Workspace Container */}
      <div className="lg:col-span-9 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-850 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm min-h-[70vh]">
        
        {/* Workspace status bar supporting active profile & Change Password block */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 mb-6 border-b border-zinc-150 dark:border-zinc-850/80">
          <div className="flex items-center gap-2 select-none">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 font-sans">
              {activeTab === 'articles' && 'Articles Database'}
              {activeTab === 'edit-article' && 'Publication Editor / Wizard'}
              {activeTab === 'categories' && 'Global Sections Layout'}
              {activeTab === 'media' && 'Static Assets Storage'}
              {activeTab === 'settings' && 'Site Parameter Settings'}
              {activeTab === 'users' && 'Staff & Team Directory'}
            </span>
          </div>

          {/* User Profile Container (Top Right Corner) */}
          <div className="relative self-end sm:self-auto" id="userProfileWidget">
            <button 
              type="button"
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setProfileCurrentPassword('');
                setProfileNewPassword('');
                setProfileConfirmPassword('');
                setProfilePassError('');
              }}
              className="flex items-center gap-2.5 px-3.5 py-2 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-950/60 dark:hover:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-805 rounded-xl cursor-pointer transition-all active:scale-[0.98] select-none shadow-xs"
            >
              <div className="w-6.5 h-6.5 bg-brand-crimson dark:bg-red-650 text-white rounded-full flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
              </div>
              <div className="text-left">
                <div className="text-xs font-extrabold text-zinc-850 dark:text-zinc-200 leading-tight">
                  {currentUser?.name}
                </div>
                <div className="text-[8px] uppercase tracking-widest text-zinc-455 font-black block leading-none select-none mt-0.5">
                  Role: <span className="text-brand-crimson dark:text-red-400">{currentUser?.role}</span>
                </div>
              </div>
            </button>

            {/* Profile Dropdown card */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2.5 w-76 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-5 z-50 animate-[fadeIn_0.15s_ease-out_both]" id="userChangePasswordDropdown">
                <div className="flex items-center gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-805/70 select-none">
                  <div className="w-10 h-10 bg-brand-crimson dark:bg-red-650/85 text-white rounded-xl flex items-center justify-center font-bold text-sm uppercase">
                    {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-zinc-50 leading-tight" style={{ textAlign: "left" }}>{currentUser?.name}</h4>
                    <span className="text-[10px] text-zinc-450 dark:text-zinc-400 break-all block" style={{ textAlign: "left" }}>{currentUser?.email}</span>
                  </div>
                </div>

                <div className="pt-4 text-left">
                  <h5 className="text-[10px] uppercase font-black tracking-widest text-zinc-455 dark:text-zinc-400 mb-3 select-none">
                    🔑 Change Password Desk
                  </h5>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      setProfilePassError('');

                      if (!profileCurrentPassword) {
                        setProfilePassError('Current password is required.');
                        return;
                      }

                      if (profileCurrentPassword !== currentUser.password) {
                        setProfilePassError('The current password entered is incorrect.');
                        return;
                      }

                      if (profileNewPassword.length < 6) {
                        setProfilePassError('New password must be at least 6 characters.');
                        return;
                      }

                      if (profileNewPassword !== profileConfirmPassword) {
                        setProfilePassError('Passwords do not match.');
                        return;
                      }

                      // Apply update
                      const updatedUsers = users.map(u => {
                        if (u.id === currentUser.id) {
                          return { ...u, password: profileNewPassword };
                        }
                        return u;
                      });
                      
                      setUsers(updatedUsers);
                      localStorage.setItem('av_users', JSON.stringify(updatedUsers));
                      
                      const updatedSelf = { ...currentUser, password: profileNewPassword };
                      setCurrentUser(updatedSelf);

                      setProfileCurrentPassword('');
                      setProfileNewPassword('');
                      setProfileConfirmPassword('');
                      setIsProfileOpen(false);

                      addToast('Password updated securely!', 'success');
                    }}
                    className="space-y-3"
                  >
                    <div>
                      <label className="block text-[9px] font-bold text-zinc-455 dark:text-zinc-400 uppercase tracking-widest mb-1 select-none text-left">Current Password</label>
                      <input 
                        type="password" 
                        required
                        placeholder="••••••••"
                        value={profileCurrentPassword}
                        onChange={(e) => setProfileCurrentPassword(e.target.value)}
                        className="w-full bg-zinc-50 dark:bg-zinc-950 font-sans p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs outline-none focus:border-brand-crimson dark:focus:border-red-500 text-zinc-950 dark:text-white"
                        id="profile-current-pass"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-zinc-455 dark:text-zinc-400 uppercase tracking-widest mb-1 select-none text-left">New Password</label>
                      <input 
                        type="password" 
                        required
                        placeholder="••••••••"
                        value={profileNewPassword}
                        onChange={(e) => setProfileNewPassword(e.target.value)}
                        className="w-full bg-zinc-50 dark:bg-zinc-950 font-sans p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs outline-none focus:border-brand-crimson dark:focus:border-red-505 text-zinc-950 dark:text-white"
                        id="profile-new-pass"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-zinc-455 dark:text-zinc-400 uppercase tracking-widest mb-1 select-none font-sans text-left">Confirm Password</label>
                      <input 
                        type="password" 
                        required
                        placeholder="••••••••"
                        value={profileConfirmPassword}
                        onChange={(e) => setProfileConfirmPassword(e.target.value)}
                        className="w-full bg-zinc-50 dark:bg-zinc-950 font-sans p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs outline-none focus:border-brand-crimson dark:focus:border-red-505 text-zinc-950 dark:text-white"
                        id="profile-confirm-pass"
                      />
                    </div>

                    {profilePassError && (
                      <p className="text-[9px] text-brand-crimson dark:text-red-400 font-extrabold bg-red-50 dark:bg-red-955/25 p-2 rounded border border-red-100 dark:border-red-900 leading-tight">
                        {profilePassError}
                      </p>
                    )}

                    <button 
                      type="submit"
                      className="w-full bg-brand-crimson dark:bg-red-650 hover:bg-zinc-950 dark:hover:bg-white dark:hover:text-black text-white text-[10px] font-bold uppercase tracking-wider py-2 rounded-lg cursor-pointer transform active:scale-95 transition-all shadow-xs select-none"
                    >
                      Update Password
                    </button>
                    
                    <button 
                      type="button"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full border border-zinc-250 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-950 text-[9px] font-bold uppercase py-1.5 rounded-lg cursor-pointer transition-colors"
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tab CONTENT: Manage Articles List */}
        {activeTab === 'articles' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-5">
              <div>
                <h3 className="text-xl font-serif font-black text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                  <FileText className="text-brand-crimson dark:text-red-500" />
                  <span>Articles Repository</span>
                </h3>
                <p className="text-xs text-zinc-400 font-semibold leading-normal mt-0.5">Edit, draft, schedule, and curate standard publications</p>
              </div>

              <div className="flex flex-wrap gap-2 md:gap-3">
                <button 
                  onClick={() => {
                    setImportUrl('');
                    setImportError('');
                    setShowUrlImportModal(true);
                  }}
                  className="bg-neutral-100 hover:bg-neutral-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-xl cursor-pointer flex items-center gap-2 border border-zinc-200/60 dark:border-zinc-700 transition-all font-sans"
                >
                  <LinkIcon size={14} className="text-zinc-500 dark:text-zinc-400" />
                  <span>Import from URL</span>
                </button>

                <button 
                  onClick={triggerNewArticle}
                  className="bg-brand-crimson dark:bg-red-650 hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-zinc-950 font-bold text-xs text-white uppercase tracking-wider px-5 py-3 rounded-xl cursor-pointer flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <Plus size={16} />
                  <span>Add New Story</span>
                </button>
              </div>
            </div>

            {/* Live Filter block */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-zinc-50 dark:bg-zinc-950/40 p-3.5 rounded-xl border border-zinc-200/40 dark:border-zinc-805/40 text-xs">
              <div className="relative sm:col-span-6 flex items-center">
                <Search size={14} className="absolute left-3.5 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="Query article headlines or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 pl-10 pr-4 py-2 rounded-lg outline-none focus:border-brand-crimson dark:focus:border-red-500 text-xs"
                />
              </div>

              <div className="sm:col-span-3 flex items-center relative">
                <span className="absolute left-3.5 text-[9px] uppercase font-black text-zinc-400 tracking-wider">Group</span>
                <select 
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 pl-14 pr-4 py-2 rounded-lg outline-none cursor-pointer text-xs"
                >
                  <option value="all">All Sections</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-3 flex items-center relative">
                <span className="absolute left-3.5 text-[9px] uppercase font-black text-zinc-400 tracking-wider">State</span>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 pl-14 pr-4 py-2 rounded-lg outline-none cursor-pointer text-xs"
                >
                  <option value="all">All States</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
            </div>

             {/* Articles Catalog workspace listing (Issue 10 Touch Dual Responsive Layout) */}
             {filteredArticles.length === 0 ? (
               <div className="text-center py-16 text-zinc-400 bg-white dark:bg-zinc-950/10 border border-zinc-200 dark:border-zinc-850 rounded-2xl select-none">
                 <FileText size={40} className="mx-auto text-zinc-300 dark:text-zinc-750 mb-3 animate-[pulse_3s_infinite]" />
                 <h4 className="font-bold text-zinc-700 dark:text-zinc-300">No matching articles located</h4>
                 <p className="text-xs mt-1">Clear filters or append some fresh publications above!</p>
               </div>
             ) : (
               <>
                 {/* Desktop View Table */}
                 <div className="hidden md:block overflow-x-auto border border-zinc-200/70 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-950/15">
                   <table className="w-full border-collapse text-left text-xs text-zinc-500 dark:text-zinc-400">
                     <thead className="bg-zinc-50 dark:bg-zinc-950/60 text-[9px] uppercase font-black tracking-widest text-zinc-450 dark:text-zinc-400 border-b border-zinc-155 dark:border-zinc-800">
                       <tr>
                         <th className="py-4 px-4 w-12">Cover</th>
                         <th className="py-4 px-4">Headline / Details</th>
                         <th className="py-4 px-4">Section</th>
                         <th className="py-4 px-4">Publish Date</th>
                         <th className="py-4 px-4 w-24">Indicators</th>
                         <th className="py-4 px-4 w-44 text-right">Actions</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/75 leading-normal">
                       {filteredArticles.map((art) => (
                         <tr key={art.id} className="hover:bg-zinc-50/55 dark:hover:bg-zinc-950/10 transition-colors">
                           <td className="py-4 px-4">
                             <div className="w-12 h-8 rounded bg-zinc-150 overflow-hidden relative shadow-inner border border-zinc-100/50 dark:border-zinc-800">
                               <img src={art.image} alt={art.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                             </div>
                           </td>
                           <td className="py-4 px-4 max-w-sm">
                             <div className="font-serif font-black text-zinc-900 dark:text-zinc-100 line-clamp-1 hover:text-brand-crimson cursor-pointer text-xs" onClick={() => triggerEditArticle(art)}>
                               {art.title}
                             </div>
                             <div className="text-[10px] text-zinc-400 mt-1">By <span className="font-bold text-zinc-500 dark:text-zinc-300">{art.author}</span> {art.subcategory && `• Subcat: ${art.subcategory}`}</div>
                           </td>
                           <td className="py-4 px-4">
                             <span className="text-[9px] uppercase font-black bg-zinc-100 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-250 px-2 py-0.5 rounded">
                               {art.category}
                             </span>
                           </td>
                           <td className="py-4 px-4 text-[10px] font-mono text-zinc-400">
                             {new Date(art.timestamp).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                           </td>
                           <td className="py-4 px-4">
                             <div className="flex flex-col gap-1 select-none items-start">
                               <span className={`text-[8px] uppercase font-black text-center px-1.5 py-0.5 rounded leading-none border tracking-wider ${
                                 (art.status || 'published') === 'published' 
                                   ? 'bg-emerald-500/5 text-emerald-600 border-emerald-550/15 dark:bg-emerald-950/30 dark:text-emerald-450' 
                                   : (art.status || 'published') === 'scheduled'
                                   ? 'bg-amber-500/5 text-amber-605 border-amber-550/15 dark:bg-amber-955/30 dark:text-amber-450'
                                   : 'bg-zinc-100 text-zinc-500 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400'
                               }`}>
                                 {art.status || 'published'}
                               </span>
                               <div className="flex gap-1">
                                 {art.isBreaking && <span className="bg-red-650 text-white font-extrabold text-[7px] px-1 py-0.2 rounded shadow-xs animate-pulse" title="Breaking">B</span>}
                                 {art.isTrending && <span className="bg-amber-500 text-white font-extrabold text-[7px] px-1 py-0.2 rounded shadow-xs" title="Trending">T</span>}
                                </div>
                             </div>
                           </td>
                           <td className="py-4 px-4 text-right">
                             <div className="flex items-center justify-end gap-2 select-none">
                               <button 
                                 type="button"
                                 onClick={() => triggerEditArticle(art)}
                                 className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-955/20 dark:hover:bg-blue-955/60 dark:text-blue-400 font-bold uppercase text-[9px] rounded-lg transition-all cursor-pointer border border-blue-200/10 shadow-xs"
                                 title="Edit Article"
                               >
                                 <Edit2 size={10} />
                                 <span>Edit</span>
                               </button>
                               <button 
                                 type="button"
                                 onClick={() => handleDeleteArticle(art.id)}
                                 className="flex items-center gap-1 px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-brand-crimson dark:bg-red-955/20 dark:hover:bg-red-955/40 dark:text-red-400 font-bold uppercase text-[9px] rounded-lg transition-all cursor-pointer border border-red-200/10 shadow-xs"
                                 title="Delete Article"
                               >
                                 <Trash2 size={10} />
                                 <span>Delete</span>
                               </button>
                             </div>
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>

                 {/* Mobile View Card Lists (Optimized, Highly Touch-Accessible layout) */}
                 <div className="block md:hidden space-y-4">
                   {filteredArticles.map((art) => (
                     <div 
                       key={`mob-art-block-${art.id}`}
                       className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex flex-col gap-4 shadow-sm"
                     >
                       <div className="flex gap-3">
                         <div className="w-16 h-12 rounded-lg overflow-hidden bg-zinc-150 shrink-0 border border-zinc-100 dark:border-zinc-800">
                           <img src={art.image} alt={art.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                         </div>
                         <div className="flex-1">
                           <div 
                             onClick={() => triggerEditArticle(art)}
                             className="font-serif font-black text-sm text-zinc-950 dark:text-zinc-50 line-clamp-2 leading-snug hover:text-brand-crimson cursor-pointer"
                           >
                             {art.title}
                           </div>
                           <span className="text-[8px] tracking-wider uppercase font-extrabold text-brand-crimson bg-red-500/10 px-2.5 py-0.5 rounded inline-block mt-1.5">
                             {art.category}
                           </span>
                         </div>
                       </div>

                       <div className="flex justify-between items-center text-[10px] text-zinc-400 font-mono select-none pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
                         <div className="flex flex-col gap-0.5">
                           <span>By {art.author}</span>
                           <span>{new Date(art.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                         </div>
                         <div className="flex items-center gap-1.5">
                           <span className={`text-[8px] uppercase font-black px-1.5 py-0.5 rounded tracking-wider border leading-none ${
                             (art.status || 'published') === 'published' 
                               ? 'bg-emerald-500/5 text-emerald-600 border-emerald-550/15 dark:bg-emerald-950/30' 
                               : (art.status || 'published') === 'scheduled'
                               ? 'bg-amber-500/5 text-amber-600 border-amber-550/15 dark:bg-amber-955/30'
                               : 'bg-zinc-100 text-zinc-500 border-zinc-250 dark:bg-zinc-800'
                           }`}>
                             {art.status || 'published'}
                           </span>
                         </div>
                       </div>

                       <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 select-none">
                         <button 
                           type="button"
                           onClick={() => triggerEditArticle(art)}
                           className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-955/20 dark:hover:bg-blue-955/60 dark:text-blue-400 font-bold uppercase text-[10px] rounded-xl transition-all cursor-pointer border border-blue-200/10 shadow-xs flex-1"
                         >
                           <Edit2 size={11} />
                           <span>Edit story</span>
                         </button>
                         <button 
                           type="button"
                           onClick={() => handleDeleteArticle(art.id)}
                           className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-red-50 hover:bg-red-100 text-brand-crimson dark:bg-red-955/20 dark:hover:bg-red-955/40 dark:text-red-400 font-bold uppercase text-[10px] rounded-xl transition-all cursor-pointer border border-red-200/10 shadow-xs flex-1"
                         >
                           <Trash2 size={11} />
                           <span>Delete</span>
                         </button>
                       </div>
                     </div>
                   ))}
                 </div>
               </>
             )}
          </div>
        )}

        {/* Tab CONTENT: Add / Edit Article Form (Wizard Stepper Mode - Issue 4) */}
        {activeTab === 'edit-article' && (
          <form onSubmit={handleSaveArticle} className="space-y-6 animate-fade-in text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-150 dark:border-zinc-800 pb-5">
              <div>
                <h3 className="text-xl font-serif font-black text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                  <Sparkles className="text-brand-crimson dark:text-red-500 animate-pulse" />
                  <span>{editingArticleId !== null ? 'Modify Story' : 'Draft New Story'}</span>
                </h3>
                <p className="text-xs text-zinc-450 dark:text-zinc-400 mt-0.5">Author premium layouts, fine-tune indexing metadata, and publish instantly</p>
              </div>

              <div className="flex items-center gap-2 select-none self-end sm:self-auto">
                <button 
                  type="button"
                  onClick={() => setActiveTab('articles')}
                  className="px-4 py-2.5 border border-zinc-200 dark:border-zinc-805 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-955 font-bold uppercase rounded-lg cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-brand-crimson dark:bg-red-650 hover:opacity-95 font-bold text-white uppercase px-5 py-2.5 rounded-lg cursor-pointer flex items-center gap-1.5 shadow-md shadow-brand-crimson/10"
                >
                  <Save size={14} />
                  <span>Save Article</span>
                </button>
              </div>
            </div>

            {/* Stepper Tabs Bar Selector */}
            <div className="flex border border-zinc-200 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-950/20 rounded-2xl p-1 select-none">
              <button
                type="button"
                onClick={() => setFormStep('content')}
                className={`flex-1 py-3 text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  formStep === 'content'
                    ? 'bg-white dark:bg-zinc-805 text-brand-crimson dark:text-red-400 shadow-sm border border-zinc-200/50 dark:border-zinc-800/80'
                    : 'text-zinc-450 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-350'
                }`}
              >
                <FileText size={13} className={formStep === 'content' ? 'text-brand-crimson dark:text-red-400' : ''} />
                <span>1. Write Content</span>
              </button>
              <button
                type="button"
                onClick={() => setFormStep('seo')}
                className={`flex-1 py-3 text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  formStep === 'seo'
                    ? 'bg-white dark:bg-zinc-805 text-brand-crimson dark:text-red-400 shadow-sm border border-zinc-200/50 dark:border-zinc-800/80'
                    : 'text-zinc-450 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-355'
                }`}
              >
                <Globe size={13} className={formStep === 'seo' ? 'text-brand-crimson dark:text-red-400' : ''} />
                <span>2. Search Tags</span>
              </button>
              <button
                type="button"
                onClick={() => setFormStep('publish')}
                className={`flex-1 py-3 text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  formStep === 'publish'
                    ? 'bg-white dark:bg-zinc-805 text-brand-crimson dark:text-red-400 shadow-sm border border-zinc-200/50 dark:border-zinc-800/80'
                    : 'text-zinc-450 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-355'
                }`}
              >
                <Sparkles size={13} className={formStep === 'publish' ? 'text-brand-crimson dark:text-red-400' : ''} />
                <span>3. Audience & Media</span>
              </button>
            </div>

            {/* Dynamic metrics reading tag (Issue 6) */}
            <div className="flex flex-wrap items-center gap-2 pb-2 text-zinc-550 dark:text-zinc-400 font-mono text-[9px] font-bold select-none">
              <span>📊 DRAFT STATUS METRICS:</span>
              <span className="bg-zinc-100 dark:bg-zinc-900 px-2.5 py-0.5 rounded border border-zinc-200/40 dark:border-zinc-800/50 text-zinc-700 dark:text-zinc-300">
                Word Count: {getWordCount(formBody)} words
              </span>
              <span className="bg-zinc-100 dark:bg-zinc-900 px-2.5 py-0.5 rounded border border-zinc-200/40 dark:border-zinc-800/50 text-zinc-700 dark:text-zinc-305">
                Read Speed Estimate: {estimatedReadTime()} min read
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column wrapper depending on full-width tabs layout criteria */}
              <div className={`${formStep === 'publish' ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-4`}>
                
                {formStep === 'content' && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                  <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-350 uppercase tracking-widest mb-1 select-none">Article Title</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter an attention-grabbing headline..."
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-950/60 rounded-xl px-4 py-3 text-sm font-semibold border border-zinc-205 dark:border-zinc-805 outline-none focus:border-brand-crimson dark:focus:border-red-500 text-zinc-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest mb-1 select-none">Slug / URL</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. climate-summit-landmark-deal"
                      value={formSlug}
                      onChange={(e) => setFormSlug(e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-zinc-950/60 rounded-lg px-3 py-2 border border-zinc-200 dark:border-zinc-805 outline-none font-mono focus:border-brand-crimson dark:focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-655 dark:text-zinc-350 uppercase tracking-widest mb-1 select-none">News Source Credit (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Associated Press / Reuters"
                      value={formSource}
                      onChange={(e) => setFormSource(e.target.value)}
                      className="w-full bg-zinc-50 dark:bg-zinc-950/60 rounded-lg px-3 py-2 border border-zinc-200 dark:border-zinc-805 outline-none focus:border-brand-crimson dark:focus:border-red-500"
                    />
                  </div>
                </div>

                {/* Excerpt Form Field */}
                <div>
                  <label className="block text-xs font-bold text-zinc-655 dark:text-zinc-350 uppercase tracking-widest mb-1 select-none">Article Excerpt / Summary (Compelling Sub-Headline)</label>
                  <textarea 
                    rows={2} 
                    placeholder="Provide a 1-2 sentence compelling summary of the story for cards..."
                    value={formExcerpt}
                    onChange={(e) => setFormExcerpt(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-950/60 rounded-xl px-4 py-2 text-xs font-medium border border-zinc-205 dark:border-zinc-805 outline-none focus:border-brand-crimson dark:focus:border-red-500 text-zinc-900 dark:text-white"
                  />
                </div>

                {/* WYSIWYG Simulated Rich Text Editor */}
                <div>
                  <div className="flex items-center justify-between mb-1 select-none">
                    <label className="block text-xs font-bold text-zinc-655 dark:text-zinc-350 uppercase tracking-widest">Article Content Editor</label>
                    <span className="text-[10px] text-zinc-400 font-bold">Preview is compiled live below</span>
                  </div>

                  <div className="border border-zinc-200 dark:border-zinc-805 rounded-xl overflow-hidden shadow-xs">
                    {/* Formatting utilities toolbar */}
                    <div className="bg-zinc-50 dark:bg-zinc-950/90 border-b border-zinc-100 dark:border-zinc-805 px-3 py-2 flex items-center gap-1 overflow-x-auto select-none">
                      <button 
                        type="button"
                        onClick={() => insertFormatting('<b>', '</b>')}
                        className="p-1 px-2.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-black cursor-pointer"
                        title="Bold text"
                      >
                        <Bold size={13} />
                      </button>
                      <button 
                        type="button"
                        onClick={() => insertFormatting('<i>', '</i>')}
                        className="p-1 px-2.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 italic cursor-pointer"
                        title="Italic text"
                      >
                        <Italic size={13} />
                      </button>
                      <button 
                        type="button"
                        onClick={() => insertFormatting('<u>', '</u>')}
                        className="p-1 px-2.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 underline cursor-pointer"
                        title="Underline text"
                      >
                        <Underline size={13} />
                      </button>
                      <button 
                        type="button"
                        onClick={() => insertFormatting('<ul>\n  <li>', '</li>\n</ul>')}
                        className="p-1 px-2.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer"
                        title="Unordered List"
                      >
                        <ListIcon size={13} />
                      </button>
                      <button 
                        type="button"
                        onClick={() => {
                          const url = prompt('Enter link URL (e.g. https://example.com):');
                          if (url) insertFormatting(`<a href="${url}" class="text-brand-crimson dark:text-red-400 underline font-semibold" target="_blank" rel="noopener noreferrer">`, '</a>');
                        }}
                        className="p-1 px-2.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer"
                        title="Embed Link"
                      >
                        <LinkIcon size={13} />
                      </button>
                      <button 
                        type="button"
                        onClick={() => {
                          const src = prompt('Enter image URL:');
                          if (src) insertFormatting(`<div class="my-4 aspect-[16/9] bg-zinc-105 rounded-xl overflow-hidden border border-zinc-200 max-w-lg mx-auto"><img src="${src}" class="w-full h-full object-cover" /></div>`, '');
                        }}
                        className="p-1 px-2.5 rounded hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 cursor-pointer"
                        title="Insert Image"
                      >
                        <Image size={13} />
                      </button>
                    </div>

                    <textarea 
                      id="article-body-textarea"
                      required
                      rows={12}
                      placeholder="Write your beautiful and engaging article copy here... Supports both regular text and custom HTML elements like lists, links, or visual separators."
                      value={formBody}
                      onChange={(e) => setFormBody(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-950/20 px-4 py-3 outline-none border-0 font-serif text-sm leading-relaxed text-zinc-850 dark:text-zinc-200"
                    />
                  </div>
                </div>

                {/* HTML Render Preview Box */}
                {formBody && (
                  <div className="border border-zinc-150 dark:border-zinc-800 rounded-xl p-4 bg-zinc-50/50 dark:bg-zinc-950/20 shadow-inner">
                    <span className="text-[10px] uppercase font-black text-zinc-400 tracking-wider block mb-2 select-none">HTML Live Output Preview</span>
                    <div 
                      className="font-serif text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-3 prose dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: formBody }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: SEO META FIELDS & SEARCH TAGS */}
            {formStep === 'seo' && (
              <div className="space-y-4 animate-fade-in bg-zinc-50/40 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-850 rounded-2xl p-5">
                <div className="flex items-center gap-2 border-b border-zinc-150 dark:border-zinc-805 pb-3 mb-2 select-none font-sans">
                  <Globe size={16} className="text-emerald-500 animate-[spin_8s_linear_infinite]" />
                  <h4 className="font-serif font-black text-sm text-zinc-900 dark:text-zinc-50">
                    Search Engine Optimization (SEO) & Metadata
                  </h4>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1 select-none">
                    <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-400 uppercase tracking-widest animate-pulse">SEO Meta Title</label>
                    <span className="text-[9px] text-zinc-450 dark:text-zinc-405 font-mono">
                      {isMetaTitleCustomized ? '⚠️ Custom override active' : '⚡ Syncing from article headline'}
                    </span>
                  </div>
                  <input 
                    type="text" 
                    placeholder={formTitle ? `Generated pre-fill: ${formTitle}` : 'Enter SEO custom indexing title node...'}
                    value={formMetaTitle}
                    onChange={(e) => {
                      setFormMetaTitle(e.target.value);
                      setIsMetaTitleCustomized(true);
                    }}
                    className="w-full bg-white dark:bg-zinc-900 rounded-lg px-3 py-2 border border-zinc-200 dark:border-zinc-800 outline-none focus:border-emerald-500 text-zinc-950 dark:text-white"
                  />
                  {isMetaTitleCustomized && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsMetaTitleCustomized(false);
                        setFormMetaTitle(formTitle);
                      }}
                      className="text-[9px] text-brand-crimson dark:text-red-400 hover:underline mt-1 font-bold font-mono inline-block cursor-pointer font-sans"
                    >
                      Reset and auto-track Article Headline &larr;
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-655 dark:text-zinc-350 uppercase tracking-widest mb-1 select-none">SEO Meta Description</label>
                  <textarea 
                    rows={3}
                    placeholder="Typically 150-160 characters summarizing the article to boost clicks on Google search engines..."
                    value={formMetaDesc}
                    onChange={(e) => setFormMetaDesc(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-900 rounded-lg px-3 py-2 border border-zinc-200 dark:border-zinc-800 outline-none focus:border-emerald-500 text-zinc-950 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest mb-1 select-none font-sans">Focus Keyword</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Chandrayaan-4 Mars"
                    value={formFocusKeyword}
                    onChange={(e) => setFormFocusKeyword(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-900 rounded-lg px-3 py-2 border border-zinc-200 dark:border-zinc-800 outline-none focus:border-emerald-505 text-zinc-950 dark:text-white font-sans text-xs"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: FEATURED MEDIA & LOCAL UPLOAD PREVIEWS (LEFT SIDE SPAN 7) */}
            {formStep === 'publish' && (
              <div className="bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/50 dark:border-zinc-850 rounded-2xl p-5 space-y-4 animate-fade-in">
                <h4 className="font-serif font-black text-sm text-zinc-900 dark:text-zinc-100 pb-2 border-b border-zinc-150 dark:border-zinc-800 select-none flex items-center gap-1.5">
                  <Image size={15} className="text-blue-500" />
                  <span>Featured Media Assets</span>
                </h4>

                <div>
                  <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest mb-1 font-sans">Featured image URL</label>
                  <input 
                    type="text" 
                    placeholder="Enter direct Unsplash link or absolute image URL..."
                    value={formImage}
                    onChange={(e) => {
                      setFormImage(e.target.value);
                      setImageError(false);
                    }}
                    className="w-full bg-white dark:bg-zinc-900 rounded-lg px-3 py-2 border border-zinc-200 dark:border-zinc-800 outline-none text-zinc-950 dark:text-white"
                  />
                </div>

                {/* Drag and Drop interactive visualizer box */}
                <div 
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer select-none transition-all ${
                    dragActive 
                      ? 'border-brand-crimson bg-red-50/50 dark:bg-red-955/10' 
                      : 'border-zinc-300 dark:border-zinc-800 hover:border-brand-crimson dark:hover:border-red-500'
                  }`}
                >
                  <Upload size={22} className="mx-auto text-zinc-400 mb-1 animate-[bounce_2s_infinite]" />
                  <span className="block font-bold text-[10px] text-zinc-600 dark:text-zinc-400 uppercase tracking-widest font-sans">Upload local graphic</span>
                  <span className="text-[9px] text-zinc-400 mt-0.5 block leading-tight">Drag and drop file or click to browse</span>
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden font-sans"
                  />
                </div>

                {/* Featured image real-time preview (Issue 2) */}
                {formImage && (
                  <div className="bg-zinc-100/50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200/50 dark:border-zinc-800 select-none">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] uppercase font-black text-zinc-450 dark:text-zinc-400 tracking-wider">🖼️ CARD IMAGE PREVIEW (REAL-TIME PREVIEW)</span>
                      <span className="text-[8px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 font-mono font-bold uppercase px-2 py-0.5 rounded font-sans">Active Preview</span>
                    </div>
                    
                    {!imageError ? (
                      <div className="rounded-xl overflow-hidden aspect-[16/9] bg-zinc-200 dark:bg-zinc-900 border border-zinc-205 dark:border-zinc-800 relative shadow-inner">
                        <img 
                          src={formImage} 
                          alt="Article Preview" 
                          className="w-full h-full object-cover" 
                          onError={() => setImageError(true)}
                          referrerPolicy="no-referrer"
                        />
                        <button 
                          type="button"
                          onClick={() => setFormImage('')}
                          className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-black text-white rounded-full transition-colors font-sans focus:outline-none"
                          title="Clear visual asset"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ) : (
                      <div className="rounded-xl aspect-[16/9] bg-red-650/[0.02] border border-dashed border-red-500/25 flex flex-col items-center justify-center p-4 text-center">
                        <AlertTriangle size={20} className="text-red-500/80 mb-1 animate-pulse" />
                        <span className="text-[10px] font-black uppercase text-red-500">Unresolved Image Destination</span>
                        <span className="text-[9px] text-zinc-400 mt-0.5 leading-tight font-semibold">Enter a valid online image link or upload a file. Real-time preview will auto-generate once resolved.</span>
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest mb-1 select-none font-sans">Video Embed URL (Optional)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. https://www.youtube.com/embed/..."
                    value={formVideoUrl}
                    onChange={(e) => setFormVideoUrl(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-900 rounded-lg px-3 py-2 border border-zinc-200 dark:border-zinc-805 outline-none focus:border-red-500 text-zinc-950 dark:text-white text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest mb-1 select-none font-sans">Source Name (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Reuters, BBC"
                      value={formSourceName}
                      onChange={(e) => setFormSourceName(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 rounded-lg px-3 py-2 border border-zinc-200 dark:border-zinc-805 outline-none focus:border-red-500 text-zinc-950 dark:text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest mb-1 select-none font-sans">Source Link URL (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="https://..."
                      value={formSourceUrl}
                      onChange={(e) => setFormSourceUrl(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 rounded-lg px-3 py-2 border border-zinc-200 dark:border-zinc-805 outline-none focus:border-red-500 text-zinc-950 dark:text-white text-xs"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
                
              {/* Left column ended. */}

              {/* Form Right Side: Sidebar Meta Data (Issue 4) */}
              {formStep === 'publish' && (
                <div className="lg:col-span-5 space-y-4 animate-fade-in font-sans">
                
                {/* Publishing State box */}
                <div className="bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/50 dark:border-zinc-850 rounded-xl p-5 space-y-4">
                  <h4 className="font-serif font-black text-sm text-zinc-900 dark:text-zinc-100 pb-2 border-b border-zinc-100 dark:border-zinc-805 select-none">
                    Publication Rules
                  </h4>

                  <div>
                    <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest mb-1 select-none">Publishing status</label>
                    <div className="grid grid-cols-3 gap-1.5 bg-zinc-200 dark:bg-zinc-900 rounded-lg p-1 select-none">
                      {['draft', 'published', 'scheduled'].map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setFormStatus(status as any)}
                          className={`py-1.5 font-extrabold capitalize rounded-md text-[10px] sm:text-xs cursor-pointer transition-all ${
                            formStatus === status 
                              ? 'bg-white dark:bg-zinc-805 text-zinc-900 dark:text-white shadow-xs' 
                              : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-450 dark:hover:text-zinc-200'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest mb-1 select-none">Author Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Editor team"
                      value={formAuthor}
                      onChange={(e) => setFormAuthor(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 rounded-lg px-3 py-2 border border-zinc-200 dark:border-zinc-805 outline-none "
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest mb-1 select-none">Author Photo/Avatar URL (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. https://images.unsplash.com/photo-..."
                      value={formAuthorAvatar}
                      onChange={(e) => setFormAuthorAvatar(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 rounded-lg px-3 py-2 border border-zinc-200 dark:border-zinc-805 outline-none "
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest mb-1 select-none">Sch. Date</label>
                      <input 
                        type="date" 
                        required
                        value={formSchDate}
                        onChange={(e) => setFormSchDate(e.target.value)}
                        className="w-full bg-white dark:bg-zinc-900 rounded-lg px-2.5 py-1.5 border border-zinc-200 dark:border-zinc-805 outline-none select-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest mb-1 select-none">Sch. Time</label>
                      <input 
                        type="time" 
                        required
                        value={formSchTime}
                        onChange={(e) => setFormSchTime(e.target.value)}
                        className="w-full bg-white dark:bg-zinc-900 rounded-lg px-2.5 py-1.5 border border-zinc-200 dark:border-zinc-805 outline-none select-none"
                      />
                    </div>
                  </div>

                  {/* Highlights Checks */}
                  <div className="space-y-2 pt-2 select-none">
                    <label className="relative flex items-center gap-2 cursor-pointer font-bold text-zinc-700 dark:text-zinc-300 text-xs bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">
                      <input 
                        type="checkbox" 
                        id="formIsBreakingCheckbox"
                        checked={formIsBreaking}
                        onChange={(e) => setFormIsBreaking(e.target.checked)}
                        className="rounded text-brand-crimson focus:ring-brand-crimson h-4 w-4 border-zinc-300 cursor-pointer"
                      />
                      <span className="text-brand-crimson dark:text-red-400 font-extrabold uppercase">⚡ Mark as Breaking News</span>
                    </label>

                    <label className="relative flex items-center gap-2 cursor-pointer font-bold text-zinc-700 dark:text-zinc-300 text-xs bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                      <input 
                        type="checkbox" 
                        id="formIsTrendingCheckbox"
                        checked={formIsTrending}
                        onChange={(e) => setFormIsTrending(e.target.checked)}
                        className="rounded text-brand-crimson focus:ring-brand-crimson h-4 w-4 border-zinc-300 cursor-pointer"
                      />
                      <span className="text-amber-700 dark:text-amber-400 font-extrabold uppercase">📈 Pin to TRENDING Carousels</span>
                    </label>
                  </div>
                </div>

                {/* Categorization card */}
                <div className="bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/50 dark:border-zinc-850 rounded-xl p-5 space-y-4">
                  <h4 className="font-serif font-black text-sm text-zinc-900 dark:text-zinc-100 pb-2 border-b border-zinc-100 dark:border-zinc-805 select-none">
                    Categorization
                  </h4>

                  <div>
                    <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest mb-1 select-none">Main category</label>
                    <select 
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-805 py-2 px-3 rounded-lg outline-none cursor-pointer"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest mb-1 select-none">Sub-category</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Electric vehicles / AI ethics"
                      value={formSubcategory}
                      onChange={(e) => setFormSubcategory(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 rounded-lg px-3 py-2 border border-zinc-200 dark:border-zinc-805 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest mb-1 select-none">Tags / Keywords (Comma separated)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. global, environment, agreement"
                      value={formTags}
                      onChange={(e) => setFormTags(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 rounded-lg px-3 py-2 border border-zinc-200 dark:border-zinc-805 outline-none"
                    />
                  </div>
                </div>

                </div>
              )}

            </div>

            {/* Stepper Wizard Footer Controls (Issue 4) */}
            <div className="flex justify-between items-center pt-6 border-t border-zinc-150 dark:border-zinc-805 mt-8 select-none">
              <div>
                {formStep !== 'content' && (
                  <button
                    type="button"
                    onClick={() => {
                      if (formStep === 'seo') setFormStep('content');
                      else if (formStep === 'publish') setFormStep('seo');
                    }}
                    className="px-5 py-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-850 text-zinc-700 dark:text-zinc-300 font-bold uppercase rounded-xl border border-zinc-205 dark:border-zinc-800 transition-all cursor-pointer text-xs font-sans"
                  >
                    &larr; Back
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {formStep !== 'publish' ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (formStep === 'content') setFormStep('seo');
                      else if (formStep === 'seo') setFormStep('publish');
                    }}
                    className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white font-black uppercase rounded-xl transition-all cursor-pointer tracking-wider text-xs shadow-md font-sans"
                  >
                    Continue &rarr;
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-brand-crimson hover:bg-red-700 text-white font-black uppercase rounded-xl transition-all cursor-pointer tracking-wider text-xs shadow-md flex items-center gap-2 font-sans animate-pulse"
                  >
                    <Save size={14} />
                    <span>Save and Publish Story</span>
                  </button>
                )}
              </div>
            </div>

          </form>
        )}

        {/* Tab CONTENT: Category Management */}
        {activeTab === 'categories' && (
          <div className="space-y-6 animate-fade-in text-xs">
            <div className="border-b border-zinc-100 dark:border-zinc-800 pb-5 mb-5 select-none">
              <h3 className="text-xl font-serif font-black text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                <List className="text-brand-crimson dark:text-red-500" />
                <span>Categories Workspace</span>
              </h3>
              <p className="text-xs text-zinc-400 font-semibold leading-normal mt-0.5">Author dynamic global portals, re-route index nodes instantly</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Column: Append New Category Form */}
              <div className="md:col-span-5 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-205 dark:border-zinc-850 rounded-2xl p-5 h-fit select-none">
                <h4 className="font-serif font-black text-sm text-zinc-850 dark:text-zinc-150 pb-2 border-b border-zinc-100 dark:border-zinc-805 mb-4">
                  Add New Category
                </h4>

                <form onSubmit={handleAddCategory} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest mb-1 select-none">Category Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Health, Politics..."
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 rounded-lg px-3.5 py-2.5 border border-zinc-200 dark:border-zinc-810 outline-none focus:border-brand-crimson"
                      required
                    />
                  </div>

                  <p className="text-[10px] text-zinc-400 leading-normal">
                    Categories appear dynamically inside sections and editor focus tab sets on the front page. Removing indices moves items safely to baseline buckets.
                  </p>

                  <button 
                    type="submit"
                    className="w-full bg-brand-crimson dark:bg-red-650 hover:bg-zinc-900 font-bold uppercase py-2.5 rounded-lg text-white shadow-md active:scale-95 transition-transform cursor-pointer"
                  >
                    Create Category Node
                  </button>
                </form>
              </div>

              {/* Right Column: Existing Categories List */}
              <div className="md:col-span-7 space-y-4">
                <h4 className="font-serif font-black text-sm text-zinc-850 dark:text-zinc-150 select-none">
                  Active Category Directory ({categories.length})
                </h4>

                <div className="border border-zinc-100 dark:border-zinc-855 rounded-xl overflow-hidden divide-y divide-zinc-100 dark:divide-zinc-855">
                  {categories.map((cat, index) => (
                    <div key={cat} className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 hover:bg-zinc-50/50 transition-colors">
                      {editingCatIndex === index ? (
                        <div className="flex items-center gap-2 flex-grow mr-4">
                          <input 
                            type="text"
                            value={editCatName}
                            onChange={(e) => setEditCatName(e.target.value)}
                            className="bg-white dark:bg-zinc-950 border border-zinc-200 px-3 py-1 text-xs rounded-lg outline-none flex-grow"
                            required
                          />
                          <button 
                            onClick={() => saveEditCategory(index)}
                            className="bg-emerald-500 text-white font-bold p-1 px-3.5 rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer"
                          >
                            Save
                          </button>
                          <button 
                            onClick={() => setEditingCatIndex(null)}
                            className="bg-zinc-300 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold p-1 px-3 rounded-lg hover:bg-zinc-400 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-3 select-none">
                            <span className="p-1.5 bg-red-50 dark:bg-red-955/25 text-brand-crimson dark:text-red-505 rounded">
                              <Hash size={14} />
                            </span>
                            <div>
                              <span className="font-serif font-black text-sm text-zinc-900 dark:text-white block">{cat}</span>
                              <span className="text-[10px] text-zinc-400 block font-semibold">
                                {articles.filter(a => a.category.toLowerCase() === cat.toLowerCase()).length} publication links active
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-0.5">
                            <button 
                              onClick={() => startEditCategory(index)}
                              className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-md cursor-pointer"
                              title="Rename"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button 
                              onClick={() => handleDeleteCategory(cat)}
                              className="p-1.5 hover:bg-red-50 dark:hover:bg-red-955/25 text-brand-crimson dark:text-red-400 rounded-md cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab CONTENT: Media Drive grid upload */}
        {activeTab === 'media' && (
          <div className="space-y-6 animate-fade-in text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-850 pb-5 mb-5 select-none">
              <div>
                <h3 className="text-xl font-serif font-black text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                  <Image className="text-brand-crimson dark:text-red-500" />
                  <span>Media Management Engine</span>
                </h3>
                <p className="text-xs text-zinc-405 font-semibold leading-normal mt-0.5">Review, import local/external photos, and grab static CDN references</p>
              </div>

              <div className="flex items-center gap-2">
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-brand-crimson dark:bg-red-650 hover:bg-zinc-900 font-bold text-xs text-white uppercase tracking-wider px-5 py-3 rounded-xl cursor-pointer flex items-center gap-2 shadow-md"
                >
                  <Plus size={16} />
                  <span>Upload Image</span>
                </button>
              </div>
            </div>

            {/* Drag and drop full row widget */}
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-10 text-center select-none cursor-pointer transition-all ${
                dragActive 
                  ? 'border-brand-crimson bg-red-50/50 dark:bg-red-955/10' 
                  : 'border-zinc-200 dark:border-zinc-805 hover:border-brand-crimson dark:hover:border-red-500'
              }`}
            >
              <Upload size={32} className="mx-auto text-zinc-400 mb-2 animate-[bounce_1.5s_infinite]" />
              <h4 className="font-serif font-black text-sm text-zinc-800 dark:text-zinc-200">Deposit Media Files Securely</h4>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed mt-1">
                Drop high definition PNGs, JPEGs, or webp format templates. Instantly compile local variables into secure base64 blocks.
              </p>
            </div>

            {/* Dynamic Grid */}
            <div className="space-y-4">
              <h4 className="font-serif font-black text-sm text-zinc-850 dark:text-zinc-150 select-none">CDN Library Assets ({mediaList.length})</h4>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {mediaList.map((url, i) => (
                  <div key={i} className="group relative aspect-[14/10] bg-zinc-50 dark:bg-zinc-950/40 rounded-xl overflow-hidden border border-zinc-200/50 dark:border-zinc-805/85 shadow-xs hover:shadow-md transition-all">
                    <img src={url} alt={`Media asset ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1.5 transition-opacity duration-200 p-2">
                      <button 
                        onClick={() => copyToClipboard(url, i)}
                        className="bg-white/95 text-zinc-900 hover:bg-white p-1.5 rounded-lg font-bold text-[10px] flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95 transition-transform"
                        title="Copy image link URL to clipboard"
                      >
                        {copiedIndex === i ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                        <span>{copiedIndex === i ? 'Copied' : 'Copy URL'}</span>
                      </button>

                      <button 
                        onClick={() => {
                          if (window.confirm('Delete this image from assets library?')) {
                            const updated = mediaList.filter((_, idx) => idx !== i);
                            setMediaList(updated);
                            localStorage.setItem('av_media_manager', JSON.stringify(updated));
                            addToast('Image removed successfully!', 'info');
                          }
                        }}
                        className="bg-red-650 hover:bg-brand-crimson text-white p-1.5 rounded-lg cursor-pointer"
                        title="Delete asset"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                    <span className="absolute bottom-2 left-2 bg-zinc-950/70 text-[8px] font-mono tracking-tight text-white px-2 py-0.5 rounded backdrop-blur-xs select-none">
                      Asset #{i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab CONTENT: Settings Desk */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fade-in text-xs">
            <div className="border-b border-zinc-100 dark:border-zinc-800 pb-5 mb-5 select-none font-sans">
              <h3 className="text-xl font-serif font-black text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                <Settings className="text-brand-crimson dark:text-red-500" />
                <span>Site Parameter settings</span>
              </h3>
              <p className="text-xs text-zinc-405 font-semibold leading-normal mt-0.5">Control site branding headers, contact descriptors, and social endpoint variables</p>
            </div>

            {/* Site settings form */}
            <form onSubmit={handleSaveSettings} className="space-y-6">
              
              {/* Box 1: Core Branding */}
              <div className="bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/55 dark:border-zinc-850 p-5 rounded-2xl space-y-4">
                <h4 className="font-serif font-black text-sm text-zinc-900 dark:text-white pb-2 border-b border-zinc-150 dark:border-zinc-805 select-none">Core Brand Identifiers</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest mb-1.5 select-none">Site Title Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. AV News24"
                      value={settingsName}
                      onChange={(e) => setSettingsName(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 rounded-lg px-3 py-2 border border-zinc-200 dark:border-zinc-810 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest mb-1.5 select-none">Logo URL Accent (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="Can paste image CDN URL"
                      value={settingsLogo}
                      onChange={(e) => setSettingsLogo(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 rounded-lg px-3 py-2 border border-zinc-200 dark:border-zinc-810 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest mb-1.5 select-none">Site tagline</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Your Trustworthy Source for 24/7 News Updates"
                    value={settingsTagline}
                    onChange={(e) => setSettingsTagline(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-900 rounded-lg px-4 py-2.5 border border-zinc-200 dark:border-zinc-810 outline-none"
                  />
                </div>
              </div>

              {/* Box 2: Breaking ticker controller */}
              <div className="bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/55 dark:border-zinc-850 p-5 rounded-2xl space-y-4">
                <h4 className="font-serif font-black text-sm text-zinc-900 dark:text-white pb-2 border-b border-zinc-150 dark:border-zinc-805 select-none">Breaking News ticker manager</h4>
                
                <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg border border-zinc-150 select-none pb-3.5 mb-2.5">
                  <input 
                    type="checkbox" 
                    id="ticker-setup-toggle"
                    checked={useCustomTicker}
                    onChange={(e) => {
                      setUseCustomTicker(e.target.checked);
                      localStorage.setItem('av_use_custom_ticker', String(e.target.checked));
                      addToast(e.target.checked ? 'Now displaying custom ticker announcement!' : 'Now cycling latest story headlines!', 'info');
                    }}
                    className="rounded text-brand-crimson focus:ring-brand-crimson h-4 w-4"
                  />
                  <label htmlFor="ticker-setup-toggle" className="cursor-pointer font-bold text-zinc-700 dark:text-zinc-300">
                    Override ticker with custom text announcements
                  </label>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest select-none">Custom ticker text marquee feed</label>
                  <textarea 
                    rows={2}
                    placeholder="e.g. CRITICAL WEATHER ALERTSissued in New Delhi • GOLD REACHES HISTORIC PRICING HIGHS today..."
                    value={tickerText}
                    onChange={(e) => {
                      setTickerText(e.target.value);
                      localStorage.setItem('av_ticker_text', e.target.value);
                    }}
                    className="w-full bg-white dark:bg-zinc-900 rounded-lg px-3 py-2 border border-zinc-200 dark:border-zinc-810 outline-none"
                    disabled={!useCustomTicker}
                  />
                  <p className="text-[10px] text-zinc-400">Separate headlines in your ticker using a visual flag like "•" or "|" for elegant spacing.</p>
                </div>
              </div>

              {/* Box 3: Social Desk */}
              <div className="bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/55 dark:border-zinc-850 p-5 rounded-2xl space-y-4">
                <h4 className="font-serif font-black text-sm text-zinc-900 dark:text-white pb-2 border-b border-zinc-150 dark:border-zinc-805 select-none">Social media & Contact details</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest mb-1.5 select-none">Contact email address</label>
                    <input 
                      type="email" 
                      placeholder="editorial@avnews24.com"
                      value={settingsEmail}
                      onChange={(e) => setSettingsEmail(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 rounded-lg px-3 py-2 border border-zinc-200 dark:border-zinc-810 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest mb-1.5 select-none">Contact telephone helpline</label>
                    <input 
                      type="text" 
                      placeholder="+91 11-2301-2000"
                      value={settingsPhone}
                      onChange={(e) => setSettingsPhone(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 rounded-lg px-3 py-2 border border-zinc-200 dark:border-zinc-810 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest mb-1.5 select-none">Facebook Handle Link</label>
                    <input 
                      type="text" 
                      value={settingsFB}
                      onChange={(e) => setSettingsFB(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 rounded-lg px-3 py-2 border border-zinc-200 dark:border-zinc-810 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest mb-1.5 select-none">Twitter (X) Handle Link</label>
                    <input 
                      type="text" 
                      value={settingsTW}
                      onChange={(e) => setSettingsTW(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 rounded-lg px-3 py-2 border border-zinc-200 dark:border-zinc-810 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest mb-1.5 select-none">Instagram Handle Link</label>
                    <input 
                      type="text" 
                      value={settingsIG}
                      onChange={(e) => setSettingsIG(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 rounded-lg px-3 py-2 border border-zinc-200 dark:border-zinc-810 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest mb-1.5 select-none">YouTube Channel Link</label>
                    <input 
                      type="text" 
                      value={settingsYT}
                      onChange={(e) => setSettingsYT(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 rounded-lg px-3 py-2 border border-zinc-200 dark:border-zinc-810 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 select-none">
                <button 
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset all portal settings back to system standard defaults?')) {
                      setSettingsName('AV News24');
                      setSettingsTagline('Your Trustworthy Source for 24/7 News Updates');
                      setSettingsLogo('');
                      setSettingsFB('https://facebook.com');
                      setSettingsTW('https://twitter.com');
                      setSettingsIG('https://instagram.com');
                      setSettingsYT('https://youtube.com');
                      setSettingsEmail('contact@avnews24.com');
                      setSettingsPhone('+91 11-2301-2000');
                      addToast('Failsafe settings reset applied!', 'info');
                    }
                  }}
                  className="px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-350 hover:bg-zinc-100 dark:hover:bg-zinc-950 rounded-xl cursor-pointer flex items-center gap-1 bg-white"
                >
                  <RotateCcw size={14} />
                  <span>Reset Defaults</span>
                </button>
                <button 
                  type="submit"
                  className="bg-brand-crimson dark:bg-red-650 hover:opacity-90 px-6 py-2.5 font-bold uppercase rounded-xl text-white shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Save size={14} />
                  <span>Commit Client settings</span>
                </button>
              </div>

            </form>
          </div>
        )}

        {/* Tab CONTENT: User Management Desk (Super Admin Only) */}
        {activeTab === 'users' && currentUser?.role === 'Admin' && (
          <div className="space-y-6 animate-fade-in text-xs text-left">
            <div className="border-b border-zinc-100 dark:border-zinc-800 pb-5 mb-5 select-none md:flex md:items-center md:justify-between text-left">
              <div>
                <h3 className="text-xl font-serif font-black text-zinc-900 dark:text-zinc-50 flex items-center gap-2 text-left">
                  <Users size={22} className="text-brand-crimson dark:text-red-500 shrink-0" />
                  <span>User Management Hub</span>
                </h3>
                <p className="text-xs text-zinc-400 font-semibold leading-normal mt-0.5 text-left">
                  Provisional access desk: register team staff, assign roles & permissions, or revoke tokens
                </p>
              </div>

              {editingUserId && (
                <button 
                  onClick={() => {
                    setEditingUserId(null);
                    setUserFormEmail('');
                    setUserFormName('');
                    setUserFormPassword('');
                    setUserFormRole('Reporter');
                  }}
                  className="mt-2 md:mt-0 font-bold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 px-4 py-2 rounded-xl transition-colors text-xs uppercase"
                >
                  Clear Form / Add Staff &rarr;
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
              
              {/* Left Column: Create or Edit User Form */}
              <div className="md:col-span-4 bg-zinc-50/55 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-850 rounded-2xl p-5 h-fit select-none text-left">
                <h4 className="font-serif font-black text-sm text-zinc-900 dark:text-zinc-150 pb-2 border-b border-zinc-100 dark:border-zinc-805 mb-4 text-left">
                  {editingUserId ? "Edit Staff Permissions" : "Register New Staff Profile"}
                </h4>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    
                    const cleanEmail = userFormEmail.trim().toLowerCase();
                    const cleanName = userFormName.trim();
                    const cleanPassword = userFormPassword.trim();

                    if (!cleanEmail || !cleanName || !cleanPassword) {
                      addToast('All fields are requested.', 'error');
                      return;
                    }

                    if (cleanPassword.length < 6) {
                      addToast('Password must be 6 or more characters.', 'error');
                      return;
                    }

                    // Check duplicate email
                    const exists = users.some(u => u.email.toLowerCase() === cleanEmail && u.id !== editingUserId);
                    if (exists) {
                      addToast('A staff member with this email is already registered.', 'error');
                      return;
                    }

                    if (editingUserId) {
                      // Save modifications
                      const updatedUsers = users.map(u => {
                        if (u.id === editingUserId) {
                          return {
                            ...u,
                            email: cleanEmail,
                            name: cleanName,
                            password: cleanPassword,
                            role: userFormRole
                          };
                        }
                        return u;
                      });

                      setUsers(updatedUsers);
                      localStorage.setItem('av_users', JSON.stringify(updatedUsers));
                      
                      // Also update currentUser on the fly if super admin edited their own details
                      if (editingUserId === currentUser.id) {
                        setCurrentUser({
                          ...currentUser,
                          email: cleanEmail,
                          name: cleanName,
                          password: cleanPassword,
                          role: userFormRole
                        });
                        sessionStorage.setItem('av_admin_current_user_email', cleanEmail);
                      }

                      addToast(`Staff profile for "${cleanName}" modified successfully!`, 'success');
                      setEditingUserId(null);
                    } else {
                      // Add brand new user
                      const newUser = {
                        id: 'user-' + Date.now(),
                        email: cleanEmail,
                        name: cleanName,
                        password: cleanPassword,
                        role: userFormRole
                      };

                      const updatedList = [...users, newUser];
                      setUsers(updatedList);
                      localStorage.setItem('av_users', JSON.stringify(updatedList));
                      addToast(`New team staff member "${cleanName}" registered successfully!`, 'success');
                    }

                    // Reset form state
                    setUserFormEmail('');
                    setUserFormName('');
                    setUserFormPassword('');
                    setUserFormRole('Reporter');
                  }} 
                  className="space-y-4 text-left"
                >
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-650 dark:text-zinc-350 uppercase tracking-widest mb-1.5 select-none text-left">Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Robin Sharma"
                      value={userFormName}
                      onChange={(e) => setUserFormName(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 rounded-lg px-3.5 py-2 border border-zinc-200 dark:border-zinc-810 outline-none text-zinc-950 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-655 dark:text-zinc-350 uppercase tracking-widest mb-1.5 select-none text-left">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="e.g. robin@avnews24.com"
                      value={userFormEmail}
                      onChange={(e) => setUserFormEmail(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 rounded-lg px-3.5 py-2 border border-zinc-200 dark:border-zinc-810 outline-none text-zinc-950 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-655 dark:text-zinc-350 uppercase tracking-widest mb-1.5 select-none text-left">Password</label>
                    <input 
                      type="text" 
                      placeholder="At least 6 characters"
                      value={userFormPassword}
                      onChange={(e) => setUserFormPassword(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 rounded-lg px-3.5 py-2 border border-zinc-200 dark:border-zinc-810 outline-none font-mono text-zinc-950 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-zinc-655 dark:text-zinc-350 uppercase tracking-widest mb-1.5 select-none text-left">Role Permission Assignment</label>
                    <select 
                      value={userFormRole}
                      onChange={(e) => setUserFormRole(e.target.value as any)}
                      className="w-full bg-white dark:bg-zinc-905 border border-zinc-200 dark:border-zinc-810 px-3.5 py-2 rounded-lg outline-none cursor-pointer text-zinc-950 dark:text-white bg-white dark:bg-zinc-900"
                    >
                      <option value="Admin">Admin (Access all tabs & users management)</option>
                      <option value="Editor">Editor (Access all tabs except user management)</option>
                      <option value="Reporter">Reporter (Lock into Write Article form directly)</option>
                    </select>
                  </div>

                  <p className="text-[10px] text-zinc-400 leading-normal font-medium text-left">
                    Admins have full command of settings, categories, deletion, and credentials. Editors can manage all media, stories, and filters. Reporters are locked cleanly inside the Write Article form without side directories.
                  </p>

                  <button 
                    type="submit"
                    className="w-full bg-brand-crimson dark:bg-red-650 hover:bg-zinc-950 font-bold uppercase py-2.5 rounded-lg text-white shadow-md active:scale-[0.98] transition-transform cursor-pointer tracking-wider flex items-center justify-center gap-1.5"
                  >
                    <Plus size={13} />
                    <span>{editingUserId ? "Save Staff Modifications" : "Register Staff Profile"}</span>
                  </button>
                </form>
              </div>

              {/* Right Column: Existing Users Database Directory */}
              <div className="md:col-span-8 space-y-4 text-left">
                <h4 className="font-serif font-black text-sm text-zinc-850 dark:text-zinc-150 select-none text-left">
                  Core Staff Directory ({users.length} active)
                </h4>

                <div className="border border-zinc-200 dark:border-zinc-850 rounded-2xl overflow-hidden divide-y divide-zinc-100 dark:divide-zinc-850 bg-white dark:bg-zinc-950 text-left">
                  {users.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white dark:bg-zinc-900 hover:bg-zinc-50/40 dark:hover:bg-zinc-950/20 transition-all gap-3 text-left">
                      
                      <div className="flex items-center gap-3.5 text-left">
                        <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 rounded-xl flex items-center justify-center font-bold font-serif shadow-sm text-sm border border-zinc-200/50 dark:border-zinc-805 uppercase">
                          {item.name.charAt(0)}
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-2 flex-wrap text-left">
                            <span className="font-serif font-black text-sm text-zinc-900 dark:text-white">{item.name}</span>
                            
                            {/* Role Badge style */}
                            <span className={`text-[8px] uppercase font-black px-1.5 py-0.5 rounded border tracking-wider leading-none ${
                              item.role === 'Admin' 
                                ? 'bg-red-500/5 text-brand-crimson border-red-550/15 dark:bg-red-950/20 dark:text-red-400' 
                                : item.role === 'Editor'
                                ? 'bg-blue-500/5 text-blue-600 border-blue-500/15 dark:bg-blue-950/20 dark:text-blue-400'
                                : 'bg-emerald-500/5 text-emerald-600 border-emerald-550/15 dark:bg-emerald-955/20 dark:text-emerald-450'
                            }`}>
                              {item.role}
                            </span>
                          </div>

                          <div className="text-[10px] text-zinc-400 font-semibold leading-normal mt-0.5 break-all text-left">
                            {item.email} • <span className="font-mono text-zinc-450">Pass: {item.password}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-1.5 select-none border-t border-zinc-50 dark:border-zinc-850 pt-2.5 sm:pt-0 sm:border-t-0">
                        <button 
                          type="button"
                          onClick={() => {
                            setEditingUserId(item.id);
                            setUserFormName(item.name);
                            setUserFormEmail(item.email);
                            setUserFormPassword(item.password);
                            setUserFormRole(item.role);
                          }}
                          className="flex items-center gap-1 p-2 px-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-650 dark:text-zinc-350 rounded-xl cursor-pointer font-bold text-[10px] uppercase border border-zinc-200 dark:border-zinc-805 transition-colors"
                          title="Edit staff profile details & roles"
                        >
                          <Edit2 size={11} />
                          <span>Edit</span>
                        </button>
                        
                        <button 
                          type="button"
                          onClick={() => {
                            if (item.id === 'super-admin' || item.email === currentUser?.email) {
                              addToast('Lockout Failsafe: You cannot delete your own Super Admin profile!', 'error');
                              return;
                            }
                            if (window.confirm(`Are you sure you want to permanently revoke tokens and delete user "${item.name}" from your desk?`)) {
                              const updated = users.filter(u => u.id !== item.id);
                              setUsers(updated);
                              localStorage.setItem('av_users', JSON.stringify(updated));
                              addToast(`Member "${item.name}" deleted successfully`, 'info');
                            }
                          }}
                          className={`flex items-center gap-1 p-2 px-3 text-brand-crimson dark:text-red-400 bg-red-500/5 hover:bg-red-500/15 border border-red-500/10 rounded-xl cursor-pointer font-bold text-[10px] uppercase transition-colors ${
                            item.email === currentUser?.email ? 'opacity-40 cursor-not-allowed' : ''
                          }`}
                          title="Permanently remove worker details and access tokens"
                        >
                          <Trash2 size={11} />
                          <span>Delete</span>
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {showUrlImportModal && (
        <div className="fixed inset-0 bg-black/60 z-[250] flex items-center justify-center p-4 backdrop-blur-xs select-none">
          <div className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-2xl p-6 text-zinc-900 dark:text-zinc-100 flex flex-col space-y-4 animate-slide-up">
            <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h3 className="font-serif text-sm font-black text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
                <LinkIcon size={16} className="text-brand-crimson dark:text-red-500 animate-pulse" />
                <span>IMPORT DISPATCH FROM URL</span>
              </h3>
              <button 
                onClick={() => setShowUrlImportModal(false)}
                className="p-1 rounded-full hover:bg-zinc-105 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-500 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-[11px] text-zinc-550 dark:text-zinc-450 leading-relaxed">
              Insert any YouTube video link, X/Twitter post, or news dispatch URL. The integration client parses Open Graph metadata (Title, Excerpt, Featured Image, source name) automatically to pre-fill your editorial drafts.
            </p>

            <form onSubmit={handleUrlImport} className="space-y-4">
              <div>
                <label className="block text-[9px] font-black uppercase tracking-widest text-zinc-450 dark:text-zinc-400 mb-1 font-mono">Resource URL Link</label>
                <input 
                  type="url" 
                  required
                  placeholder="https://..."
                  value={importUrl}
                  onChange={(e) => setImportUrl(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-3 outline-none focus:ring-1 focus:ring-red-500/25 focus:border-red-500 text-zinc-900 dark:text-white text-xs"
                />
              </div>

              {importError && (
                <div className="p-3 bg-red-500/10 text-red-500 dark:text-red-400 text-[10.5px] rounded-xl border border-red-500/15 font-mono leading-relaxed">
                  ⚠️ Error: {importError}
                </div>
              )}

              {isImporting && (
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono font-bold animate-pulse py-1">
                  <div className="w-4 h-4 border-2 border-brand-crimson border-t-transparent rounded-full animate-spin shrink-0" />
                  <span>Extracting HTML tags & Open Graph credentials...</span>
                </div>
              )}

              <div className="flex gap-2.5 pt-2">
                <button 
                  type="button"
                  onClick={() => setShowUrlImportModal(false)}
                  className="flex-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-zinc-800 dark:text-zinc-100 font-bold text-xs uppercase py-3 rounded-xl cursor-pointer transition-colors border border-zinc-200/50 dark:border-zinc-800"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isImporting}
                  className="flex-1 bg-brand-crimson hover:bg-zinc-900 dark:bg-red-650 dark:hover:bg-white dark:hover:text-zinc-900 text-white font-bold text-xs uppercase py-3 rounded-xl cursor-pointer transition-colors shadow-md hover:shadow-lg disabled:opacity-50"
                >
                  {isImporting ? 'Scanning...' : 'Fetch & Pre-fill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
