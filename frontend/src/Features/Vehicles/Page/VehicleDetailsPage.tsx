import { useParams } from "react-router-dom"
import { useVehicleById, useMaintenanceTypes, useCreateMaintenanceRecord } from "../hooks"
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
  const { vehicle, maintenanceRecords, loading, error, refetch } = useVehicleById(id || "")
  const { maintenanceTypes } = useMaintenanceTypes()
  const { createMaintenanceRecord } = useCreateMaintenanceRecord()

  const handleAddMaintenanceRecord = async (data: any) => {
    console.log('New maintenance record:', data)
    
    try {
      // Prepare the payload according to backend validation
      const payload = {
        type: data.type,
        description: data.description,
        price: data.price,
        reminderDate: data.useCustomReminder ? data.reminderDate : null
      }
      
      // Call the API to save the maintenance record
      await createMaintenanceRecord(id || "", payload)
      
      // Find the Arabic name for the service type
      const serviceType = maintenanceTypes?.find(type => type.key === data.type)
      const serviceTypeName = serviceType?.arabicName || data.type
      
      const reminderType = data.useCustomReminder ? 'مخصص' : 'تلقائي'
      
      // Refresh the vehicle data to show the new maintenance record
      await refetch()
      
    } catch (error: any) {
      console.error('Error adding maintenance record:', error)
      
      // Handle different error types with better UX
      let errorMessage = 'حدث خطأ أثناء إضافة سجل الصيانة. يرجى المحاولة مرة أخرى.'
      
      if (error.response?.status === 400) {
        errorMessage = 'خطأ في البيانات المدخلة. يرجى التحقق من جميع الحقول.'
      } else if (error.response?.status === 401) {
        errorMessage = 'انتهت صلاحية جلسة العمل. يرجى تسجيل الدخول مرة أخرى.'
      } else if (error.response?.status === 403) {
        errorMessage = 'غير مصرح لك بإضافة سجلات الصيانة.'
      }
      
      // You can implement a toast notification here instead of alert
      console.error('Maintenance record error:', errorMessage)
    }
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
