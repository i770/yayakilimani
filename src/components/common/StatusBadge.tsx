import React from 'react';

type StatusType = 'Active' | 'Inactive' | 'In Repair' | 'Retired' | 'On Leave' | 'Scheduled' | 'In Progress' | 'Completed' | 'Pending' | 'Resolved';

interface StatusBadgeProps {
  status: StatusType;
  size?: 'sm' | 'md';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  let bgColor = '';
  let textColor = '';
  
  switch (status) {
    case 'Active':
      bgColor = 'bg-success-50';
      textColor = 'text-success-700';
      break;
    case 'Completed':
      bgColor = 'bg-success-50';
      textColor = 'text-success-700';
      break;
    case 'Resolved':
      bgColor = 'bg-success-50';
      textColor = 'text-success-700';
      break;
    case 'In Repair':
      bgColor = 'bg-warning-50';
      textColor = 'text-warning-700';
      break;
    case 'On Leave':
      bgColor = 'bg-warning-50';
      textColor = 'text-warning-700';
      break;
    case 'In Progress':
      bgColor = 'bg-warning-50';
      textColor = 'text-warning-700';
      break;
    case 'Pending':
      bgColor = 'bg-warning-50';
      textColor = 'text-warning-700';
      break;
    case 'Inactive':
      bgColor = 'bg-error-50';
      textColor = 'text-error-700';
      break;
    case 'Retired':
      bgColor = 'bg-error-50';
      textColor = 'text-error-700';
      break;
    default:
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-700';
  }

  const sizeClasses = size === 'sm' 
    ? 'text-xs px-2 py-0.5' 
    : 'text-sm px-2.5 py-1';

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${bgColor} ${textColor} ${sizeClasses}`}>
      {status}
    </span>
  );
};

export default StatusBadge;