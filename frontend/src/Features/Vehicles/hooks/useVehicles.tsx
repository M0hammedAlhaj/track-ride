import { useEffect, useState } from "react";
import { get_vehicles } from "../api"; 
import type { VehicleWithLastService } from "../types";

export function useVehicles() {
  const [vehicles, setVehicles] = useState<VehicleWithLastService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const response = await get_vehicles();
      setVehicles(response.data.data); // API response structure
      setError(null);
    } catch (err) {
      setError("حدث خطأ أثناء تحميل المركبات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return { vehicles, loading, error, refetch: fetchVehicles };
}
