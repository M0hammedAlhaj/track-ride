import { useEffect, useState } from "react";
import { axiosWithAuth } from "../../../Service/axiosInstance";
import { count_vehicles } from "../api";

export function useCountVehicles() {
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        async function fetchCount() {
            try {
                const response = await count_vehicles();
               setCount(response.data.data);
            } catch (err) {
                setError("تعذر تحميل عدد المركبات");
            } finally {
                setLoading(false);
            }
        }

        fetchCount();
    }, []);

    return { count, loading, error };
}