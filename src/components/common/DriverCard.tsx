import React from 'react';
import { Driver } from '../../types';
import StatusBadge from './StatusBadge';
import { Calendar, PhoneCall, Bus } from 'lucide-react';
import { format } from 'date-fns';

interface DriverCardProps {
  driver: Driver;
  onClick?: (driver: Driver) => void;
}

const DriverCard: React.FC<DriverCardProps> = ({ driver, onClick }) => {
  return (
    <div 
      className="card hover:cursor-pointer animate-fade-in"
      onClick={() => onClick && onClick(driver)}
    >
      <div className="flex items-center p-4">
        <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
          <img 
            src={driver.photo || 'https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg'} 
            alt={driver.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-semibold">{driver.name}</h3>
          <p className="text-gray-500 text-sm">{driver.licenseNo}</p>
        </div>
        <div className="ml-auto">
          <StatusBadge status={driver.status} size="sm" />
        </div>
      </div>
      
      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div className="flex items-center gap-1 text-gray-500">
            <PhoneCall size={14} />
            <span>{driver.phoneNumber}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <Calendar size={14} />
            <span>Exp: {format(driver.licenseExpiry, 'MMM d, yyyy')}</span>
          </div>
          {driver.assignedVehicle && (
            <div className="col-span-2 flex items-center gap-1 text-gray-500 mt-1">
              <Bus size={14} />
              <span>Assigned to vehicle: {driver.assignedVehicle}</span>
            </div>
          )}
        </div>
        
        {driver.certifications.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex flex-wrap gap-1">
              {driver.certifications.map((cert, index) => (
                <span 
                  key={index}
                  className="text-xs bg-secondary-50 text-secondary-700 px-2 py-0.5 rounded-full"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverCard;