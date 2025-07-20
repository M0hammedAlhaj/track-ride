import { axiosWithAuth } from "../../Service/axiosInstance";

export const last_service = () =>
    axiosWithAuth.get("/users/last-Maintenance");
    
export const count_vehicles = () =>
    axiosWithAuth.get("/vehicles/count-vehicles");

export const upconing_maintenance = () =>
    axiosWithAuth.get("/users/maintenance-record/first-upcoming");

export const getRecentVehicle =() =>
    axiosWithAuth.get("/vehicles/most-recent");