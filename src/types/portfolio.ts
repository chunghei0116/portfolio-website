export interface ExperienceItem {
  readonly period: string;
  readonly company: string;
  readonly role: string;
  readonly location: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly summary: string;
  readonly tags: readonly string[];
  readonly achievements: readonly string[];
}

export interface CapabilityItem {
  readonly index: string;
  readonly title: string;
  readonly summary: string;
  readonly tools: readonly string[];
}

export interface PracticeItem {
  readonly title: 'Build' | 'Ship' | 'Operate';
  readonly summary: string;
  readonly detail: string;
  readonly tools: readonly string[];
}

export interface PrincipleItem {
  readonly title: string;
  readonly body: string;
}

export interface PortfolioContent {
  readonly experience: readonly ExperienceItem[];
  readonly capabilities: readonly CapabilityItem[];
  readonly practices: readonly PracticeItem[];
  readonly principles: readonly PrincipleItem[];
}
