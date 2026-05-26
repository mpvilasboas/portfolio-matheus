import 'dotenv/config';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { ProjectController } from './presentation/ProjectController.js';
import { BlogController } from './presentation/BlogController.js';
import { GithubController } from './presentation/GithubController.js';

const app = express();
const PORT = 3000;

app.use(cors({ origin: 'http://localhost:5173' }));
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

// ── Servir Frontend (Produção) ─────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../../dist');

app.use(express.static(distPath));

app.get('{*path}', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Backend rodando na porta ${PORT}`);
});