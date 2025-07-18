export interface MaintenanceRecord {
  type: string;
  created: string;
  reminderDate: string;
  vehicleId: string;
  price: number;
}

export interface MaintenanceType {
  key: string;
  arabicName: string;
  distanceIntervalKm: number;
  timeInterval: number;
}

export interface MaintenanceTypesResponse {
  data: MaintenanceType[];
  message: string;
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