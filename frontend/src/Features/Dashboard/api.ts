import { axiosWithAuth } from "../../Service/axiosInstance";
    
export const count_vehicles = () =>
    axiosWithAuth.get("/vehicles/count-vehicles");

export const upconing_maintenance = () =>
    axiosWithAuth.get("/users/maintenance-record/first-upcoming");

export const count_upcoming_maintenance = () =>
    axiosWithAuth.get("/maintenance-records/up-coming");

export const getRecentVehicle =() =>
    axiosWithAuth.get("/vehicles/most-recent");

export const count_overdue_maintenance = () =>
    axiosWithAuth.get("/users/maintenance-record/count-overdue");

export const total_maintenance_cost = () =>
    axiosWithAuth.get("/maintenance-records/total-cost");

export const last_month_maintenance_cost = () =>
    axiosWithAuth.get("/maintenance-records/last-month-cost");

export const maintenance_cost_details = () =>
    axiosWithAuth.get("/maintenance-records/cost-details");

export const update_maintenance_status = (recordId: string, status: string) =>
    axiosWithAuth.put(`/maintenance-records/${recordId}/?status=${status}`);