import { useState } from 'react'
import { assign_vehicle } from '../api'
import type { VehicleSavePayload } from '../types'

export function useCreateVehicle() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createVehicle = async (payload: VehicleSavePayload) => {
    try {
      setLoading(true)
      setError(null)

      const response = await assign_vehicle(payload)
      return response.data
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 
        'حدث خطأ أثناء إضافة المركبة. يرجى المحاولة مرة أخرى.'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    createVehicle,
    loading,
    error,
  }
}
