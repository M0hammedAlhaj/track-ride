import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, AlertTriangle } from "lucide-react"
import { getMaintenanceTypeInArabic } from "../../MaintenanceTypes/api"

interface RecentActivity {
  id: string
  vehicleName: string
  maintenanceType: string
  date: string
  status: "completed" | "scheduled" | "cancelled"
}

interface RecentActivityListProps {
  data: RecentActivity[]
  loading?: boolean
  error?: string | null
}

export function RecentActivityList({ data, loading, error }: RecentActivityListProps) {
  return (
    <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center">
          <Activity className="w-6 h-6 ml-2 text-emerald-400" />
          النشاط الأخير
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg animate-pulse">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-10 h-10 bg-gray-600/50 rounded-lg"></div>
                  <div>
                    <div className="w-32 h-4 bg-gray-600/50 rounded mb-2"></div>
                    <div className="w-24 h-3 bg-gray-600/50 rounded"></div>
                  </div>
                </div>
                <div className="text-left">
                  <div className="w-20 h-3 bg-gray-600/50 rounded mb-1"></div>
                  <div className="w-16 h-6 bg-gray-600/50 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 mb-2">خطأ في تحميل النشاط الأخير</p>
            <p className="text-gray-400 text-sm">{error}</p>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-8">
            <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">لا يوجد نشاط حديث</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors duration-300"
              >
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{activity.vehicleName}</p>
                    <p className="text-gray-400 text-sm">{getMaintenanceTypeInArabic(activity.maintenanceType)}</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-gray-300 text-sm mb-1">{new Date(activity.date).toLocaleDateString("en-US", {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
