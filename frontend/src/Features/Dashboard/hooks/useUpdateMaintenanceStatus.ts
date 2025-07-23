import { useState } from 'react';
import { update_maintenance_status } from '../api';

interface UseUpdateMaintenanceStatusResult {
  updateStatus: (recordId: string, status: 'COMPLETED' | 'CANCELED' | 'UP_COMING') => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

export const useUpdateMaintenanceStatus = (): UseUpdateMaintenanceStatusResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = async (recordId: string, status: 'COMPLETED' | 'CANCELED' | 'UP_COMING'): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      await update_maintenance_status(recordId, status);
      setLoading(false);
      return true;
    } catch (err: any) {
      console.error('Error updating maintenance status:', err);
      setError(err.response?.data?.message || 'حدث خطأ أثناء تحديث حالة الصيانة');
      setLoading(false);
      return false;
    }
  };

  return {
    updateStatus,
    loading,
    error
  };
};
