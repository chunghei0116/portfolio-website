import type { PortfolioContent } from '@/types/portfolio';

export const portfolioContent = {
  experience: [
    {
      period: '2025 - Present',
      company: 'AS Watson Group',
      role: 'Mobile Application Developer',
      location: 'Hong Kong',
      image: '/helmet.jpg',
      imageAlt: 'An archival illustration of an ornate ancient Greek helmet.',
      summary:
        'Building enterprise retail experiences where polished interfaces meet demanding release operations.',
      tags: ['Flutter', 'Swift', 'Gradle', 'Shorebird'],
      achievements: [
        'Architect and maintain Flutter applications with native Swift and Gradle bridges for high-volume consumer use.',
        'Introduced Shorebird over-the-air hotpatching, moving critical fixes from a 3-5 day store cycle to under 15 minutes.',
        'Tune rendering, memory, and background messaging so the experience stays fluid across a wide device range.',
      ],
    },
    {
      period: '2023 - 2025',
      company: 'Major Infrastructure Group',
      role: 'Programmer, DevOps & Infrastructure',
      location: 'Hong Kong',
      image: '/infrastructure-editorial.png',
      imageAlt: 'An abstract technical landscape representing cloud infrastructure and delivery systems.',
      summary:
        'Created dependable delivery paths and observability foundations for production systems at infrastructure scale.',
      tags: ['GitLab CI', 'Argo CD', 'Kubernetes', 'AWS', 'ELK'],
      achievements: [
        'Engineered GitLab CI and Argo CD workflows for repeatable multi-environment Kubernetes deployments.',
        'Managed AWS services, ingress, networking, and automated TLS renewal across production environments.',
        'Built ELK telemetry pipelines and maintained PostgreSQL and SQL Server data foundations.',
      ],
    },
  ],
  capabilities: [
    {
      index: '01',
      title: 'Mobile products',
      summary:
        'Scalable Flutter applications with thoughtful architecture, native integrations, testing, and measured performance.',
      tools: ['Flutter', 'Swift', 'Gradle', 'Firebase'],
    },
    {
      index: '02',
      title: 'Delivery systems',
      summary:
        'Automated release paths that make frequent changes predictable, observable, and recoverable.',
      tools: ['GitHub Actions', 'GitLab CI', 'Argo CD', 'Shorebird'],
    },
    {
      index: '03',
      title: 'Cloud operations',
      summary:
        'Cloud foundations and telemetry that remain legible under traffic, team, and operational pressure.',
      tools: ['AWS', 'Kubernetes', 'NGINX', 'ELK', 'PostgreSQL'],
    },
  ],
  practices: [
    {
      title: 'Build',
      summary: 'Cross-platform mobile experiences with the native depth to handle the difficult edges.',
      detail: 'Architecture, native bridges, testing, performance, and behavior across real devices.',
      tools: ['Flutter', 'Swift', 'Gradle', 'Firebase'],
    },
    {
      title: 'Ship',
      summary: 'Delivery systems that make frequent releases predictable, observable, and recoverable.',
      detail: 'Repeatable pipelines, staged delivery, hotpatching, and deployment confidence.',
      tools: ['GitLab CI', 'Argo CD', 'Shorebird', 'Kubernetes'],
    },
    {
      title: 'Operate',
      summary: 'Cloud foundations that stay legible when traffic, teams, and operational pressure increase.',
      detail: 'Infrastructure, ingress, telemetry, databases, and clear operational feedback.',
      tools: ['AWS', 'NGINX', 'ELK', 'PostgreSQL'],
    },
  ],
  principles: [
    {
      title: 'Make speed safe.',
      body: 'The best release system shortens the path to users without making recovery harder.',
    },
    {
      title: 'Design for real devices.',
      body: 'A polished interface earns its finish on the slow phone, the weak network, and the busy day.',
    },
    {
      title: 'Keep systems readable.',
      body: 'Infrastructure should explain itself clearly enough that the next engineer can act with confidence.',
    },
  ],
} as const satisfies PortfolioContent;
