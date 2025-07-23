import { useState, useEffect, useCallback } from 'react';
import { count_overdue_maintenance } from '../api';

interface UseCountOverdueResult {
  count: number;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useCountOverdue = (): UseCountOverdueResult => {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOverdueCount = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching overdue maintenance count...');
      
      const response = await count_overdue_maintenance();
      console.log('Overdue count response:', response.data);
      
      setCount(response.data.data);
      console.log('Updated overdue count to:', response.data.data);
    } catch (err) {
      console.error('Error fetching overdue count:', err);
      setError("تعذر تحميل عدد الصيانة المتأخرة");
      setCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOverdueCount();
  }, [fetchOverdueCount]);

  return { count, loading, error, refetch: fetchOverdueCount };
};
