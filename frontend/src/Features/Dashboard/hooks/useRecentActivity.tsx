import { useEffect, useState } from "react";
import { get_vehicles_with_pagination } from "../../Vehicles/api";
import { useMaintenanceTypeTranslation } from "../../MaintenanceTypes/hooks/useMaintenanceTypeTranslation";

interface RecentActivity {
  id: string;
  vehicleName: string;
  maintenanceType: string;
  date: string;
  status: "completed" | "scheduled" | "cancelled";
}

export function useRecentActivity() {
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { getTypeInArabic } = useMaintenanceTypeTranslation();

  useEffect(() => {
    async function fetchRecentActivity() {
      try {
        setLoading(true);
        const response = await get_vehicles_with_pagination(1, 5); // Get last 5 vehicles with latest maintenance
        
        console.log('Recent Activity API Response:', response.data);
        
        // Handle the API response structure
        const { data } = response.data;
        const vehicleData = Array.isArray(data) ? data : [];
        
        // Transform data to recent activity format
        const recentActivities: RecentActivity[] = vehicleData
          .filter((vehicle: any) => vehicle.maintenanceRecords && vehicle.maintenanceRecords.length > 0)
          .map((vehicle: any) => {
            const latestMaintenance = vehicle.maintenanceRecords[0]; // Get the latest maintenance record
            return {
              id: latestMaintenance.id || vehicle.id,
              vehicleName: vehicle.name || `${vehicle.model} ${vehicle.year}`,
              maintenanceType: getTypeInArabic(latestMaintenance.type),
              date: latestMaintenance.created || latestMaintenance.reminderDate,
              status: mapStatusToDashboard(latestMaintenance.status || "UP_COMING")
            };
          })
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date descending
          .slice(0, 5); // Take only the 5 most recent
        
        setActivities(recentActivities);
        setError(null);
      } catch (err) {
        console.error('Error fetching recent activity:', err);
        setError("تعذر تحميل النشاط الأخير");
        setActivities([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentActivity();
  }, []);

  return { activities, loading, error };
}

// Helper function to map API status to dashboard status
function mapStatusToDashboard(status: string): "completed" | "scheduled" | "cancelled" {
  switch (status) {
    case "COMPLETED":
      return "completed";
    case "UP_COMING":
      return "scheduled";
    case "CANCELLED":
      return "cancelled";
    case "OVERDUE":
      return "scheduled"; // Treat overdue as scheduled for now
    default:
      return "scheduled";
  }
}
