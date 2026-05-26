export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    summary: string;
    content: string;    // Markdown ou HTML simples
    tags: string[];
    publishedAt: string; // ISO date string
    readingTimeMin: number;
}
