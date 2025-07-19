import { useState } from 'react'
import { update_vehicle } from '../api'
import type { VehicleSavePayload } from '../types'

export function useUpdateVehicle() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateVehicle = async (vehicleId: string, vehicleData: VehicleSavePayload) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await update_vehicle(vehicleId, vehicleData)
      setLoading(false)
      return result
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء تحديث المركبة')
      setLoading(false)
      throw err
    }
  }

  return {
    updateVehicle,
    loading,
    error
  }
}
