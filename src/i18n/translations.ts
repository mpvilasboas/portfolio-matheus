export type Lang = 'pt' | 'en';

const pt = {
  // ── Global ────────────────────────────────────────────────────────────────
  loading: 'Carregando portfólio...',
  darkMode: 'Escuro',
  lightMode: 'Claro',

  // ── Navegação / botões comuns ──────────────────────────────────────────
  nav: {
    backHome: '← Início',
    backPortfolio: '← Voltar ao portfólio',
    backBlog: '← Blog',
    contact: 'Entrar em contato',
    github: 'GitHub',
  },

  // ── Hero ──────────────────────────────────────────────────────────────────
  hero: {
    name: 'Matheus Vilas-Boas',
    title: 'Engenharia de Software Escalável & Soluções em IA',
    subtitle:
      'Bacharel em Ciência da Computação focado na construção de arquiteturas robustas, Clean Code e automação inteligente.',
  },

  // ── About ─────────────────────────────────────────────────────────────────
  about: {
    sectionTitle: 'Background & Stack',
    description:
      'Com base acadêmica internacional e experiência em modernização de sistemas complexos, atuo no desenvolvimento de ponta a ponta. Priorizo ambientes Linux (Ubuntu/WSL) e metodologias limpas para garantir manutenibilidade. Disponível para contratos B2B (MEI) e projetos globais.',
    educationTitle: 'Formação',
    stackTitle: 'Tecnologias',
    education: [
      { degree: 'BSc em Ciência da Computação', institution: 'UNITALO', date: 'Fevereiro 2026' },
      { degree: 'Diploma IB', institution: 'Rivers International School', date: 'Holanda' },
    ],
    stack: ['React', 'Node.js', 'Next.js', 'Laravel', 'PHP', 'TypeScript', 'Tailwind', 'Docker'],
  },

  // ── GitHub ────────────────────────────────────────────────────────────────
  github: {
    sectionTitle: 'Open Source',
    viewProfile: 'Ver perfil →',
    contributionsSuffix: 'contribuições no último ano',
    less: 'Menos',
    more: 'Mais',
    noDescription: 'Sem descrição',
    loading: 'Carregando dados do GitHub...',
  },

  // ── Blog ─────────────────────────────────────────────────────────────────
  blog: {
    sectionTitle: 'Blog',
    seeAll: 'Ver todos →',
    readingTimeSuffix: 'min de leitura',
    loadingPosts: 'Carregando posts...',
    noPosts: 'Nenhum post publicado ainda.',
    newPost: '+ Novo Post',
    pageTitle: 'Blog',
    pageSubtitle: 'Artigos sobre engenharia de software, arquitetura e IA.',
    notFound: 'Post não encontrado.',
    loadingPost: 'Carregando...',
    backToPortfolio: '← Voltar ao portfólio',
    writtenIn: 'Post escrito em português.',
  },

  // ── Talks ─────────────────────────────────────────────────────────────────
  talks: {
    sectionTitle: 'Palestras & Eventos',
    items: [
      {
        id: '1',
        title: 'Segurança Digital e Prevenção contra Golpes com IA',
        event: 'Palestra Aberta',
        location: 'Concórdia, SC',
        date: 'Março 2026',
        description:
          'Apresentação focada em educar o público sobre as novas ameaças digitais geradas por IA e como estabelecer protocolos de segurança.',
      },
    ],
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    email: 'Email',
    linkedin: 'LinkedIn',
  },

  // ── New Post ──────────────────────────────────────────────────────────────
  newPost: {
    restricted: 'Área restrita',
    restrictedSub: 'Digite a senha para criar um post.',
    passwordPlaceholder: 'Senha',
    enterBtn: 'Entrar',
    pageTitle: 'Novo Post',
    editBtn: 'Editar',
    previewBtn: 'Preview',
    logoutBtn: 'Sair',
    titleLabel: 'Título',
    titlePlaceholder: 'Título do post',
    summaryLabel: 'Resumo',
    summaryPlaceholder: 'Uma frase que descreve o post...',
    tagsLabel: 'Tags',
    tagsHint: '(separadas por vírgula)',
    tagsPlaceholder: 'React, Node.js, Arquitetura',
    contentLabel: 'Conteúdo',
    contentHint: '(HTML)',
    contentPlaceholder: '<h2>Introdução</h2>\n<p>Escreva aqui o conteúdo do post em HTML.</p>',
    readingTimePrefix: '~',
    requiredError: 'Título, resumo e conteúdo são obrigatórios.',
    publishing: 'Publicando...',
    publishBtn: 'Publicar post',
    cancelBtn: 'Cancelar',
    previewTitlePlaceholder: 'Título do post',
    previewSummaryPlaceholder: 'Resumo do post...',
  },
};

