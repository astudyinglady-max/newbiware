import React from 'react';
import { Phone, Building2, Pill, Hospital } from 'lucide-react';

export type AgencyType = 'clinic' | 'pharmacy' | 'hospital';

interface AgencyCardProps {
  name: string;
  areas: string;
  phone?: string;
  types: AgencyType[];
  description?: string;
}

export const AgencyCard: React.FC<AgencyCardProps> = ({ name, areas, phone, types, description }) => {
  const getTypeColor = (type: AgencyType) => {
    switch (type) {
      case 'clinic': return 'bg-pink-500';
      case 'pharmacy': return 'bg-purple-500';
      case 'hospital': return 'bg-emerald-500';
      default: return 'bg-gray-400';
    }
  };

  const getTypeText = (type: AgencyType) => {
    switch (type) {
      case 'clinic': return '의원 전문';
      case 'pharmacy': return '약국 전문';
      case 'hospital': return '병원 전문 (헥톤프로젝트)';
      default: return '';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="flex flex-wrap gap-2 mb-4">
        {types.map((type) => (
          <span key={type} className={`px-2 py-1 rounded text-[10px] text-white font-medium flex items-center gap-1 ${getTypeColor(type)}`}>
            {type === 'clinic' && <Building2 size={12} />}
            {type === 'pharmacy' && <Pill size={12} />}
            {type === 'hospital' && <Hospital size={12} />}
            {getTypeText(type)}
          </span>
        ))}
      </div>
      
      <div className="mb-2">
        <h4 className="font-bold text-gray-900 mb-1">{name}</h4>
        <p className="text-sm text-gray-500 leading-relaxed">{areas}</p>
      </div>

      <div className="mt-auto pt-4 flex flex-col gap-2">
        {phone && (
          <div className="flex items-center gap-2 text-blue-600 font-medium">
            <Phone size={16} />
            <a href={`tel:${phone.split(',')[0]}`} className="hover:underline">{phone}</a>
          </div>
        )}
        {description && (
          <p className="text-xs text-gray-400 italic">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
