export interface MaintenanceRecord {
  type: string;
  created: string;
  reminderDate: string;
  vehicleId: string;
}

export interface VehicleAPI {
  id: string;
  license: string;
  model: string;
  color: string;
  year: string;
  name: string;
  maintenanceRecords: MaintenanceRecord[] | null;
}


export interface Vehicle {
  id: string;
  name: string;
  model: string;
  licensePlate: string;
  lastService: string | null;
  year?: string | number;
  color?: string;
}