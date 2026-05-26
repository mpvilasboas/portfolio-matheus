import type { GithubRepo, ContributionDay } from '../domain/Github.js';

// ── Cache simples em memória (TTL: 1h) ────────────────────────────────────
const cache = new Map<string, { data: unknown; expiresAt: number }>();

async function cachedFetch<T>(
    url: string,
    headers: Record<string, string> = {},
    ttlMs = 60 * 60 * 1000,
): Promise<T> {
    const now = Date.now();
    const cached = cache.get(url);
    if (cached && cached.expiresAt > now) return cached.data as T;

    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${url}`);

    const data = await res.json() as T;
    cache.set(url, { data, expiresAt: now + ttlMs });
    return data;
}

function githubHeaders(): Record<string, string> {
    const token = process.env.GITHUB_TOKEN;
    return token ? { Authorization: `Bearer ${token}` } : {};
}

// ── Repos públicos (sem forks, ordenados por estrelas) ────────────────────
export class GetGithubReposUseCase {
    async execute(): Promise<GithubRepo[]> {
        const username = process.env.GITHUB_USERNAME;
        if (!username) throw new Error('GITHUB_USERNAME não configurado');

        const all = await cachedFetch<GithubRepo[]>(
            `https://api.github.com/users/${username}/repos?per_page=100&type=owner`,
            githubHeaders(),
        );

        return all
            .filter(r => !(r as any).fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6);
    }
}

// ── Heatmap de contribuições (último ano) ─────────────────────────────────
export class GetGithubContributionsUseCase {
    async execute(): Promise<ContributionDay[]> {
        const username = process.env.GITHUB_USERNAME;
        if (!username) throw new Error('GITHUB_USERNAME não configurado');

        const data = await cachedFetch<{ contributions: ContributionDay[] }>(
            `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
        );

        return data.contributions;
    }
}
