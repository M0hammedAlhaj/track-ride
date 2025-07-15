import { axiosWithAuth } from "../../Service/axiosInstance.ts";


export const last_service = () =>
    axiosWithAuth.get("/users/last-Maintenance");
    
