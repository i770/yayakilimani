import React, { useState } from 'react';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  Bus, 
  ArrowDownUp,
  CircleDashed 
} from 'lucide-react';
import { vehicles } from '../data/mockData';
import VehicleCard from '../components/common/VehicleCard';
import { Table, TableRow, TableCell } from '../components/common/Table';
import StatusBadge from '../components/common/StatusBadge';
import TabNavigation from '../components/common/TabNavigation';
import { Vehicle } from '../types';
import { format } from 'date-fns';

const VehicleRegistry: React.FC = () => {
  const [activeTab, setActiveTab] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  
  // Filter vehicles based on search query
  const filteredVehicles = vehicles.filter(vehicle => 
    vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.registrationNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { id: 'grid', label: 'Grid View' },
    { id: 'list', label: 'List View' },
  ];

  const handleVehicleClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold">Vehicle Registry</h2>
        <button className="btn-primary flex items-center">
          <PlusCircle size={20} className="mr-2" />
          Add Vehicle
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
          <div className="w-full md:w-1/2 relative">
            <input
              type="text"
              placeholder="Search vehicles..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
          <div className="flex space-x-2">
            <button className="btn-outline flex items-center">
              <Filter size={18} className="mr-2" />
              Filter
            </button>
            <button className="btn-outline flex items-center">
              <ArrowDownUp size={18} className="mr-2" />
              Sort
            </button>
          </div>
        </div>

        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {filteredVehicles.length > 0 ? (
          activeTab === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVehicles.map(vehicle => (
                <VehicleCard 
                  key={vehicle.id} 
                  vehicle={vehicle} 
                  onClick={handleVehicleClick}
                />
              ))}
            </div>
          ) : (
            <Table headers={['Vehicle', 'Registration', 'Status', 'Assigned Driver', 'Route', 'Last Maintenance', 'Next Maintenance']}>
              {filteredVehicles.map(vehicle => (
                <TableRow key={vehicle.id} onClick={() => handleVehicleClick(vehicle)}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full overflow-hidden">
                        <img 
                          src={vehicle.image || 'https://images.pexels.com/photos/385998/pexels-photo-385998.jpeg'} 
                          alt={vehicle.model} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{vehicle.model}</div>
                        <div className="text-xs text-gray-500">{vehicle.year}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-900">{vehicle.registrationNo}</div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={vehicle.status} />
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-900">
                      {vehicle.assignedDriver || 'Unassigned'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-900">{vehicle.route}</div>
                  </TableCell>
                  <TableCell>
                    {vehicle.lastMaintenance ? format(vehicle.lastMaintenance, 'MMM d, yyyy') : 'N/A'}
                  </TableCell>
                  <TableCell>
                    {vehicle.nextMaintenance ? format(vehicle.nextMaintenance, 'MMM d, yyyy') : 'N/A'}
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          )
        ) : (
          <div className="text-center py-10">
            <Bus className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No vehicles found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>

      {selectedVehicle && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{selectedVehicle.model}</h2>
                  <p className="text-gray-600">{selectedVehicle.registrationNo}</p>
                </div>
                <StatusBadge status={selectedVehicle.status} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img 
                    src={selectedVehicle.image || 'https://images.pexels.com/photos/385998/pexels-photo-385998.jpeg'} 
                    alt={selectedVehicle.model} 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  
                  <div className="mt-6 space-y-4">
                    <h3 className="text-lg font-semibold">Details</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Year</p>
                        <p className="font-medium">{selectedVehicle.year}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Route</p>
                        <p className="font-medium">{selectedVehicle.route}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Chassis No</p>
                        <p className="font-medium">{selectedVehicle.chassisNo}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Engine No</p>
                        <p className="font-medium">{selectedVehicle.engineNo}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Assigned Driver</p>
                        <p className="font-medium">{selectedVehicle.assignedDriver || 'Unassigned'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Fuel Efficiency</p>
                        <p className="font-medium">{selectedVehicle.fuelEfficiency ? `${selectedVehicle.fuelEfficiency} km/l` : 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Maintenance Schedule</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Last Maintenance</p>
                          <p className="font-medium">
                            {selectedVehicle.lastMaintenance 
                              ? format(selectedVehicle.lastMaintenance, 'MMM d, yyyy') 
                              : 'N/A'}
                          </p>
                        </div>
                        <CircleDashed className="text-secondary-600" size={24} />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Next Maintenance</p>
                          <p className="font-medium">
                            {selectedVehicle.nextMaintenance 
                              ? format(selectedVehicle.nextMaintenance, 'MMM d, yyyy') 
                              : 'N/A'}
                          </p>
                        </div>
                        <CircleDashed className="text-primary-600" size={24} />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <p className="text-sm font-medium">Routine maintenance and oil change</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {selectedVehicle.lastMaintenance 
                            ? format(selectedVehicle.lastMaintenance, 'MMM d, yyyy') 
                            : 'N/A'}
                        </p>
                      </div>
                      
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <p className="text-sm font-medium">Fuel refill - 50 liters</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {format(new Date(new Date().setDate(new Date().getDate() - 2)), 'MMM d, yyyy')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button 
                  className="btn-outline"
                  onClick={() => setSelectedVehicle(null)}
                >
                  Close
                </button>
                <button className="btn-primary">
                  Edit Vehicle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleRegistry;