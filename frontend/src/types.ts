export interface MaintenanceRecord {
  id?: string;
  type: string;
  created: string;
  reminderDate: string;
  vehicleId: string;
  description?: string;
  price: number;
  status: string;
}

export interface MaintenanceRecordRequest {
  type: string;
  description: string;
  price: number;
  reminderDate?: string | null;
}

export interface MaintenanceType {
  key: string;
  arabicName: string;
  timeInterval: number;
  distanceIntervalKm?: number; // Make this optional since it's not in the API response
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