import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';
import type { BlogPost } from '../domain/BlogPost.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, '../../data/posts.json');

async function readPosts(): Promise<BlogPost[]> {
    try {
        const raw = await readFile(DATA_PATH, 'utf-8');
        return JSON.parse(raw) as BlogPost[];
    } catch {
        return [];
    }
}

async function writePosts(posts: BlogPost[]): Promise<void> {
    await writeFile(DATA_PATH, JSON.stringify(posts, null, 2), 'utf-8');
}

export class GetBlogPostsUseCase {
    async execute(): Promise<Omit<BlogPost, 'content'>[]> {
        const posts = await readPosts();
        return posts
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
            .map(({ content: _content, ...rest }) => rest);
    }
}

export class GetBlogPostBySlugUseCase {
    async execute(slug: string): Promise<BlogPost | null> {
        const posts = await readPosts();
        return posts.find(p => p.slug === slug) ?? null;
    }
}

export interface CreatePostInput {
    title: string;
    summary: string;
    content: string;
    tags: string[];
    readingTimeMin: number;
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

export class CreateBlogPostUseCase {
    async execute(input: CreatePostInput): Promise<BlogPost> {
        const posts = await readPosts();

        const baseSlug = slugify(input.title);
        // garantir slug único
        let slug = baseSlug;
        let counter = 2;
        while (posts.some(p => p.slug === slug)) {
            slug = `${baseSlug}-${counter++}`;
        }

        const post: BlogPost = {
            id: randomUUID(),
            slug,
            title: input.title,
            summary: input.summary,
            content: input.content,
            tags: input.tags,
            readingTimeMin: input.readingTimeMin,
            publishedAt: new Date().toISOString(),
        };

        posts.push(post);
        await writePosts(posts);
        return post;
    }
}
