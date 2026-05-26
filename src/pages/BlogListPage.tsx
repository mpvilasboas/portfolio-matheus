import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { BlogPostSummary } from '../domain/BlogPost';
import { fetchBlogPosts } from '../application/useCases/GetBlogPostsUseCase';
import { useLang } from '../context/LangContext';

function formatDate(iso: string, lang: string) {
  return new Date(iso).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
    day: '2-digit', month: 'long', year: 'numeric',
  });
}

export function BlogListPage() {
  const { t, lang } = useLang();
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-2xl mx-auto px-6 py-24">

        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-12 font-mono">
          {t.nav.backHome}
        </Link>

        <header className="mb-12 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-medium tracking-tight">{t.blog.pageTitle}</h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2 text-sm">{t.blog.pageSubtitle}</p>
          </div>
          <Link
            to="/blog/new"
            className="shrink-0 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium px-4 py-2 rounded-md hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
          >
            {t.blog.newPost}
          </Link>
        </header>

        {loading && <p className="text-sm text-zinc-400 font-mono">{t.blog.loadingPosts}</p>}
        {!loading && posts.length === 0 && <p className="text-sm text-zinc-400 font-mono">{t.blog.noPosts}</p>}

        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group block bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 hover:border-zinc-900 dark:hover:border-zinc-500 transition-all duration-200 hover:shadow-sm"
            >
              <div className="flex flex-wrap gap-1.5 mb-3">
                {post.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-xs font-mono text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="font-medium text-zinc-900 dark:text-zinc-100 leading-snug mb-2 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">{post.summary}</p>
              <div className="flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                <span>{formatDate(post.publishedAt, lang)}</span>
                <span>{post.readingTimeMin} {t.blog.readingTimeSuffix} →</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
