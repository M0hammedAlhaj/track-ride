 import { useEffect, useState, useCallback } from "react";
import { count_upcoming_maintenance } from "../api";

export function useFetchUpcoming() {
  
  const [upcomingDate, setUpcomingDate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUpcomingCount = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching upcoming maintenance count...');
      const response = await count_upcoming_maintenance();
      console.log('Upcoming maintenance count API response:', response.data); // Debug log
      
      // The count endpoint should return { data: number, message: string }
      const count = response.data?.data ?? 0;
      console.log('Extracted upcoming count:', count); // Debug log
      
      setUpcomingDate(typeof count === 'number' ? count : 0);
      setError(null);
    } catch (err) {
      console.error('Error fetching upcoming maintenance count:', err); // Debug log
      setError("تعذر تحميل عدد الصيانة القادمة");
      setUpcomingDate(0); // Set to 0 on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUpcomingCount();
  }, [fetchUpcomingCount]);

  return { upcomingDate, loading, error, refetch: fetchUpcomingCount };
}
