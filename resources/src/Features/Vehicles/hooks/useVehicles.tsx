import { useEffect, useState } from "react";
import { get_vehicles } from "../api"; 
import type { VehicleWithLastService } from "../types";

export function useVehicles() {
  const [vehicles, setVehicles] = useState<VehicleWithLastService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await get_vehicles();
        setVehicles(response.data.data); // API response structure
      } catch (err) {
        setError("حدث خطأ أثناء تحميل المركبات");
      } finally {
        setLoading(false);
      }
    }

    fetchVehicles();
  }, []);

  return { vehicles, loading, error };
}
