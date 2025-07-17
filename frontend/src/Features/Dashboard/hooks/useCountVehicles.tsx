import React, { useEffect } from "react";
import { count_vehicles } from "../api";
import { useState } from "react";
export function useCountVehicles() {
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);


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