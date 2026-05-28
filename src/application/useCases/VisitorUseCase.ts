export async function executeGetVisitorCount(): Promise<number | null> {
    try {
        const response = await fetch('/api/visitors');
        if (!response.ok) throw new Error('Falha na API');
        const data = await response.json();
        return data.count;
    } catch (error) {
        console.error("Erro ao obter contador de visitantes:", error);
        return null;
    }
}

export async function executeIncrementVisitorCount(): Promise<number | null> {
    try {
        const response = await fetch('/api/visitors', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error('Falha na API');
        const data = await response.json();
        return data.count;
    } catch (error) {
        console.error("Erro ao incrementar contador de visitantes:", error);
        return null;
    }
}
