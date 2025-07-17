import { useEffect, useState } from "react";
import { getRecentVehicle } from "../api";
import type { VehicleAPI } from "../../../types";

export function useRecentVehicle() {
  const [vehicle, setVehicle] = useState<VehicleAPI | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecentVehicle() {
      try {
        const response = await getRecentVehicle();
        // Ensure the data key exists
        setVehicle(response.data.data || null);
      } catch (err) {
        setError("تعذر تحميل آخر مركبة مضافة");
      } finally {
        setLoading(false);
      }
    }

    fetchRecentVehicle();
  }, []);

  return { vehicle, loading, error };
}
