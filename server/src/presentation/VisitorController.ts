import type { Request, Response } from 'express';
import { GetVisitorCountUseCase, IncrementVisitorCountUseCase } from '../application/VisitorUseCase.js';

export class VisitorController {
    async get(req: Request, res: Response): Promise<void> {
        try {
            const count = await new GetVisitorCountUseCase().execute();
            res.status(200).json({ count });
        } catch {
            res.status(500).json({ error: 'Erro interno ao obter visitantes' });
        }
    }

    async increment(req: Request, res: Response): Promise<void> {
        try {
            const count = await new IncrementVisitorCountUseCase().execute();
            res.status(200).json({ count });
        } catch {
            res.status(500).json({ error: 'Erro interno ao incrementar visitantes' });
        }
    }
}
