import { axiosWithAuth } from "../Service/axiosInstance";

// Global API endpoints that can be used across different features

// Dashboard APIs
export const get_last_maintenance = () => {
  return axiosWithAuth.get("/users/last-Maintenance");
}

// Vehicle APIs
export const get_vehicles_list = () => {
  return axiosWithAuth.get("/users/vehicles");
}

// You can add more global APIs here as needed
