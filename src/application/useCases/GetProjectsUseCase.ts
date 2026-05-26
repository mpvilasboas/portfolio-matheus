export async function executeGetPortfolioData(): Promise<any> {
    try {
        const response = await fetch('/api/portfolio');
        if (!response.ok) throw new Error('Falha na API');
        return await response.json();
    } catch (error) {
        console.error("Erro na API, confira se o Node está rodando:", error);
        return null;
    }
}