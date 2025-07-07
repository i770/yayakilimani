// Define the core types for our application

export interface Vehicle {
  id: string;
  registrationNo: string;
  chassisNo: string;
  engineNo: string;
  model: string;
  year: number;
  route: string;
  assignedDriver?: string;
  status: 'Active' | 'In Repair' | 'Retired';
  lastMaintenance?: Date;
  nextMaintenance?: Date;
  fuelEfficiency?: number;
  image?: string;
}

export interface Driver {
  id: string;
  name: string;
  licenseNo: string;
  licenseExpiry: Date;
  phoneNumber: string;
  email?: string;
  address: string;
  assignedVehicle?: string;
  status: 'Active' | 'Inactive' | 'On Leave';
  joinDate: Date;
  certifications: string[];
  incidents: Incident[];
  photo?: string;
}

export interface Incident {
  id: string;
  date: Date;
  description: string;
  driverId: string;
  vehicleId: string;
  type: 'Accident' | 'Traffic Violation' | 'Breakdown' | 'Other';
  status: 'Pending' | 'Resolved';
  cost?: number;
}

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  date: Date;
  type: 'Regular' | 'Repair' | 'Inspection';
  description: string;
  partsReplaced: MaintenancePart[];
  cost: number;
  mechanicName: string;
  nextMaintenance?: Date;
  status: 'Scheduled' | 'In Progress' | 'Completed';
  notes?: string;
}

export interface MaintenancePart {
  name: string;
  quantity: number;
  cost: number;
}

export interface FuelRecord {
  id: string;
  vehicleId: string;
  date: Date;
  amount: number; // Liters
  cost: number;
  odometer: number; // Current reading
  station: string;
  fuelType: 'Petrol' | 'Diesel';
}

export interface Expense {
  id: string;
  date: Date;
  category: 'Fuel' | 'Maintenance' | 'Insurance' | 'Licensing' | 'Driver Allowance' | 'Other';
  description: string;
  amount: number;
  vehicleId?: string;
  driverId?: string;
  receiptNo?: string;
  paymentMethod: 'Cash' | 'Bank Transfer' | 'Mobile Money' | 'Credit Card';
}

export interface ChartData {
  name: string;
  value: number;
}

export type TimeRange = 'day' | 'week' | 'month' | 'year';