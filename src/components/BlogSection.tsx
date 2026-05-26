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

export function BlogSection() {
  const { t, lang } = useLang();
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <section className="space-y-8">
      <h3 className="text-sm font-semibold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">{t.blog.sectionTitle}</h3>
      <p className="text-sm text-zinc-400 font-mono">{t.blog.loadingPosts}</p>
    </section>
  );

  if (posts.length === 0) return null;

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">{t.blog.sectionTitle}</h3>
        <Link to="/blog" className="text-xs font-mono text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
          {t.blog.seeAll}
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.slice(0, 4).map((post) => (
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
            <h4 className="font-medium text-zinc-900 dark:text-zinc-100 leading-snug mb-2 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
              {post.title}
            </h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2 mb-4">
              {post.summary}
            </p>
            <div className="flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 font-mono">
              <span>{formatDate(post.publishedAt, lang)}</span>
              <span>{post.readingTimeMin} {t.blog.readingTimeSuffix}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
