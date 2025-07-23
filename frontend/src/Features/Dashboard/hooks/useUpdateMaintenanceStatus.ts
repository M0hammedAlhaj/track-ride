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
    console.log('updateStatus called with recordId:', recordId, 'status:', status);
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Making API call to update status...');
      const response = await update_maintenance_status(recordId, status);
      console.log('API response:', response);
      
      setLoading(false);
      console.log('Status update successful');
      return true;
    } catch (err: any) {
      console.error('Error updating maintenance status:', err);
      console.error('Error response:', err.response);
      
      const errorMessage = err.response?.data?.message || 'حدث خطأ أثناء تحديث حالة الصيانة';
      setError(errorMessage);
      console.error('Error message set to:', errorMessage);
      
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
