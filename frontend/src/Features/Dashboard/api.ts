import { axiosWithAuth } from "../../Service/axiosInstance";
    
export const count_vehicles = () =>
    axiosWithAuth.get("/vehicles/count-vehicles");

export const upconing_maintenance = () =>
    axiosWithAuth.get("/users/maintenance-record/first-upcoming");

export const getRecentVehicle =() =>
    axiosWithAuth.get("/vehicles/most-recent");

export const count_overdue_maintenance = () =>
    axiosWithAuth.get("/users/maintenance-record/count-overdue");