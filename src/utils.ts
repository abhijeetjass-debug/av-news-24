export function getRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  if (diff < 0) return 'Just now';
  
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

/**
 * Formats plain text article bodies by converting vertical spacing/newlines 
 * into clean paragraph tags, while leaving pre-existing HTML elements untouched.
 */
export function formatArticleBody(body?: string): string {
  if (!body) return '';
  // If identifying existing HTML elements that denote structure, avoid modifying it
  if (body.includes('<p>') || body.includes('<p ') || body.includes('</div>') || body.includes('<br')) {
    return body;
  }
  
  // Clean newlines, double-vertical lines, and map to paragraph tag wraps
  return body
    .trim()
    .split(/\s*\n\s*\n/)
    .map(para => {
      const cleanPara = para.replace(/\s*\n\s*/g, '<br />');
      return cleanPara ? `<p class="mb-5 leading-relaxed text-zinc-805 dark:text-zinc-200">${cleanPara}</p>` : '';
    })
    .join('');
}

export function estimateReadTime(article: { title: string; excerpt?: string; body?: string }): number {
  const text = [article.title, article.excerpt || '', article.body || ''].filter(Boolean).join(' ');
  const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  return Math.max(1, Math.ceil(words / 200));
}

