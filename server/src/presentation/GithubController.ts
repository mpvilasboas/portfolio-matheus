import type { Request, Response } from 'express';
import { GetGithubReposUseCase, GetGithubContributionsUseCase } from '../application/GetGithubDataUseCase.js';

export class GithubController {
    async repos(_req: Request, res: Response): Promise<void> {
        try {
            const data = await new GetGithubReposUseCase().execute();
            res.status(200).json(data);
        } catch (err: any) {
            res.status(500).json({ error: err.message ?? 'Erro ao buscar repos' });
        }
    }

    async contributions(_req: Request, res: Response): Promise<void> {
        try {
            const data = await new GetGithubContributionsUseCase().execute();
            res.status(200).json(data);
        } catch (err: any) {
            res.status(500).json({ error: err.message ?? 'Erro ao buscar contribuições' });
        }
    }
}
