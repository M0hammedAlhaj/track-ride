import { useState } from 'react'
import { assign_maintenance_record } from '../api'
import type { MaintenanceRecordRequest } from '../../../types'

export function useCreateMaintenanceRecord() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createMaintenanceRecord = async (vehicleId: string, payload: MaintenanceRecordRequest) => {
    try {
      setLoading(true)
      setError(null)

      const response = await assign_maintenance_record(vehicleId, payload)
      return response.data
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 
        'حدث خطأ أثناء إضافة سجل الصيانة. يرجى المحاولة مرة أخرى.'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    createMaintenanceRecord,
    loading,
    error,
  }
}
