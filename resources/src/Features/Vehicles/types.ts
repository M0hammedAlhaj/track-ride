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

export interface VehicleWithLastService {
  vehicle: VehicleAPI;
}


export interface VehicleSavePayload {
    name:string,
    model:string,
    year:number | string,
    color:string,
    license:string
}    

export interface Vehicle {
  id: string;
  name: string;
  model: string;
  licensePlate: string;
  lastService: string | null;
}