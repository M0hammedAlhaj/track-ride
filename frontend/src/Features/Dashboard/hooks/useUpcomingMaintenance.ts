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
      
      // Fetch upcoming maintenance data
      const upcomingResponse = await upconing_maintenance()
      
      console.log('Raw upcoming maintenance response:', upcomingResponse.data); // Debug log
      
      // Check if upcoming maintenance response is valid
      if (!upcomingResponse.data || !upcomingResponse.data.data || !Array.isArray(upcomingResponse.data.data)) {
        setData([])
        setError(null)
        return
      }
      
      console.log('Upcoming maintenance data array:', upcomingResponse.data.data); // Debug log
      
      // Transform the API response to match our interface
      const transformedData = upcomingResponse.data.data.map((record: any, index: number) => {
        console.log('Processing record:', record); // Debug log
        return {
          id: record.vehicleId || `temp-${index}`,
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
      
      setData(transformedData)
      setError(null)
    } catch (err: any) {
      setError('حدث خطأ أثناء تحميل بيانات الصيانة القادمة')
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
