import { useState, useEffect } from "react";
import { last_month_maintenance_cost } from "../api";

interface UseLastMonthCostReturn {
  lastMonthCost: number;
  loading: boolean;
  error: string | null;
}

export function useLastMonthCost(): UseLastMonthCostReturn {
  const [lastMonthCost, setLastMonthCost] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLastMonthCost() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await last_month_maintenance_cost();
        console.log('Last month cost API response:', response);
        
        // Extract the last month cost from the API response
        // Expected format: { data: { data: number, message: string } }
        const lastMonthCostValue = response.data?.data || 0;
        setLastMonthCost(lastMonthCostValue);
      } catch (err) {
        console.error('Error fetching last month maintenance cost:', err);
        setError("تعذر تحميل تكلفة الشهر الماضي");
        setLastMonthCost(0);
      } finally {
        setLoading(false);
      }
    }

    fetchLastMonthCost();
  }, []);

  return {
    lastMonthCost,
    loading,
    error
  };
}
