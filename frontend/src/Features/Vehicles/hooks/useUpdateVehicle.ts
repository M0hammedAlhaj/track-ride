import { useState } from 'react'
import { update_vehicle } from '../api'
import type { VehicleSavePayload } from '../types'

export function useUpdateVehicle() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateVehicle = async (vehicleId: string, payload: VehicleSavePayload) => {
    console.log('Hook: updateVehicle called with:', { vehicleId, payload })
    try {
      setLoading(true)
      setError(null)
      
      console.log('Hook: About to call API update_vehicle')
      const response = await update_vehicle(vehicleId, payload)
      console.log('Hook: API response received:', response)
      
      return response.data
    } catch (err: any) {
      console.error('Hook: Error in updateVehicle:', err)
      const errorMessage = err.response?.data?.message || 
        'حدث خطأ أثناء تحديث بيانات المركبة. يرجى المحاولة مرة أخرى.'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
      console.log('Hook: updateVehicle finished, loading set to false')
    }
  }

  return {
    updateVehicle,
    loading,
    error,
  }
}
