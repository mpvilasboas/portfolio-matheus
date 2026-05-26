import type { BlogPost, BlogPostSummary } from '../../domain/BlogPost';

const BASE = '/api/blog';

export async function fetchBlogPosts(): Promise<BlogPostSummary[]> {
    const res = await fetch(BASE);
    if (!res.ok) throw new Error('Falha ao buscar posts');
    return res.json();
}

export async function fetchBlogPost(slug: string): Promise<BlogPost> {
    const res = await fetch(`${BASE}/${slug}`);
    if (!res.ok) throw new Error('Post não encontrado');
    return res.json();
}

export interface CreatePostInput {
    title: string;
    summary: string;
    content: string;
    tags: string[];
    readingTimeMin: number;
}

export async function createBlogPost(input: CreatePostInput, token: string): Promise<BlogPost> {
    const res = await fetch(BASE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-blog-token': token,
        },
        body: JSON.stringify(input),
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as any).error ?? 'Erro ao criar post');
    }
    return res.json();
}

