import { useState, useEffect } from 'react'
import { get_last_maintenance } from '../../../api/globalApi'

interface MaintenanceData {
  id: string
  vehicleName: string
  licensePlate: string
  lastServiceDate: string
  nextReminderDate: string
  priority: "high" | "medium" | "low"
}

export function useLastMaintenance() {  
  const [data, setData] = useState<MaintenanceData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLastMaintenance = async () => {
    try {
      setLoading(true)
      const response = await get_last_maintenance()
      
      // Check if response.data.data exists and is an array
      if (!response.data || !response.data.data || !Array.isArray(response.data.data)) {
        setData([])
        setError(null)
        return
      }
      
      // Transform the API response to match our interface
      // The API returns array of VehicleAPI objects directly (not wrapped in vehicle property)
      const transformedData = response.data.data
        .filter((vehicle: any) => {
          // Only include vehicles that have maintenance records
          return vehicle && vehicle.maintenanceRecords && vehicle.maintenanceRecords.length > 0
        })
        .map((vehicle: any, index: number) => {
          // Get the latest maintenance record to calculate next reminder
          const latestMaintenance = vehicle.maintenanceRecords[vehicle.maintenanceRecords.length - 1]
          
          return {
            id: vehicle.id || `temp-${index}`,
            vehicleName: vehicle.name || 'غير محدد',
            licensePlate: vehicle.license || 'غير محدد',
            lastServiceDate: latestMaintenance.created,
            nextReminderDate: latestMaintenance.reminderDate,
            priority: "medium" as const // Default priority, you can modify this based on your logic
          }
        })
      
      setData(transformedData)
      setError(null)
    } catch (err: any) {
      setError('حدث خطأ أثناء تحميل بيانات الصيانة')
      console.error('Error fetching maintenance data:', err)
      setData([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLastMaintenance()
  }, [])

  return { data, loading, error, refetch: fetchLastMaintenance }
}
