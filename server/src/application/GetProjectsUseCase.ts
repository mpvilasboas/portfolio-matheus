import type { Project } from '../domain/Project.js';

export class GetProjectsUseCase {
    async execute(): Promise<Project[]> {
        return [
            {
                id: '1',
                title: 'Automação de Notícias',
                description: 'Sistema baseado em IA para curadoria e automação de scripts de notícias voltados para rádio matinal.',
                techStack: ['React', 'Node.js', 'Tailwind', 'AI API']
            },
            {
                id: '2',
                title: 'Arquitetura Clean Code ERP',
                description: 'Refatoração de módulos centrais de sistema de gestão, aplicando Use Cases e Value Objects.',
                techStack: ['PHP', 'Laravel', 'TypeScript', 'SQL']
            }
        ];
    }
}