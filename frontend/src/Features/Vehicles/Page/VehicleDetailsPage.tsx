import { useParams, Link } from "react-router-dom"
import { useVehicleById } from "../hooks/useVehicleById"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import NavBar from "../../../Components/NavBar"
import {
  ArrowLeft,
  Calendar,
  Car,
  Palette,
  Hash,
  Clock,
  Wrench,
  Plus,
} from "lucide-react"

export default function VehicleDetails() {
  const { id } = useParams<{ id: string }>()
  const { vehicle, maintenanceRecords, loading, error } = useVehicleById(id || "")

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto" />
          <p className="text-gray-300 text-lg">جاري تحميل تفاصيل المركبة...</p>
        </div>
      </div>
    )
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-red-400 text-6xl">⚠️</div>
          <h2 className="text-2xl font-semibold text-red-400">{error || "لم يتم العثور على المركبة"}</h2>
          <p className="text-gray-400">
            المركبة التي تبحث عنها غير موجودة أو لا يمكن تحميلها.
          </p>
          <Button 
            asChild
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
          >
            <Link to="/my-vehicles" className="flex items-center">
              <ArrowLeft className="ml-2 h-4 w-4" />
              العودة إلى المركبات
            </Link>
          </Button>
        </div>
      </div>
    )
  }

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NavBar />
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            asChild
            className="text-gray-400 hover:text-emerald-400 hover:bg-gray-800/50 transition-all duration-300"
          >
            <Link to="/my-vehicles" className="flex items-center">
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة إلى المركبات
            </Link>
          </Button>
          <div className="h-6 w-px bg-gray-700" />
          <div className="flex items-center gap-2 text-gray-400">
            <Car className="h-4 w-4" />
            <span className="text-sm">تفاصيل المركبة</span>
          </div>
        </div>

        {/* Vehicle Card */}
        <Card className="mb-8 bg-gray-800/50 border-gray-700 shadow-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                <Car className="h-8 w-8 text-emerald-400" />
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  {vehicle.name} {vehicle.model}
                </span>
              </CardTitle>
              <Badge 
                variant="secondary" 
                className="text-sm bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
              >
                {vehicle.year}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-3 p-4 bg-gray-700/30 rounded-lg border border-gray-700">
                <Hash className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">رقم اللوحة</p>
                  <p className="font-semibold text-white">{vehicle.licensePlate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-700/30 rounded-lg border border-gray-700">
                <Palette className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">اللون</p>
                  <p className="font-semibold text-white">{vehicle.color}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-700/30 rounded-lg border border-gray-700">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">السنة</p>
                  <p className="font-semibold text-white">{vehicle.year}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-700/30 rounded-lg border border-gray-700">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-400">آخر صيانة</p>
                  <p className="font-semibold text-white">{vehicle.lastService || "غير محدد"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Records Card */}
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
      </div>
    </div>
  )
}
