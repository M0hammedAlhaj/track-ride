export interface LastService {
  maintenanceRecords: MaintenanceRecords;
  message: string;
}

export interface MaintenanceRecords {
  maintenanceRecordResources: MaintenanceRecordResource[];
}

export interface MaintenanceRecordResource {
  type: string; 
  created: string;
  reminderDate: string;
  vehicleResources: VehicleResource;
}

export interface VehicleResource {
  id: string;
  license: string;
  model: string;
  color: string;
}
