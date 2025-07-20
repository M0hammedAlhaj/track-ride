import { useState, useEffect } from 'react'
import { upconing_maintenance } from '../api'
import { get_last_maintenance } from '../../../api/globalApi'

interface UpcomingMaintenanceRecord {
  id: string
  type: string
  created: string
  reminderDate: string
  vehicleId: string
  vehicleName: string
  vehicleYear: string
  licensePlate: string
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
      
      // Fetch both upcoming maintenance and vehicle data
      const [upcomingResponse, vehiclesResponse] = await Promise.all([
        upconing_maintenance(),
        get_last_maintenance()
      ])
      
      // Check if upcoming maintenance response is valid
      if (!upcomingResponse.data || !upcomingResponse.data.data || !Array.isArray(upcomingResponse.data.data)) {
        setData([])
        setError(null)
        return
      }

      // Check if vehicles response is valid
      if (!vehiclesResponse.data || !vehiclesResponse.data.data || !Array.isArray(vehiclesResponse.data.data)) {
        setData([])
        setError(null)
        return
      }
      
      // Create a map of vehicles by ID for easy lookup
      const vehiclesMap = new Map()
      vehiclesResponse.data.data.forEach((vehicle: any) => {
        vehiclesMap.set(vehicle.id, vehicle)
      })
      
      // Transform the API response to match our interface
      const transformedData = upcomingResponse.data.data.map((record: any, index: number) => {
        const vehicle = vehiclesMap.get(record.vehicleId)
        
        return {
          id: record.vehicleId || `temp-${index}`,
          type: record.type || 'غير محدد',
          created: record.created,
          reminderDate: record.reminderDate,
          vehicleId: record.vehicleId,
          vehicleName: vehicle?.name || 'غير محدد',
          vehicleYear: vehicle?.year || 'غير محدد',
          licensePlate: vehicle?.license || 'غير محدد',
          description: record.description || '',
          price: record.price || 0,
          status: record.status || 'UP_COMING'
        }
      })
      
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
