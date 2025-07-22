 import { useEffect, useState } from "react";
import { count_upcoming_maintenance } from "../api";

export function useFetchUpcoming() {
  
  const [upcomingDate, setUpcomingDate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUpcomingDate() {
      try {
        const response = await count_upcoming_maintenance();
        console.log('Upcoming maintenance count API response:', response.data); // Debug log
        
        // The count endpoint should return { data: number, message: string }
        const count = response.data?.data ?? 0;
        console.log('Extracted count:', count); // Debug log
        
        setUpcomingDate(typeof count === 'number' ? count : 0);
        setError(null);
      } catch (err) {
        console.error('Error fetching upcoming maintenance count:', err); // Debug log
        setError("تعذر تحميل عدد الصيانة القادمة");
        setUpcomingDate(0); // Set to 0 on error
      } finally {
        setLoading(false);
      }
    }

    loadUpcomingDate();
  }, []);

  return { upcomingDate, loading, error };
}
