import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, AlertTriangle, CheckCircle } from "lucide-react"

interface UpcomingMaintenanceRecord {
  id: string
  type: string
  created: string
  reminderDate: string
  vehicleId: string
  vehicleName: string
  vehicleLicense: string
  description: string
  price: number
  status: string
}

interface UpcomingMaintenanceTableProps {
  data: UpcomingMaintenanceRecord[]
  loading?: boolean
  error?: string | null
  getTypeInArabic: (type: string) => string
  onStatusUpdate?: (recordId: string, status: 'COMPLETED' | 'CANCELED') => Promise<void>
  updateLoading?: boolean
}

export function UpcomingMaintenanceTable({ 
  data, 
  loading = false, 
  error = null,
  getTypeInArabic,
  onStatusUpdate,
  updateLoading = false
}: UpcomingMaintenanceTableProps) {
  const [updatingRecord, setUpdatingRecord] = useState<string | null>(null);

  const handleComplete = async (recordId: string) => {
    if (onStatusUpdate) {
      setUpdatingRecord(recordId);
      await onStatusUpdate(recordId, 'COMPLETED');
      setUpdatingRecord(null);
    }
  }

  const handleCancel = async (recordId: string) => {
    if (onStatusUpdate) {
      setUpdatingRecord(recordId);
      await onStatusUpdate(recordId, 'CANCELED');
      setUpdatingRecord(null);
    }
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center">
          <Calendar className="w-6 h-6 ml-2 text-emerald-400" />
          الصيانة القادمة
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-400">جاري التحميل...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-red-400">خطأ في تحميل البيانات</div>
          </div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-400">لا توجد صيانة قادمة</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-600 hover:bg-gray-700/50">
                  <TableHead className="text-gray-300 text-right">اسم المركبة</TableHead>
                  <TableHead className="text-gray-300 text-right">رقم اللوحة</TableHead>
                  <TableHead className="text-gray-300 text-right">نوع الصيانة</TableHead>
                  <TableHead className="text-gray-300 text-right">تمت الصيانة</TableHead>
                  <TableHead className="text-gray-300 text-right">موعد التذكير</TableHead>
                  <TableHead className="text-gray-300 text-right">الإجراء</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => {
                  const reminderDate = new Date(item.reminderDate);
                  const currentDate = new Date();
                  currentDate.setHours(0, 0, 0, 0); // Reset time to compare only dates
                  reminderDate.setHours(0, 0, 0, 0);
                  const isOverdue = reminderDate < currentDate;
                  
                  return (
                  <TableRow 
                    key={item.id} 
                    className={`border-gray-600 hover:bg-gray-700/30 ${isOverdue ? 'bg-red-900/20 border-red-500/30' : ''}`}
                  >
                    <TableCell className="text-white font-medium text-right">{item.vehicleName}</TableCell>
                    <TableCell className="text-gray-300 font-mono text-right">{item.vehicleLicense}</TableCell>
                    <TableCell className="text-white font-medium text-right">
                      {getTypeInArabic(item.type)}
                    </TableCell>
                    <TableCell className="text-gray-300 text-right">
                      {new Date(item.created).toLocaleDateString("en-US", {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      })}
                    </TableCell>
                    <TableCell className={`font-medium text-right ${isOverdue ? 'text-red-400' : 'text-emerald-400'}`}>
                      {new Date(item.reminderDate).toLocaleDateString("en-US", {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      })}
                      {isOverdue && (
                        <span className="mr-2 text-red-500">
                          <AlertTriangle className="w-4 h-4 inline" />
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-start">
                        <Button
                          size="sm"
                          onClick={() => handleComplete(item.id)}
                          disabled={updatingRecord === item.id}
                          className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 hover:scale-105 disabled:opacity-50"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          {updatingRecord === item.id ? "جاري التحديث..." : "تمت"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCancel(item.id)}
                          disabled={updatingRecord === item.id}
                          className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-105 disabled:opacity-50"
                        >
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          {updatingRecord === item.id ? "جاري التحديث..." : "إلغاء"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
