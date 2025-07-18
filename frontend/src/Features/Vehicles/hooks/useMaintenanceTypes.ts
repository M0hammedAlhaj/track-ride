import { useState, useEffect } from 'react'
import { MaintenanceType } from '../../../types'
import { get_maintenance_types } from '../api'

export const useMaintenanceTypes = () => {
  const [maintenanceTypes, setMaintenanceTypes] = useState<MaintenanceType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMaintenanceTypes = async () => {
      try {
        setLoading(true)
        const response = await get_maintenance_types()
        setMaintenanceTypes(response.data.data)
        setError(null)
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'فشل في تحميل أنواع الصيانة')
        console.error('Error fetching maintenance types:', err)
        
        // Fallback to default maintenance types if API fails
        const fallbackTypes: MaintenanceType[] = [
          {
            key: "OIL_CHANGE",
            arabicName: "تغيير الزيت",
            distanceIntervalKm: 10000,
            timeInterval: 180
          },
          {
            key: "TIRE_ROTATION",
            arabicName: "تدوير الإطارات",
            distanceIntervalKm: 8000,
            timeInterval: 180
          },
          {
            key: "BRAKE_INSPECTION",
            arabicName: "فحص المكابح",
            distanceIntervalKm: 15000,
            timeInterval: 365
          },
          {
            key: "TRANSMISSION_SERVICE",
            arabicName: "خدمة ناقل الحركة",
            distanceIntervalKm: 60000,
            timeInterval: 730
          }
        ]
        setMaintenanceTypes(fallbackTypes)
      } finally {
        setLoading(false)
      }
    }

    fetchMaintenanceTypes()
  }, [])

  return { maintenanceTypes, loading, error }
}
