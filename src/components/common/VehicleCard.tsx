import React from 'react';
import { Vehicle } from '../../types';
import StatusBadge from './StatusBadge';
import { Calendar, Users, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick?: (vehicle: Vehicle) => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onClick }) => {
  return (
    <div 
      className="card hover:cursor-pointer animate-fade-in"
      onClick={() => onClick && onClick(vehicle)}
    >
      <div className="h-44 overflow-hidden">
        <img 
          src={vehicle.image || 'https://images.pexels.com/photos/385998/pexels-photo-385998.jpeg'} 
          alt={`${vehicle.model}`} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{vehicle.model}</h3>
          <StatusBadge status={vehicle.status} size="sm" />
        </div>
        <p className="text-gray-600 text-sm mb-3">{vehicle.registrationNo}</p>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1 text-gray-500">
            <Calendar size={14} />
            <span>{vehicle.year}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <TrendingUp size={14} />
            <span>{vehicle.fuelEfficiency ? `${vehicle.fuelEfficiency} km/l` : 'N/A'}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-500">
              <Users size={16} className="mr-1" />
              <span className="text-sm">
                {vehicle.route}
              </span>
            </div>
            
            {vehicle.nextMaintenance && (
              <div className="text-xs text-gray-500">
                Next service: {format(vehicle.nextMaintenance, 'MMM d')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;