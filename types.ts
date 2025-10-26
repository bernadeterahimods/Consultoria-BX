// FIX: Import React to provide types for React.ComponentProps and JSX.Element
import React from 'react';

export interface Metric {
  title: string;
  value: string;
  // FIX: Changed JSX.Element to React.ReactElement to resolve "Cannot find namespace 'JSX'".
  icon: (props: React.ComponentProps<'svg'>) => React.ReactElement;
  description?: string;
}

export interface CavalcanteData {
  health: Metric[];
  education: Metric[];
  qualityOfLife: Metric[];
  economy: Metric[];
  publicSafety: Metric[];
  sanitation: Metric[];
}

export enum FeedbackCategory {
  SAUDE = 'Saúde',
  EDUCACAO = 'Educação',
  SEGURANCA = 'Segurança Pública',
  SANEAMENTO = 'Saneamento Básico',
  INFRAESTRUTURA = 'Infraestrutura',
  OUTRO = 'Outro',
}
