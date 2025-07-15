import { axiosWithAuth } from "../../Service/axiosInstance";


export const last_service = () =>
    axiosWithAuth.get("/users/last-Maintenance");
    
