import { useState, useEffect } from 'react';
import { count_overdue_maintenance } from '../api';

interface UseCountOverdueResult {
  count: number;
  loading: boolean;
  error: string | null;
}

export const useCountOverdue = (): UseCountOverdueResult => {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOverdueCount = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await count_overdue_maintenance();
        setCount(response.data.data);
      } catch (err) {
        console.error('Error fetching overdue count:', err);
        setError("تعذر تحميل عدد الصيانة المتأخرة");
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchOverdueCount();
  }, []);

  return { count, loading, error };
};
