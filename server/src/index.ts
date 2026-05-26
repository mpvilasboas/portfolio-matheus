import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import app from './app.js';

const PORT = process.env.PORT || 3000;

// ── Servir Frontend (Produção local) ───────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../../dist');

app.use((await import('express')).default.static(distPath));

app.get('{*path}', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Backend rodando na porta ${PORT}`);
});