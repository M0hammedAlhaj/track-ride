import { useParams } from "react-router-dom"
import { useVehicleById } from "../hooks/useVehicleById"
import NavBar from "../../../Components/NavBar"
import { 
  VehicleDetailsHeader, 
  VehicleInfoCard, 
  MaintenanceRecordsCard, 
  LoadingState, 
  ErrorState 
} from "../Components"

export default function VehicleDetails() {
  const { id } = useParams<{ id: string }>()
  const { vehicle, maintenanceRecords, loading, error } = useVehicleById(id || "")

  if (loading) {
    return <LoadingState />
  }

  if (error || !vehicle) {
    return <ErrorState error={error} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NavBar />
        <VehicleDetailsHeader />
        <VehicleInfoCard vehicle={vehicle} />
        <MaintenanceRecordsCard maintenanceRecords={maintenanceRecords} />
      </div>
    </div>
  )
}
