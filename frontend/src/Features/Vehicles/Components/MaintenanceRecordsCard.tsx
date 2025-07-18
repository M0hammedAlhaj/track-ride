import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Wrench, Plus } from "lucide-react"

interface MaintenanceRecord {
  type: string
  created: string
  reminderDate: string
}

interface MaintenanceRecordsCardProps {
  maintenanceRecords: MaintenanceRecord[]
}

export default function MaintenanceRecordsCard({ maintenanceRecords }: MaintenanceRecordsCardProps) {
  const getMaintenanceTypeBadge = (type: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      "Oil Change": "default",
      "Tire Rotation": "secondary",
      "Brake Service": "destructive",
      "General Inspection": "outline",
    }
    return variants[type] || "outline"
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700 shadow-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white">
            <Wrench className="h-5 w-5 text-emerald-400" />
            سجل الصيانة
          </CardTitle>
          <Button 
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
            size="sm"
          >
            <Plus className="ml-2 h-4 w-4" />
            إضافة سجل جديد
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {maintenanceRecords.length > 0 ? (
          <div className="rounded-md border border-gray-700 bg-gray-800/30">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-700/30">
                  <TableHead className="font-semibold text-gray-300 text-right">نوع الخدمة</TableHead>
                  <TableHead className="font-semibold text-gray-300 text-right">تاريخ الإنشاء</TableHead>
                  <TableHead className="font-semibold text-gray-300 text-right">تاريخ التذكير</TableHead>
                  <TableHead className="font-semibold text-gray-300 text-right">الحالة</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maintenanceRecords.map((record, index) => (
                  <TableRow key={index} className="border-gray-700 hover:bg-gray-700/30">
                    <TableCell className="font-medium flex items-center gap-2 text-white text-right">
                      <Wrench className="h-4 w-4 text-gray-400" />
                      {record.type}
                    </TableCell>
                    <TableCell className="text-gray-300 text-right">{record.created}</TableCell>
                    <TableCell className="text-gray-300 text-right">{record.reminderDate}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={getMaintenanceTypeBadge(record.type)} className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                        {record.type}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
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
            <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105">
              <Plus className="ml-2 h-4 w-4" />
              إضافة سجل صيانة
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
