import type { Request, Response } from 'express';
import { GetPortfolioDataUseCase } from '../application/GetPortfolioDataUseCase.js';

export class ProjectController {
    async handle(req: Request, res: Response): Promise<void> {
        try {
            const getPortfolioData = new GetPortfolioDataUseCase();
            const data = await getPortfolioData.execute();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Erro interno' });
        }
    }
}