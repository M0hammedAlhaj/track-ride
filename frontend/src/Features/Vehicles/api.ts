import { axiosWithAuth } from "../../Service/axiosInstance";
import type { VehicleSavePayload } from "./types.ts";
export const  assign_vehicle = (payload:VehicleSavePayload) =>{
  return axiosWithAuth.post("/users/assign-vehicle", payload);
}

export const get_vehicles=()=>{
    return axiosWithAuth.get("/users/last-Maintenance");
}

export const get_vehicle_by_id = (id: string) => {
  return axiosWithAuth.get(`/vehicles/${id}`);
}