import { useEffect, useState } from "react";
import { get_vehicle_by_id } from "../api";
import type { VehicleAPI, Vehicle, MaintenanceRecord } from "@/types";

export function useVehicleById(id: string) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicle = async () => {
    try {
      setLoading(true);
      const response = await get_vehicle_by_id(id);
      const apiData: VehicleAPI = response.data.data;

      const lastService =
        apiData.maintenanceRecords && apiData.maintenanceRecords.length > 0
          ? apiData.maintenanceRecords[0].created
          : null;

      const transformedVehicle: Vehicle = {
        id: apiData.id,
        name: apiData.name,
        model: apiData.model,
        licensePlate: apiData.license,
        year: apiData.year,
        color: apiData.color,
        lastService
      };

      setVehicle(transformedVehicle);
      setMaintenanceRecords(apiData.maintenanceRecords || []);
      
      // Debug logging
      console.log('API Response:', response.data);
      console.log('Maintenance Records from API:', apiData.maintenanceRecords);
      console.log('Records count:', apiData.maintenanceRecords?.length || 0);
      
      setError(null);
    } catch (err) {
      setError("حدث خطأ أثناء تحميل المركبة");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchVehicle();
  }, [id]);

  return { vehicle, maintenanceRecords, loading, error, refetch: fetchVehicle };
}
