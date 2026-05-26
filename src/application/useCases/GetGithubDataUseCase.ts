import type { GithubRepo, ContributionDay } from '../../domain/Github';

const BASE = '/api/github';

export async function fetchGithubRepos(): Promise<GithubRepo[]> {
    const res = await fetch(`${BASE}/repos`);
    if (!res.ok) throw new Error('Falha ao buscar repos');
    return res.json();
}

export async function fetchGithubContributions(): Promise<ContributionDay[]> {
    const res = await fetch(`${BASE}/contributions`);
    if (!res.ok) throw new Error('Falha ao buscar contribuições');
    return res.json();
}
