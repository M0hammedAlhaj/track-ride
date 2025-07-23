import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Wrench, Plus, CheckCircle, Clock, XCircle } from "lucide-react"
import AddMaintenanceRecordForm from "./AddMaintenanceRecordForm"
import { MaintenanceRecord } from "../../../types"
import { useMaintenanceTypes } from "../hooks/useMaintenanceTypes"
import { useUpdateMaintenanceStatus } from "../../Dashboard/hooks/useUpdateMaintenanceStatus"
import { useState } from "react"

interface MaintenanceRecordsCardProps {
  maintenanceRecords: MaintenanceRecord[]
  onAddRecord?: (data: any) => void
  onStatusUpdate?: () => void // Callback to refresh data after status update
}

export default function MaintenanceRecordsCard({ maintenanceRecords, onAddRecord, onStatusUpdate }: MaintenanceRecordsCardProps) {
  const { maintenanceTypes } = useMaintenanceTypes()
  const { updateStatus, loading: updateLoading, error: updateError } = useUpdateMaintenanceStatus()
  const [updatingRecord, setUpdatingRecord] = useState<string | null>(null)
  
  // Debug logging
  console.log('MaintenanceRecordsCard received records:', maintenanceRecords)
  console.log('Records count:', maintenanceRecords?.length || 0)
  if (maintenanceRecords?.length > 0) {
    console.log('First record:', maintenanceRecords[0])
    console.log('First record has id:', !!maintenanceRecords[0]?.id)
  }
  
  const getMaintenanceTypeBadge = (type: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      "OIL_CHANGE": "default",
      "TIRE_ROTATION": "secondary",
      "BRAKE_INSPECTION": "destructive",
      "TRANSMISSION_SERVICE": "outline",
    }
    return variants[type] || "outline"
  }

  const getMaintenanceTypeDisplay = (typeKey: string) => {
    const maintenanceType = maintenanceTypes?.find(type => type.key === typeKey)
    return maintenanceType?.arabicName || typeKey
  }

  const getStatusInArabic = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'COMPLETED': 'مكتملة',
      'UP_COMING': 'قادمة',
      'CANCELED': 'ملغية',
      'CANCELLED': 'ملغية'
    }
    return statusMap[status] || status
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'UP_COMING':
        return <Clock className="h-4 w-4 text-yellow-400" />
      case 'CANCELED':
      case 'CANCELLED':
        return <XCircle className="h-4 w-4 text-red-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'COMPLETED':
        return 'default'
      case 'UP_COMING':
        return 'secondary'
      case 'CANCELED':
      case 'CANCELLED':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const getNextStatusText = (currentStatus: string) => {
    switch (currentStatus) {
      case 'UP_COMING':
        return 'تحديد كمكتملة'
      case 'COMPLETED':
        return 'إلغاء'
      case 'CANCELED':
      case 'CANCELLED':
        return 'إعادة تنشيط'
      default:
        return 'تحديث الحالة'
    }
  }

  const handleStatusChange = async (recordId: string, newStatus: 'COMPLETED' | 'CANCELED' | 'UP_COMING') => {
    if (!recordId || updatingRecord === recordId) return
    
    setUpdatingRecord(recordId)
    const success = await updateStatus(recordId, newStatus)
    
    if (success && onStatusUpdate) {
      onStatusUpdate() // Refresh the data
    }
    
    setUpdatingRecord(null)
  }

  const handleAddRecord = (data: any) => {
    console.log('Adding maintenance record:', data)
    // TODO: Connect to backend API
    if (onAddRecord) {
      onAddRecord(data)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ar-JO', {
      style: 'currency',
      currency: 'JOD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(price)
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700 shadow-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white">
            <Wrench className="h-5 w-5 text-emerald-400" />
            سجل الصيانة
          </CardTitle>
          <AddMaintenanceRecordForm onSubmit={handleAddRecord} />
        </div>
      </CardHeader>
      <CardContent>
        {updateError && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-500 rounded-lg">
            <p className="text-red-400 text-sm text-center">{updateError}</p>
          </div>
        )}
        {maintenanceRecords.length > 0 ? (
          <div className="rounded-md border border-gray-700 bg-gray-800/30">
            <div className="mb-2 text-xs text-gray-400">
              عرض {maintenanceRecords.length} سجل صيانة
            </div>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-700/30">
                  <TableHead className="font-semibold text-gray-300 text-right">نوع الخدمة</TableHead>
                  <TableHead className="font-semibold text-gray-300 text-right">تاريخ الإنشاء</TableHead>
                  <TableHead className="font-semibold text-gray-300 text-right">تاريخ التذكير</TableHead>
                  <TableHead className="font-semibold text-gray-300 text-right">السعر</TableHead>
                  <TableHead className="font-semibold text-gray-300 text-right">الحالة</TableHead>
                  <TableHead className="font-semibold text-gray-300 text-right">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maintenanceRecords.map((record, index) => {
                  console.log(`Rendering record ${index}:`, record); // Debug log
                  return (
                  <TableRow key={record.id || `record-${index}`} className="border-gray-700 hover:bg-gray-700/30">
                    <TableCell className="font-medium flex items-center gap-2 text-white text-right">
                      <Wrench className="h-4 w-4 text-gray-400" />
                      {getMaintenanceTypeDisplay(record.type)}
                    </TableCell>
                    <TableCell className="text-gray-300 text-right">{record.created}</TableCell>
                    <TableCell className="text-gray-300 text-right">{record.reminderDate}</TableCell>
                    <TableCell className="text-gray-300 text-right font-semibold">
                      {formatPrice(record.price)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(record.status)}
                        <Badge variant={getStatusVariant(record.status)} className="text-xs">
                          {getStatusInArabic(record.status)}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {record.id ? (
                        <div className="flex gap-1 justify-start">
                          {record.status === 'UP_COMING' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleStatusChange(record.id!, 'COMPLETED')}
                                disabled={updatingRecord === record.id}
                                className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1"
                              >
                                {updatingRecord === record.id ? "..." : "إكمال"}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusChange(record.id!, 'CANCELED')}
                                disabled={updatingRecord === record.id}
                                className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white text-xs px-2 py-1"
                              >
                                {updatingRecord === record.id ? "..." : "إلغاء"}
                              </Button>
                            </>
                          )}
                          {record.status === 'COMPLETED' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusChange(record.id!, 'CANCELED')}
                              disabled={updatingRecord === record.id}
                              className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white text-xs px-2 py-1"
                            >
                              {updatingRecord === record.id ? "..." : "إلغاء"}
                            </Button>
                          )}
                          {(record.status === 'CANCELED' || record.status === 'CANCELLED') && (
                            <Button
                              size="sm"
                              onClick={() => handleStatusChange(record.id!, 'UP_COMING')}
                              disabled={updatingRecord === record.id}
                              className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2 py-1"
                            >
                              {updatingRecord === record.id ? "..." : "استرداد"}
                            </Button>
                          )}
                        </div>
                      ) : (
                        <span className="text-gray-500 text-xs">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Wrench className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-white">لا توجد سجلات صيانة</h3>
            <p className="text-gray-400 mb-4">
              هذه المركبة لا تحتوي على سجلات صيانة بعد.
            </p>
            <AddMaintenanceRecordForm 
              onSubmit={handleAddRecord}
              trigger={
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105">
                  <Plus className="ml-2 h-4 w-4" />
                  إضافة سجل صيانة
                </Button>
              }
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
