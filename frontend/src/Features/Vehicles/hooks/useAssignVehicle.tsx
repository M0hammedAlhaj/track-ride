import { useState } from "react";
import { assign_vehicle } from "../api";
import type { VehicleSavePayload } from "../types";
export function useAssignVehicle() {

    const[error,setError] = useState<string | null>(null);
    const[loading,setLoading] = useState(false);
    
    const assignVehicle = async (payload: VehicleSavePayload) => {
        setLoading(true);
        setError(null);
        try {
            const response = await assign_vehicle(payload);
            return response.data;
        } catch (err: any) {
            setError("حدث خطأ أثناء تعيين المركبة، الرجاء المحاولة لاحقاً");
            throw err;
        } finally {
            setLoading(false);
        }
    }

    return{
        error,
        loading,
        assignVehicle
    }
}