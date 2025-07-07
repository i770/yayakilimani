import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import DataCard from '../components/dashboard/DataCard';
import ChartCard from '../components/dashboard/ChartCard';
import { Table, TableRow, TableCell } from '../components/common/Table';
import { 
  Bus, 
  Users, 
  DollarSign, 
  Fuel,
  Wrench,
  AlertTriangle,
  CalendarClock,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import { 
  dashboardStats, 
  fuelConsumptionData,
  expenseBreakdownData,
  monthlyExpenseTrendData, 
  vehicles, 
  maintenanceRecords 
} from '../data/mockData';
import { format } from 'date-fns';

const Dashboard: React.FC = () => {
  // Vehicles needing maintenance
  const vehiclesNeedingMaintenance = vehicles
    .filter(v => v.nextMaintenance && v.nextMaintenance <= new Date())
    .slice(0, 3);

  // Recent maintenance records
  const recentMaintenance = maintenanceRecords
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 3);
  
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Vehicles" 
          value={dashboardStats.totalVehicles} 
          icon={<Bus size={24} />}
          change={`${dashboardStats.activeVehicles} active`}
        />
        <StatCard 
          title="Total Drivers" 
          value={dashboardStats.totalDrivers} 
          icon={<Users size={24} />}
          change={`${dashboardStats.activeDrivers} active`}
        />
        <StatCard 
          title="Monthly Expenses" 
          value={`KES ${dashboardStats.totalExpensesThisMonth.toLocaleString()}`} 
          icon={<DollarSign size={24} />}
          change="+12% from last month"
          trend="up"
        />
        <StatCard 
          title="Fuel Efficiency" 
          value="8.5 km/l" 
          icon={<Fuel size={24} />}
          change="-5% from last month"
          trend="down"
        />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard 
            title="Monthly Expense Trend"
            data={monthlyExpenseTrendData}
            type="bar"
          />
        </div>
        <div>
          <ChartCard 
            title="Expense Breakdown"
            data={expenseBreakdownData}
            type="pie"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DataCard 
          title="Vehicles Needing Maintenance"
          actions={
            <button className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </button>
          }
        >
          {vehiclesNeedingMaintenance.length > 0 ? (
            <Table headers={['Vehicle', 'Status', 'Last Service', 'Next Service']}>
              {vehiclesNeedingMaintenance.map((vehicle) => (
                <TableRow key={vehicle.id}>
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
                        <div className="text-sm text-gray-500">{vehicle.registrationNo}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={vehicle.status} />
                  </TableCell>
                  <TableCell>
                    {vehicle.lastMaintenance ? format(vehicle.lastMaintenance, 'MMM d, yyyy') : 'N/A'}
                  </TableCell>
                  <TableCell className="text-error-600 font-medium">
                    {vehicle.nextMaintenance ? format(vehicle.nextMaintenance, 'MMM d, yyyy') : 'N/A'}
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          ) : (
            <div className="text-center py-6">
              <Wrench className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No pending maintenance</h3>
              <p className="mt-1 text-sm text-gray-500">All vehicles are up to date with their maintenance schedule.</p>
            </div>
          )}
        </DataCard>

        <DataCard 
          title="Recent Maintenance Activities"
          actions={
            <button className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </button>
          }
        >
          {recentMaintenance.length > 0 ? (
            <Table headers={['Vehicle', 'Service Type', 'Date', 'Status']}>
              {recentMaintenance.map((record) => {
                const vehicle = vehicles.find(v => v.id === record.vehicleId);
                return (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="ml-0">
                          <div className="text-sm font-medium text-gray-900">
                            {vehicle?.model || 'Unknown Vehicle'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {vehicle?.registrationNo || 'N/A'}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-900">{record.type}</div>
                      <div className="text-xs text-gray-500">
                        {record.description.length > 25 
                          ? `${record.description.substring(0, 25)}...` 
                          : record.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(record.date, 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={record.status} size="sm" />
                    </TableCell>
                  </TableRow>
                );
              })}
            </Table>
          ) : (
            <div className="text-center py-6">
              <Wrench className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No recent maintenance</h3>
              <p className="mt-1 text-sm text-gray-500">No maintenance activities have been recorded recently.</p>
            </div>
          )}
        </DataCard>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card col-span-1">
          <div className="p-5 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Fleet Status</h3>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Active Vehicles</span>
                  <span>{dashboardStats.activeVehicles}/{dashboardStats.totalVehicles}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-success-500 h-2.5 rounded-full" 
                    style={{ width: `${(dashboardStats.activeVehicles / dashboardStats.totalVehicles) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>In Repair</span>
                  <span>1/{dashboardStats.totalVehicles}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-warning-500 h-2.5 rounded-full" 
                    style={{ width: `${(1 / dashboardStats.totalVehicles) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Retired</span>
                  <span>1/{dashboardStats.totalVehicles}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-error-500 h-2.5 rounded-full" 
                    style={{ width: `${(1 / dashboardStats.totalVehicles) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Drivers</p>
                  <p className="text-xl font-semibold">{dashboardStats.activeDrivers}/{dashboardStats.totalDrivers}</p>
                </div>
                <Users className="h-8 w-8 text-secondary-500" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="card col-span-1">
          <div className="p-5 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Fuel Consumption</h3>
          </div>
          <div className="p-5">
            <div className="h-40">
              <ChartCard 
                title="" 
                data={fuelConsumptionData} 
                type="bar" 
                className="card-none" 
              />
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Average Efficiency</p>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold">8.5 km/l</p>
                    <span className="text-xs text-error-700 ml-2 flex items-center">
                      <TrendingUp size={12} className="transform rotate-225" />
                      -5%
                    </span>
                  </div>
                </div>
                <Fuel className="h-8 w-8 text-accent-500" />
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Monthly Cost</p>
                  <p className="text-lg font-semibold">KES {dashboardStats.fuelExpensesThisMonth.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-accent-500" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="card col-span-1">
          <div className="p-5 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Upcoming & Alerts</h3>
          </div>
          <div className="p-5">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-warning-50 flex items-center justify-center">
                  <CalendarClock className="h-5 w-5 text-warning-700" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Maintenance Due</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {dashboardStats.upcomingMaintenance} vehicles are due for maintenance within the next 15 days
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-error-50 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-error-700" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">License Expiry</p>
                  <p className="text-xs text-gray-500 mt-1">
                    1 driver's license is expiring in the next 30 days
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-secondary-50 flex items-center justify-center">
                  <Bus className="h-5 w-5 text-secondary-700" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Vehicle Inspection</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Annual inspection for KDD 234C is due in 2 weeks
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="btn-primary w-full">
                View All Alerts
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;