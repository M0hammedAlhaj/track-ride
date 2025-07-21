import { useEffect, useState } from "react";
import { maintenanceTypesService, MaintenanceType } from "../api";

export function useMaintenanceTypes() {
  const [types, setTypes] = useState<MaintenanceType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMaintenanceTypes() {
      try {
        setLoading(true);
        
        // Check if data is already cached for better performance
        if (maintenanceTypesService.isCached()) {
          const cachedTypes = await maintenanceTypesService.getMaintenanceTypes();
          setTypes(cachedTypes);
          setError(null);
          setLoading(false);
          return;
        }

        // Fetch from API if not cached
        const maintenanceTypes = await maintenanceTypesService.getMaintenanceTypes();
        setTypes(maintenanceTypes);
        setError(null);
      } catch (err) {
        console.error('Error fetching maintenance types:', err);
        setError("تعذر تحميل أنواع الصيانة");
        setTypes([]);
      } finally {
        setLoading(false);
      }
    }

    fetchMaintenanceTypes();
  }, []);

  // Function to get Arabic name for a maintenance type (now using cached service)
  const getTypeInArabic = (type: string): string => {
    return maintenanceTypesService.getTypeInArabic(type);
  };

  // Function to refresh the cache
  const refreshTypes = async () => {
    maintenanceTypesService.clearCache();
    setLoading(true);
    try {
      const refreshedTypes = await maintenanceTypesService.getMaintenanceTypes();
      setTypes(refreshedTypes);
      setError(null);
    } catch (err) {
      console.error('Error refreshing maintenance types:', err);
      setError("تعذر تحديث أنواع الصيانة");
    } finally {
      setLoading(false);
    }
  };

  return { 
    types, 
    loading, 
    error, 
    getTypeInArabic,
    refreshTypes // Added refresh functionality
  };
}
