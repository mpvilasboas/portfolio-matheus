import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, '../../data/visitors.json');

interface VisitorData {
    count: number;
}

async function readData(): Promise<VisitorData> {
    try {
        const raw = await readFile(DATA_PATH, 'utf-8');
        return JSON.parse(raw) as VisitorData;
    } catch {
        return { count: 0 };
    }
}

async function writeData(data: VisitorData): Promise<void> {
    await writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export class GetVisitorCountUseCase {
    async execute(): Promise<number> {
        const data = await readData();
        return data.count;
    }
}

export class IncrementVisitorCountUseCase {
    async execute(): Promise<number> {
        const data = await readData();
        data.count += 1;
        await writeData(data);
        return data.count;
    }
}
