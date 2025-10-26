
import React from 'react';
import { Metric } from '../types';

interface DashboardCardProps {
  metric: Metric;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ metric }) => {
  const Icon = metric.icon;
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex-grow">
          <h3 className="text-sm font-medium text-gray-500 truncate">{metric.title}</h3>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{metric.value}</p>
        </div>
        <div className="bg-blue-100 p-3 rounded-full">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
      {metric.description && <p className="text-xs text-gray-400 mt-2">{metric.description}</p>}
    </div>
  );
};
