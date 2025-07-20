 import { useEffect, useState } from "react";
import { upconing_maintenance } from "../api";

export function useFetchUpcoming() {
  
  const [upcomingDate, setUpcomingDate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUpcomingDate() {
      try {
        const response = await upconing_maintenance();
        console.log('Upcoming maintenance API response:', response.data); // Debug log
        
        // Handle different possible response structures
        const count = response.data?.data ?? response.data?.count ?? 0;
        console.log('Extracted count:', count); // Debug log
        
        setUpcomingDate(typeof count === 'number' ? count : 0);
        setError(null);
      } catch (err) {
        console.error('Error fetching upcoming maintenance:', err); // Debug log
        setError("تعذر تحميل الصيانة القادمة");
        setUpcomingDate(0); // Set to 0 on error
      } finally {
        setLoading(false);
      }
    }

    loadUpcomingDate();
  }, []);

  return { upcomingDate, loading, error };
}
