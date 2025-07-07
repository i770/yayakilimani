import React, { ReactNode } from 'react';

interface DataCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}

const DataCard: React.FC<DataCardProps> = ({ 
  title, 
  children, 
  className = '',
  actions
}) => {
  return (
    <div className={`card animate-fade-in ${className}`}>
      <div className="p-5 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {actions && (
          <div className="flex items-center space-x-2">
            {actions}
          </div>
        )}
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );
};

export default DataCard;