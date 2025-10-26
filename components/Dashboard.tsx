
import React from 'react';
import { CavalcanteData } from '../types';
import { DashboardCard } from './DashboardCard';

interface DashboardProps {
  data: CavalcanteData;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="mb-12">
    <h2 className="text-2xl font-bold text-gray-700 border-b-2 border-blue-200 pb-2 mb-6">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {children}
    </div>
  </section>
);

export const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  return (
    <div>
      <Section title="Saúde">
        {data.health.map(metric => <DashboardCard key={metric.title} metric={metric} />)}
      </Section>
      <Section title="Educação">
        {data.education.map(metric => <DashboardCard key={metric.title} metric={metric} />)}
      </Section>
      <Section title="Segurança Pública">
        {data.publicSafety.map(metric => <DashboardCard key={metric.title} metric={metric} />)}
      </Section>
      <Section title="Saneamento Básico">
        {data.sanitation.map(metric => <DashboardCard key={metric.title} metric={metric} />)}
      </Section>
      <Section title="Economia e Qualidade de Vida">
        {data.economy.map(metric => <DashboardCard key={metric.title} metric={metric} />)}
        {data.qualityOfLife.map(metric => <DashboardCard key={metric.title} metric={metric} />)}
      </Section>
    </div>
  );
};
