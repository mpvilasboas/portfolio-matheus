export class GetPortfolioDataUseCase {
    async execute() {
        return {
            hero: {
                name: "Matheus Vilas-Boas",
                title: "Engenharia de Software & Soluções em IA",
                subtitle: "Bacharel em Ciência da Computação focado na construção de arquiteturas robustas, Clean Code e automação inteligente.",
            },
            about: {
                description: "Com base acadêmica internacional e experiência em modernização de sistemas complexos, atuo no desenvolvimento de ponta a ponta. Priorizo ambientes Linux (Ubuntu/WSL) e metodologias limpas para garantir manutenibilidade. Disponível para contratos B2B (MEI) e projetos globais.",
                education: [
                    { degree: "BSc in Computer Science", institution: "UNITALO", date: "Fevereiro 2026" },
                    { degree: "IB Diploma", institution: "Rivers International School", date: "Holanda" }
                ],
                stack: ["React", "Node.js", "Next.js", "Laravel", "PHP", "TypeScript", "Tailwind", "Docker"]
            },
            cases: [
                {
                    id: "1",
                    title: "Modernização de ERP (Clean Architecture)",
                    context: "Sistemas de gestão corporativa lidam com regras de negócio críticas. O desafio era refatorar módulos legados para facilitar a manutenção e escalabilidade.",
                    solution: "Aplicação estrita de Clean Code, isolando regras em Use Cases, Value Objects e Independent Services, reduzindo o acoplamento do sistema.",
                    techStack: ["PHP", "Laravel", "TypeScript", "SQL"]
                },
                {
                    id: "2",
                    title: "Automação de Curadoria de Notícias com IA",
                    context: "Rádios matinais demandam curadoria ágil e precisa de notícias locais e globais em tempo real.",
                    solution: "Desenvolvimento de um produto (SaaS) do zero, integrando APIs de Inteligência Artificial para gerar scripts de rádio automatizados.",
                    techStack: ["React", "Node.js", "AI APIs", "Tailwind"]
                }
            ],
            talks: [
                {
                    id: "1",
                    title: "Segurança Digital e Prevenção contra Golpes com IA",
                    event: "Palestra Aberta",
                    location: "Concórdia, SC",
                    date: "Março 2026",
                    description: "Apresentação focada em educar o público sobre as novas ameaças digitais geradas por IA e como estabelecer protocolos de segurança."
                }
            ],
            contact: {
                email: "pontesvilasboas@gmail.com",
                github: "https://github.com/mpvilasboas",
                linkedin: "https://linkedin.com/in/pontesvilasboas"
            }
        };
    }
}