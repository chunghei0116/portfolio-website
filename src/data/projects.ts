export interface Project {
  id: string;
  title: string;
  category: 'WebGL & 3D' | 'Full-Stack Apps' | 'DevOps & Cloud';
  description: string;
  metrics: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  colSpan: string;
  accent: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'cyber-shaders',
    title: 'CyberSpace GLSL Shader Engine',
    category: 'WebGL & 3D',
    description: 'Real-time WebGL audio-reactive particle engine with volumetric raymarched lighting and GPU instancing.',
    metrics: '60 FPS @ 4K Resolution',
    tech: ['Three.js', 'GLSL Shaders', 'WebAudio API', 'TypeScript'],
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    colSpan: 'col-span-12 lg:col-span-8',
    accent: '#00f0ff',
  },
  {
    id: 'devops-mesh',
    title: 'Kubeflow Cloud Observability',
    category: 'DevOps & Cloud',
    description: 'Distributed microservice telemetry dashboard tracking 10k+ container clusters in real-time.',
    metrics: '99.999% SLA Uptime',
    tech: ['Kubernetes', 'Go', 'Docker', 'Prometheus', 'Next.js'],
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    colSpan: 'col-span-12 lg:col-span-4',
    accent: '#a855f7',
  },
  {
    id: 'mobile-flutter-registry',
    title: 'Retro Flip Clock & Registry System',
    category: 'Full-Stack Apps',
    description: 'Tactile industrial mechanical split-flap display system with real-time sync and WebSockets backend.',
    metrics: '< 15ms Latency',
    tech: ['Next.js 16', 'React 19', 'WebSockets', 'TailwindCSS 4'],
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    colSpan: 'col-span-12 lg:col-span-5',
    accent: '#10b981',
  },
  {
    id: 'quantum-finance',
    title: 'Quantum Portfolio Arbitrage AI',
    category: 'Full-Stack Apps',
    description: 'AI-driven high-frequency algorithmic financial analysis pipeline with automated risk checklists.',
    metrics: '1.2M Events/sec',
    tech: ['Python', 'FastAPI', 'Redis', 'Next.js', 'Three.js'],
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    colSpan: 'col-span-12 lg:col-span-7',
    accent: '#38bdf8',
  },
];
