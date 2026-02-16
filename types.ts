
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  SAFETY_SOP = 'SAFETY_SOP',
  MENU_MANAGEMENT = 'MENU_MANAGEMENT',
  FINANCIAL_MANAGEMENT = 'FINANCIAL_MANAGEMENT',
  TRAINING = 'TRAINING',
  CRITIQUE_AI = 'CRITIQUE_AI'
}

export interface KPI {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  description: string;
}

export interface SOP {
  id: string;
  title: string;
  category: string;
  description: string;
  steps: string[];
}

export interface TrainingModule {
  id: string;
  title: string;
  team: 'Cozinha' | 'Salão' | 'Gerência' | 'Geral';
  duration: string;
  status: 'Pendente' | 'Em Progresso' | 'Concluído';
}