const en: typeof pt = {
  // ── Global ────────────────────────────────────────────────────────────────
  loading: 'Loading portfolio...',
  darkMode: 'Dark',
  lightMode: 'Light',

  // ── Navigation ────────────────────────────────────────────────────────────
  nav: {
    backHome: '← Home',
    backPortfolio: '← Back to portfolio',
    backBlog: '← Blog',
    contact: 'Get in touch',
    github: 'GitHub',
  },

  // ── Hero ──────────────────────────────────────────────────────────────────
  hero: {
    name: 'Matheus Vilas-Boas',
    title: 'Scalable Software Engineering & AI Solutions',
    subtitle:
      'Computer Science graduate focused on building robust architectures, Clean Code and intelligent automation.',
  },

  // ── About ─────────────────────────────────────────────────────────────────
  about: {
    sectionTitle: 'Background & Stack',
    description:
      'With an international academic background and hands-on experience modernizing complex systems, I work across the full stack. I prioritize Linux environments (Ubuntu/WSL) and clean methodologies to ensure long-term maintainability. Available for B2B contracts and global projects.',
    educationTitle: 'Education',
    stackTitle: 'Technologies',
    education: [
      { degree: 'BSc in Computer Science', institution: 'UNITALO', date: 'February 2026' },
      { degree: 'IB Diploma', institution: 'Rivers International School', date: 'Netherlands' },
    ],
    stack: ['React', 'Node.js', 'Next.js', 'Laravel', 'PHP', 'TypeScript', 'Tailwind', 'Docker'],
  },

  // ── GitHub ────────────────────────────────────────────────────────────────
  github: {
    sectionTitle: 'Open Source',
    viewProfile: 'View profile →',
    contributionsSuffix: 'contributions in the last year',
    less: 'Less',
    more: 'More',
    noDescription: 'No description',
    loading: 'Loading GitHub data...',
  },

  // ── Blog ─────────────────────────────────────────────────────────────────
  blog: {
    sectionTitle: 'Blog',
    seeAll: 'See all →',
    readingTimeSuffix: 'min read',
    loadingPosts: 'Loading posts...',
    noPosts: 'No posts published yet.',
    newPost: '+ New Post',
    pageTitle: 'Blog',
    pageSubtitle: 'Articles on software engineering, architecture and AI.',
    notFound: 'Post not found.',
    loadingPost: 'Loading...',
    backToPortfolio: '← Back to portfolio',
    writtenIn: 'Post written in Portuguese.',
  },

  // ── Talks ─────────────────────────────────────────────────────────────────
  talks: {
    sectionTitle: 'Talks & Events',
    items: [
      {
        id: '1',
        title: 'Digital Security & AI Scam Prevention',
        event: 'Open Talk',
        location: 'Concórdia, SC — Brazil',
        date: 'March 2026',
        description:
          'A presentation focused on educating the public about new AI-driven digital threats and how to establish personal security protocols.',
      },
    ],
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    email: 'Email',
    linkedin: 'LinkedIn',
  },

  // ── New Post ──────────────────────────────────────────────────────────────
  newPost: {
    restricted: 'Restricted area',
    restrictedSub: 'Enter the password to create a post.',
    passwordPlaceholder: 'Password',
    enterBtn: 'Enter',
    pageTitle: 'New Post',
    editBtn: 'Edit',
    previewBtn: 'Preview',
    logoutBtn: 'Sign out',
    titleLabel: 'Title',
    titlePlaceholder: 'Post title',
    summaryLabel: 'Summary',
    summaryPlaceholder: 'One sentence describing the post...',
    tagsLabel: 'Tags',
    tagsHint: '(comma separated)',
    tagsPlaceholder: 'React, Node.js, Architecture',
    contentLabel: 'Content',
    contentHint: '(HTML)',
    contentPlaceholder: '<h2>Introduction</h2>\n<p>Write your post content here in HTML.</p>',
    readingTimePrefix: '~',
    requiredError: 'Title, summary and content are required.',
    publishing: 'Publishing...',
    publishBtn: 'Publish post',
    cancelBtn: 'Cancel',
    previewTitlePlaceholder: 'Post title',
    previewSummaryPlaceholder: 'Post summary...',
  },
};

export const translations: Record<Lang, typeof pt> = { pt, en };
export type Translations = typeof pt;
