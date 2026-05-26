import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createBlogPost } from '../application/useCases/GetBlogPostsUseCase';
import { useLang } from '../context/LangContext';

const SESSION_KEY = 'blog_token';

function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, ' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function PasswordGate({ onUnlock }: { onUnlock: (token: string) => void }) {
  const { t } = useLang();
  const [password, setPassword] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;
    sessionStorage.setItem(SESSION_KEY, password);
    onUnlock(password);
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div>
          <h1 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100">{t.newPost.restricted}</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{t.newPost.restrictedSub}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder={t.newPost.passwordPlaceholder}
            autoFocus
            className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-400 transition-colors"
          />
          <button type="submit" className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-2.5 rounded-md text-sm font-medium hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors">
            {t.newPost.enterBtn}
          </button>
        </form>
        <Link to="/blog" className="block text-center text-xs font-mono text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
          {t.nav.backBlog}
        </Link>
      </div>
    </div>
  );
}

export function NewPostPage() {
  const navigate = useNavigate();
  const { t } = useLang();

  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(SESSION_KEY));
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [tagsRaw, setTagsRaw] = useState('');
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!token) return <PasswordGate onUnlock={setToken} />;

  const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);
  const readingTimeMin = estimateReadingTime(content);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!title.trim() || !summary.trim() || !content.trim()) {
      setError(t.newPost.requiredError);
      return;
    }
    setSubmitting(true);
    try {
      const post = await createBlogPost({ title, summary, content, tags, readingTimeMin }, token!);
      navigate(`/blog/${post.slug}`);
    } catch (err: any) {
      if (err.message === 'Não autorizado.' || err.message === 'Unauthorized.') {
        sessionStorage.removeItem(SESSION_KEY);
        setToken(null);
      }
      setError(err.message ?? t.newPost.requiredError);
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = "w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-400 transition-colors";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-2xl mx-auto px-6 py-24">

        <div className="flex items-center justify-between mb-12">
          <Link to="/blog" className="text-sm text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors font-mono">
            {t.nav.backBlog}
          </Link>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setPreview(v => !v)}
              className="text-xs font-mono px-3 py-1.5 border border-zinc-300 dark:border-zinc-700 rounded hover:border-zinc-900 dark:hover:border-zinc-400 transition-colors"
            >
              {preview ? t.newPost.editBtn : t.newPost.previewBtn}
            </button>
            <button
              type="button"
              onClick={() => { sessionStorage.removeItem(SESSION_KEY); setToken(null); }}
              className="text-xs font-mono text-zinc-400 hover:text-red-500 transition-colors"
            >
              {t.newPost.logoutBtn}
            </button>
          </div>
        </div>

        <h1 className="text-2xl font-medium mb-10">{t.newPost.pageTitle}</h1>

        {preview ? (
          <div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tags.map(tag => <span key={tag} className="text-xs font-mono text-zinc-400 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded">{tag}</span>)}
            </div>
            <h2 className="text-3xl font-medium leading-tight mb-3">
              {title || <span className="text-zinc-300 dark:text-zinc-600">{t.newPost.previewTitlePlaceholder}</span>}
            </h2>
            <p className="text-zinc-400 font-mono text-xs mb-6">{readingTimeMin} {t.blog.readingTimeSuffix}</p>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 border-l-2 border-zinc-300 dark:border-zinc-700 pl-4 mb-10 leading-relaxed">
              {summary || <span className="text-zinc-300 dark:text-zinc-600">{t.newPost.previewSummaryPlaceholder}</span>}
            </p>
            <article className="prose-blog" dangerouslySetInnerHTML={{ __html: content || '<p style="color:#a1a1aa">...</p>' }} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">{t.newPost.titleLabel}</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder={t.newPost.titlePlaceholder} className={inputClass} />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">{t.newPost.summaryLabel}</label>
              <textarea value={summary} onChange={e => setSummary(e.target.value)} rows={2} placeholder={t.newPost.summaryPlaceholder} className={`${inputClass} resize-none`} />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                {t.newPost.tagsLabel} <span className="normal-case font-normal">{t.newPost.tagsHint}</span>
              </label>
              <input type="text" value={tagsRaw} onChange={e => setTagsRaw(e.target.value)} placeholder={t.newPost.tagsPlaceholder} className={inputClass} />
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tags.map(tag => <span key={tag} className="text-xs font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">{tag}</span>)}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  {t.newPost.contentLabel} <span className="normal-case font-normal">{t.newPost.contentHint}</span>
                </label>
                <span className="text-xs text-zinc-400 font-mono">{t.newPost.readingTimePrefix}{readingTimeMin} {t.blog.readingTimeSuffix}</span>
              </div>
              <textarea value={content} onChange={e => setContent(e.target.value)} rows={18} placeholder={t.newPost.contentPlaceholder} className={`${inputClass} font-mono resize-y`} />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-md px-4 py-2.5">{error}</p>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-6 py-2.5 rounded-md text-sm font-medium hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? t.newPost.publishing : t.newPost.publishBtn}
              </button>
              <Link to="/blog" className="px-6 py-2.5 rounded-md text-sm font-medium border border-zinc-200 dark:border-zinc-700 hover:border-zinc-900 dark:hover:border-zinc-400 transition-colors">
                {t.newPost.cancelBtn}
              </Link>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
