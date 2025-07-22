import { useState, useEffect } from "react";
import { maintenance_cost_details } from "../api";

interface CostDetails {
  OIL_CHANGE?: number;
  TRANSMISSION_SERVICE?: number;
  BRAKE_INSPECTION?: number;
  [key: string]: number | undefined;
}

interface UseCostDetailsReturn {
  costDetails: CostDetails;
  loading: boolean;
  error: string | null;
}

export function useCostDetails(): UseCostDetailsReturn {
  const [costDetails, setCostDetails] = useState<CostDetails>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCostDetails() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await maintenance_cost_details();
        console.log('Cost details API response:', response);
        
        // Extract the cost details from the API response
        // Expected format: { data: { data: { OIL_CHANGE: number, ... }, message: string } }
        const costDetailsValue = response.data?.data || {};
        setCostDetails(costDetailsValue);
      } catch (err) {
        console.error('Error fetching maintenance cost details:', err);
        setError("تعذر تحميل تفاصيل التكلفة");
        setCostDetails({});
      } finally {
        setLoading(false);
      }
    }

    fetchCostDetails();
  }, []);

  return {
    costDetails,
    loading,
    error
  };
}
