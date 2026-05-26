import type { Request, Response } from 'express';
import {
    GetBlogPostsUseCase,
    GetBlogPostBySlugUseCase,
    CreateBlogPostUseCase,
    type CreatePostInput,
} from '../application/GetBlogPostsUseCase.js';

export class BlogController {
    async list(_req: Request, res: Response): Promise<void> {
        try {
            const posts = await new GetBlogPostsUseCase().execute();
            res.status(200).json(posts);
        } catch {
            res.status(500).json({ error: 'Erro interno' });
        }
    }

    async getBySlug(req: Request, res: Response): Promise<void> {
        try {
            const post = await new GetBlogPostBySlugUseCase().execute(req.params.slug);
            if (!post) {
                res.status(404).json({ error: 'Post não encontrado' });
                return;
            }
            res.status(200).json(post);
        } catch {
            res.status(500).json({ error: 'Erro interno' });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const { title, summary, content, tags, readingTimeMin } = req.body as CreatePostInput;

            if (!title || !summary || !content) {
                res.status(400).json({ error: 'title, summary e content são obrigatórios' });
                return;
            }

            const post = await new CreateBlogPostUseCase().execute({
                title: String(title).trim(),
                summary: String(summary).trim(),
                content: String(content),
                tags: Array.isArray(tags) ? tags : [],
                readingTimeMin: Number(readingTimeMin) || 1,
            });

            res.status(201).json(post);
        } catch {
            res.status(500).json({ error: 'Erro ao criar post' });
        }
    }
}
