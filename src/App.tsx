import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { executeGetPortfolioData } from './application/useCases/GetProjectsUseCase';
import { executeGetVisitorCount, executeIncrementVisitorCount } from './application/useCases/VisitorUseCase';
import { BlogSection } from './components/BlogSection';
import { GitHubSection } from './components/GitHubSection';
import { PostPage } from './pages/PostPage';
import { BlogListPage } from './pages/BlogListPage';
import { NewPostPage } from './pages/NewPostPage';
import { useTheme } from './context/ThemeContext';
import { useLang } from './context/LangContext';

// ── Toggle de tema ─────────────────────────────────────────────────────────
function ThemeToggle() {
  const { dark, toggle } = useTheme();
  const { t } = useLang();
  return (
    <button
      onClick={toggle}
      aria-label={dark ? t.lightMode : t.darkMode}
      className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
    >
      <span className="relative inline-flex items-center w-9 h-5 rounded-full bg-zinc-200 dark:bg-zinc-700 transition-colors duration-300">
        <span className={`absolute w-3.5 h-3.5 rounded-full bg-white shadow transition-transform duration-300 ${dark ? 'translate-x-4' : 'translate-x-0.5'}`} />
      </span>
      <span>{dark ? `☀ ${t.lightMode}` : `◑ ${t.darkMode}`}</span>
    </button>
  );
}

// ── Toggle de idioma ───────────────────────────────────────────────────────
function LangToggle() {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
      className="flex items-center gap-1 text-xs font-mono font-semibold tracking-wider border border-zinc-200 dark:border-zinc-700 rounded px-2 py-1 transition-colors hover:border-zinc-900 dark:hover:border-zinc-400"
    >
      <span className={lang === 'pt' ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400'}>PT</span>
      <span className="text-zinc-300 dark:text-zinc-600">|</span>
      <span className={lang === 'en' ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400'}>EN</span>
    </button>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog" element={<BlogListPage />} />
      <Route path="/blog/new" element={<NewPostPage />} />
      <Route path="/blog/:slug" element={<PostPage />} />
    </Routes>
  );
}

function HomePage() {
  const { t, lang } = useLang();
  const [contact, setContact] = useState<{ email: string; github: string; linkedin: string } | null>(null);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    // Só usamos o servidor para os links de contato
    executeGetPortfolioData().then((data: any) => {
      if (data?.contact) setContact(data.contact);
    }).catch(() => { });

    // Contador de visitantes (uma vez por sessão)
    const hasVisited = sessionStorage.getItem('portfolio_visited');
    if (!hasVisited) {
      executeIncrementVisitorCount().then(count => {
        if (count !== null) {
          setVisitorCount(count);
          sessionStorage.setItem('portfolio_visited', 'true');
        }
      }).catch(() => { });
    } else {
      executeGetVisitorCount().then(count => {
        if (count !== null) setVisitorCount(count);
      }).catch(() => { });
    }
  }, []);

  const email = contact?.email ?? 'pontesvilasboas@gmail.com';
  const githubUrl = contact?.github ?? 'https://github.com';
  const linkedinUrl = contact?.linkedin ?? 'https://linkedin.com';

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 selection:bg-zinc-200 dark:selection:bg-zinc-700">
      <div className="max-w-3xl mx-auto px-6 py-24 space-y-20">

        {/* 1. HERO */}
        <header className="space-y-6">
          {/* Controles: tema + idioma e contador de visitantes */}
          <div className="flex flex-wrap items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <LangToggle />
            </div>
            {visitorCount !== null && (
              <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/50 rounded-full px-3 py-1 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {visitorCount} {t.nav.views}
              </span>
            )}
          </div>

          <div>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
              {t.hero.name}
            </h1>
            <h2 className="text-xl md:text-2xl font-light text-zinc-500 dark:text-zinc-400 mt-2">
              {t.hero.title}
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-2xl">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-mono">
              {lang === 'pt' ? 'Email para contato:' : 'Contact email:'}{' '}
              <a
                href={`mailto:${email}`}
                className="text-zinc-900 dark:text-zinc-100 underline underline-offset-4 hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors"
              >
                {email}
              </a>
            </p>
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-6 py-2 rounded-md hover:border-zinc-900 dark:hover:border-zinc-400 transition-colors text-sm font-medium"
            >
              {t.nav.github}
            </a>
            <a
              href="/CV_Matheus_Vilas_Boas.pdf"
              download="CV_Matheus_Vilas_Boas.pdf"
              className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-6 py-2 rounded-md hover:border-zinc-900 dark:hover:border-zinc-400 transition-colors text-sm font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-zinc-500 dark:text-zinc-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              {t.nav.downloadCv}
            </a>
          </div>
        </header>

        {/* 2. GITHUB */}
        <GitHubSection />

        {/* 3. BACKGROUND & STACK */}
        <section className="space-y-8">
          <h3 className="text-sm font-semibold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
            {t.about.sectionTitle}
          </h3>
          <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{t.about.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-4">
              <h4 className="font-medium text-zinc-900 dark:text-zinc-100">{t.about.educationTitle}</h4>
              <ul className="space-y-3">
                {t.about.education.map((edu, i) => (
                  <li key={i} className="text-sm">
                    <span className="block text-zinc-900 dark:text-zinc-100 font-medium">{edu.degree}</span>
                    <span className="text-zinc-500 dark:text-zinc-400">{edu.institution} • {edu.date}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-zinc-900 dark:text-zinc-100">{t.about.stackTitle}</h4>
              <div className="flex flex-wrap gap-2">
                {t.about.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. BLOG */}
        <BlogSection />

        {/* 5. PALESTRAS */}
        <section className="space-y-8">
          <h3 className="text-sm font-semibold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
            {t.talks.sectionTitle}
          </h3>
          <div className="space-y-6">
            {t.talks.items.map((talk) => (
              <div
                key={talk.id}
                className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 p-6 rounded-lg"
              >
                <h4 className="font-medium text-lg mb-1 text-zinc-900 dark:text-zinc-100">{talk.title}</h4>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-4 font-mono">
                  {talk.event} • {talk.location} ({talk.date})
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{talk.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. FOOTER */}
        <footer
          id="contato"
          className="pt-12 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} Matheus Vilas-Boas.
          </p>
          <div className="flex gap-6 text-sm font-medium">
            <a href={`mailto:${email}`} className="hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors">
              {t.footer.email}
            </a>
            <a href={linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors">
              {t.footer.linkedin}
            </a>
          </div>
        </footer>

      </div>
    </div>
  );
}