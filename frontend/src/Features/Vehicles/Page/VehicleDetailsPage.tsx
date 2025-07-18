import { useParams } from "react-router-dom"
import { useVehicleById } from "../hooks/useVehicleById"
import { useMaintenanceTypes } from "../hooks/useMaintenanceTypes"
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
  const { maintenanceTypes } = useMaintenanceTypes()

  const handleAddMaintenanceRecord = (data: any) => {
    console.log('New maintenance record:', data)
    // TODO: Connect to backend API to save the record
    // This is where you would call your API to save the maintenance record
    
    // Find the Arabic name for the service type
    const serviceType = maintenanceTypes.find(type => type.key === data.type)
    const serviceTypeName = serviceType?.arabicName || data.type
    
    const reminderType = data.useCustomReminder ? 'مخصص' : 'تلقائي'
    alert(`تم إضافة سجل الصيانة بنجاح!\nنوع الخدمة: ${serviceTypeName}\nالسعر: ${data.price} دينار أردني\nنوع التذكير: ${reminderType}\nتاريخ التذكير: ${data.reminderDate}\n\n(سيتم ربطه بالباك إند لاحقاً)`)
  }

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
        <MaintenanceRecordsCard 
          maintenanceRecords={maintenanceRecords} 
          onAddRecord={handleAddMaintenanceRecord}
        />
      </div>
    </div>
  )
}
