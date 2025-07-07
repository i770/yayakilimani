import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactElement<LucideIcon>;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  bgColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  change, 
  trend = 'neutral',
  bgColor = 'bg-white'
}) => {
  return (
    <div className={`card ${bgColor} p-6 animate-fade-in`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          
          {change && (
            <div className="flex items-center mt-2">
              <span 
                className={`text-xs font-medium ${
                  trend === 'up' ? 'text-success-700' : 
                  trend === 'down' ? 'text-error-700' : 
                  'text-gray-500'
                }`}
              >
                {change}
              </span>
            </div>
          )}
        </div>
        
        <div className="p-3 rounded-full bg-primary-50 text-primary-600">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;