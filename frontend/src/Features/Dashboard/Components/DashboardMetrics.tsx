import { MetricCard } from "../Components/MetricCard"
import { Car, Calendar, AlertTriangle, Plus } from "lucide-react"

interface DashboardMetricsProps {
  vehicleCount: number
  vehicleLoading: boolean
  vehicleError: string | null
  upcomingDate: number
  upcomingLoading: boolean
  upcomingError: string | null
  overdueCount: number
  overdueLoading: boolean
  overdueError: string | null
  recentVehicleName: string | null
  recentLoading: boolean
  recentError: string | null
}

export function DashboardMetrics({
  vehicleCount,
  vehicleLoading,
  vehicleError,
  upcomingDate,
  upcomingLoading,
  upcomingError,
  overdueCount,
  overdueLoading,
  overdueError,
  recentVehicleName,
  recentLoading,
  recentError
}: DashboardMetricsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MetricCard
        title="إجمالي المركبات"
        value={vehicleLoading ? "..." : vehicleError ? "خطأ" : vehicleCount}
        icon={Car}
        gradient="from-emerald-500 to-teal-600"
      />
      <MetricCard
        title="الصيانة القادمة"
        value={upcomingLoading ? "..." : upcomingError ? "خطأ" : (upcomingDate ?? 0)}
        icon={Calendar}
        gradient="from-blue-500 to-cyan-600"
      />
      <MetricCard
        title="الصيانة المتأخرة"
        value={overdueLoading ? "..." : overdueError ? "خطأ" : overdueCount}
        icon={AlertTriangle}
        gradient="from-red-500 to-pink-600"
      />
      <MetricCard
        title="آخر مركبة مضافة"
        value={recentLoading ? "..." : recentError ? "خطأ" : recentVehicleName || "لا توجد مركبات"}
        icon={Plus}
        gradient="from-purple-500 to-indigo-600"
      />
    </div>
  )
}
