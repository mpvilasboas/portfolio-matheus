export interface BlogPostSummary {
    id: string;
    slug: string;
    title: string;
    summary: string;
    tags: string[];
    publishedAt: string;
    readingTimeMin: number;
}

export interface BlogPost extends BlogPostSummary {
    content: string;
}
