import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { BlogPost } from '../domain/BlogPost';
import { fetchBlogPost } from '../application/useCases/GetBlogPostsUseCase';
import { useLang } from '../context/LangContext';

function formatDate(iso: string, lang: string) {
  return new Date(iso).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
    day: '2-digit', month: 'long', year: 'numeric',
  });
}

export function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, lang } = useLang();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetchBlogPost(slug).then(setPost).catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex flex-col items-center justify-center gap-4 text-zinc-500">
        <p className="font-mono text-sm">{t.blog.notFound}</p>
        <Link to="/" className="text-sm underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
          {t.nav.backHome}
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 font-mono text-sm">
        {t.blog.loadingPost}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-2xl mx-auto px-6 py-24">

        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-12 font-mono">
          {t.nav.backHome}
        </Link>

        <header className="mb-12 space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs font-mono text-zinc-400 dark:text-zinc-500 bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-medium leading-tight">{post.title}</h1>
          <div className="flex items-center gap-4 text-xs text-zinc-400 dark:text-zinc-500 font-mono">
            <span>{formatDate(post.publishedAt, lang)}</span>
            <span>·</span>
            <span>{post.readingTimeMin} {t.blog.readingTimeSuffix}</span>
          </div>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed border-l-2 border-zinc-300 dark:border-zinc-700 pl-4">
            {post.summary}
          </p>
          {/* Aviso quando o usuário está em EN mas o post é em PT */}
          {lang === 'en' && (
            <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500 italic">{t.blog.writtenIn}</p>
          )}
        </header>

        <article className="prose-blog" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <Link to="/" className="text-sm text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors font-mono">
            {t.blog.backToPortfolio}
          </Link>
        </div>

      </div>
    </div>
  );
}
