import { useState, useEffect } from 'react'
import { upconing_maintenance } from '../api'

interface UpcomingMaintenanceRecord {
  id: string
  type: string
  created: string
  reminderDate: string
  vehicleId: string
  vehicleName: string
  vehicleLicense: string
  description: string
  price: number
  status: string
}

export function useUpcomingMaintenance() {
  const [data, setData] = useState<UpcomingMaintenanceRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUpcomingMaintenance = async () => {
    try {
      setLoading(true)
      setError(null) // Clear previous errors
      
      console.log('Fetching upcoming maintenance data...');
      
      // Fetch upcoming maintenance data
      const upcomingResponse = await upconing_maintenance()
      
      console.log('Raw upcoming maintenance response:', upcomingResponse.data); // Debug log
      
      // Check if upcoming maintenance response is valid
      if (!upcomingResponse.data || !upcomingResponse.data.data || !Array.isArray(upcomingResponse.data.data)) {
        console.log('No data or invalid data structure, setting empty array');
        setData([])
        setError(null)
        return
      }
      
      console.log('Upcoming maintenance data array:', upcomingResponse.data.data); // Debug log
      
      // Transform the API response to match our interface
      const transformedData = upcomingResponse.data.data.map((record: any, index: number) => {
        console.log('Processing record:', record); // Debug log
        console.log('Available record fields:', Object.keys(record)); // Show all available fields
        console.log('Record ID field:', record.id);
        console.log('Record maintenanceRecordId field:', record.maintenanceRecordId);
        console.log('Record vehicleId field:', record.vehicleId);
        
        return {
          id: record.id || record.maintenanceRecordId || record.recordId || `temp-${index}`, // Try multiple possible ID fields
          type: record.type || 'غير محدد',
          created: record.created,
          reminderDate: record.reminderDate,
          vehicleId: record.vehicleId,
          vehicleName: record.vehicleName || 'غير محدد',
          vehicleLicense: record.vehicleLicense || 'غير محدد',
          description: record.description || '',
          price: record.price || 0,
          status: record.status || 'UP_COMING'
        }
      })
      
      console.log('Transformed data:', transformedData); // Debug log
      console.log('Setting upcoming maintenance data with', transformedData.length, 'records');
      
      setData(transformedData)
      setError(null)
    } catch (err: any) {
      const errorMessage = 'حدث خطأ أثناء تحميل بيانات الصيانة القادمة';
      setError(errorMessage)
      console.error('Error fetching upcoming maintenance data:', err)
      setData([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUpcomingMaintenance()
  }, [])

  return { data, loading, error, refetch: fetchUpcomingMaintenance }
}
