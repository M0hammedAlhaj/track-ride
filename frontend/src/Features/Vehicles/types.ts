import type { VehicleAPI } from "../../types";

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
