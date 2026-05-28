import 'dotenv/config';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { ProjectController } from './presentation/ProjectController.js';
import { BlogController } from './presentation/BlogController.js';
import { GithubController } from './presentation/GithubController.js';
import { VisitorController } from './presentation/VisitorController.js';

const app = express();

app.use(cors());
app.use(express.json());

// ── Auth middleware para rotas protegidas ──────────────────────────────────
function requireBlogSecret(req: Request, res: Response, next: NextFunction): void {
    const secret = process.env.BLOG_SECRET;

    if (!secret) {
        res.status(500).json({ error: 'BLOG_SECRET não configurado no servidor.' });
        return;
    }

    const token = req.headers['x-blog-token'];

    if (!token || token !== secret) {
        res.status(401).json({ error: 'Não autorizado.' });
        return;
    }

    next();
}

// ── Rotas ──────────────────────────────────────────────────────────────────
const projectController = new ProjectController();
app.get('/api/portfolio', (req, res) => projectController.handle(req, res));

const blogController = new BlogController();
app.get('/api/blog', (req, res) => blogController.list(req, res));
app.get('/api/blog/:slug', (req, res) => blogController.getBySlug(req, res));
app.post('/api/blog', requireBlogSecret, (req, res) => blogController.create(req, res));

const githubController = new GithubController();
app.get('/api/github/repos', (req, res) => githubController.repos(req, res));
app.get('/api/github/contributions', (req, res) => githubController.contributions(req, res));

const visitorController = new VisitorController();
app.get('/api/visitors', (req, res) => visitorController.get(req, res));
app.post('/api/visitors', (req, res) => visitorController.increment(req, res));

export default app;
