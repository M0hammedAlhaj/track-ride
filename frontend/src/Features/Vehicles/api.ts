import { axiosWithAuth } from "../../Service/axiosInstance";
import type { VehicleSavePayload } from "./types.ts";
import type { MaintenanceTypesResponse, MaintenanceRecordRequest } from "../../types";

export const  assign_vehicle = (payload:VehicleSavePayload) =>{
  return axiosWithAuth.post("/users/assign-vehicle", payload);
}

export const get_vehicles=()=>{
    return axiosWithAuth.get("/users/last-Maintenance");
}

export const get_vehicle_by_id = (id: string) => {
  return axiosWithAuth.get(`/vehicles/${id}`);
}

export const get_maintenance_types = () => {
  return axiosWithAuth.get<MaintenanceTypesResponse>("/maintenance-records/types");
}

export const assign_maintenance_record = (vehicleId: string, payload: MaintenanceRecordRequest) => {
  return axiosWithAuth.put(`/vehicles/${vehicleId}/maintenance`, payload);
}

export const update_vehicle = async (vehicleId: string, payload: VehicleSavePayload) => {
  try {
    const response = await axiosWithAuth.put(`/vehicles/${vehicleId}`, payload);
    return response.data;
  } catch (error: any) {
    throw error
  }
}

export const delete_vehicle = async (vehicleId: string) => {
  try {
    const response = await axiosWithAuth.delete(`/vehicles/${vehicleId}`);
    return response.data;
  } catch (error: any) {
    throw error
  }
}

export const get_vehicles_with_pagination = (page: number = 1, size: number = 5) => {
  return axiosWithAuth.get(`/users/vehicles/latest-maintenance?size=${size}&page=${page}`);
}