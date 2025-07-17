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
        setUpcomingDate(response.data.data); // API returns { data: string }
      } catch (err) {
        setError("تعذر تحميل الصيانة القادمة");
      } finally {
        setLoading(false);
      }
    }

    loadUpcomingDate();
  }, []);

  return { upcomingDate, loading, error };
}
