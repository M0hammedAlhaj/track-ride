import { useState, useEffect } from "react";
import { total_maintenance_cost } from "../api";

interface UseTotalCostReturn {
  totalCost: number;
  loading: boolean;
  error: string | null;
}

export function useTotalCost(): UseTotalCostReturn {
  const [totalCost, setTotalCost] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTotalCost() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await total_maintenance_cost();
        console.log('Total cost API response:', response);
        
        // Extract the total cost from the API response
        // Expected format: { data: { data: number, message: string } }
        const totalCostValue = response.data?.data || 0;
        setTotalCost(totalCostValue);
      } catch (err) {
        console.error('Error fetching total maintenance cost:', err);
        setError("تعذر تحميل إجمالي التكلفة");
        setTotalCost(0);
      } finally {
        setLoading(false);
      }
    }

    fetchTotalCost();
  }, []);

  return {
    totalCost,
    loading,
    error
  };
}