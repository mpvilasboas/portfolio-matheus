import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { GithubRepo, ContributionDay } from '../domain/Github';
import { fetchGithubRepos, fetchGithubContributions } from '../application/useCases/GetGithubDataUseCase';
import { useTheme } from '../context/ThemeContext';
import { useLang } from '../context/LangContext';

function langColor(lang: string | null): string {
  const map: Record<string, string> = {
    TypeScript: '#3178c6', JavaScript: '#f7df1e', Python: '#3776ab',
    PHP: '#777bb4', 'C++': '#f34b7d', Go: '#00add8', Rust: '#dea584',
    HTML: '#e34c26', CSS: '#563d7c', Java: '#b07219', Ruby: '#701516',
  };
  return lang ? (map[lang] ?? '#a1a1aa') : '#a1a1aa';
}

function ContributionHeatmap({ days }: { days: ContributionDay[] }) {
  const { dark } = useTheme();
  const { t } = useLang();

  const LEVEL_COLORS_LIGHT = ['#e4e4e7', '#bbf7d0', '#4ade80', '#16a34a', '#14532d'];
  const LEVEL_COLORS_DARK  = ['#27272a', '#bbf7d0', '#4ade80', '#16a34a', '#14532d'];
  const colors = dark ? LEVEL_COLORS_DARK : LEVEL_COLORS_LIGHT;

  if (days.length === 0) return null;

  const weeks: ContributionDay[][] = [];
  let week: ContributionDay[] = [];

  const firstDay = new Date(days[0].date).getDay();
  for (let i = 0; i < firstDay; i++) week.push({ date: '', count: 0, level: 0 });
  for (const day of days) {
    week.push(day);
    if (week.length === 7) { weeks.push(week); week = []; }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push({ date: '', count: 0, level: 0 });
    weeks.push(week);
  }

  const total = days.reduce((s, d) => s + d.count, 0);
  const weekDays = ['Sun', '', 'Tue', '', 'Thu', '', 'Sat'];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
          {total} {t.github.contributionsSuffix}
        </p>
        <div className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500 font-mono">
          <span>{t.github.less}</span>
          {colors.map((c, i) => (
            <span key={i} className="w-2.5 h-2.5 rounded-sm inline-block" style={{ backgroundColor: c }} />
          ))}
          <span>{t.github.more}</span>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto pb-1">
        <div className="flex flex-col gap-0.5 mr-1 shrink-0">
          {weekDays.map((d, i) => (
            <div key={i} className="h-2.5 text-[9px] text-zinc-400 dark:text-zinc-600 leading-none flex items-center">{d}</div>
          ))}
        </div>
        {weeks.map((w, wi) => (
          <div key={wi} className="flex flex-col gap-0.5 shrink-0">
            {w.map((day, di) => (
              <div
                key={di}
                title={day.date ? `${day.date}: ${day.count}` : ''}
                className="w-2.5 h-2.5 rounded-sm transition-opacity hover:opacity-70"
                style={{ backgroundColor: colors[day.level] }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function RepoCard({ repo }: { repo: GithubRepo }) {
  const { t } = useLang();
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="group block bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-lg p-5 hover:border-zinc-900 dark:hover:border-zinc-500 transition-all duration-200 hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-medium text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors truncate">
          {repo.name}
        </h4>
        <svg className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-500 transition-colors shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4 line-clamp-2 min-h-[2rem]">
        {repo.description ?? t.github.noDescription}
      </p>
      <div className="flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-500 font-mono">
        {repo.language && (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: langColor(repo.language) }} />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && <span>★ {repo.stargazers_count}</span>}
        {repo.forks_count > 0 && <span>⑂ {repo.forks_count}</span>}
      </div>
    </a>
  );
}

export function GitHubSection() {
  const { t } = useLang();
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    Promise.all([fetchGithubRepos(), fetchGithubContributions()])
      .then(([r, c]) => { setRepos(r); setContributions(c); })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <section className="space-y-8">
      <h3 className="text-sm font-semibold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">{t.github.sectionTitle}</h3>
      <p className="text-sm text-zinc-400 font-mono">{t.github.loading}</p>
    </section>
  );

  if (error) return null;

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">{t.github.sectionTitle}</h3>
        <a
          href={`https://github.com/${import.meta.env.VITE_GITHUB_USERNAME ?? ''}`}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-mono text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          {t.github.viewProfile}
        </a>
      </div>
      <ContributionHeatmap days={contributions} />
      {repos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {repos.map(repo => <RepoCard key={repo.id} repo={repo} />)}
        </div>
      )}
    </section>
  );
}
