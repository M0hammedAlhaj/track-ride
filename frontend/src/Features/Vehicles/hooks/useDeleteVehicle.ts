import { useState } from 'react'
import { delete_vehicle } from '../api'

export function useDeleteVehicle() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deleteVehicle = async (vehicleId: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await delete_vehicle(vehicleId)
      setLoading(false)
      return result
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء حذف المركبة')
      setLoading(false)
      throw err
    }
  }

  return {
    deleteVehicle,
    loading,
    error,
  }
}
