import React from 'react';
import { AgencyCard, AgencyType } from './AgencyCard';

interface AgencyData {
  name: string;
  areas: string;
  phone?: string;
  types: AgencyType[];
  description?: string;
}

interface RegionSectionProps {
  title: string;
  agencies: AgencyData[];
}

export const RegionSection: React.FC<RegionSectionProps> = ({ title, agencies }) => {
  return (
    <section className="py-12 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agencies.map((agency, idx) => (
          <AgencyCard 
            key={`${title}-${agency.name}-${idx}`}
            {...agency}
          />
        ))}
      </div>
    </section>
  );
};
