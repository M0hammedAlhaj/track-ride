"use client"

import NavBar from "../../../Components/NavBar"
import { useFetchUpcoming } from "../hooks/useFetchUpcoming"
import { useRecentVehicle } from "../hooks/useRecentVehicle"
import { useUpcomingMaintenance } from "../hooks/useUpcomingMaintenance"
import { useCountOverdue } from "../hooks/useCountOverdue"
import { useRecentActivity } from "../hooks/useRecentActivity"
import { useMaintenanceTypes } from "../../MaintenanceTypes/hooks/useMaintenanceTypes"
import { useUpdateMaintenanceStatus } from "../hooks/useUpdateMaintenanceStatus"
import { useCountVehicles } from "../hooks/useCountVehicles"
import {
  DashboardHeader,
  DashboardMetrics,
  ErrorDisplay,
  TotalCostCard,
  RecentActivityList,
  UpcomingMaintenanceTable
} from "../Components"

// Types
interface ChartDataItem {
  status: string
  count: number
  color: string
}

interface DashboardData {
  chartData: ChartDataItem[]
}

// Dummy Data for chart
const dashboardData: DashboardData = {
  chartData: [
    { status: "نشط", count: 8, color: "#10b981" },
    { status: "يحتاج صيانة", count: 3, color: "#f59e0b" },
    { status: "قيد الصيانة", count: 1, color: "#3b82f6" },
  ],
}

// Main Dashboard Component
export default function Dashboard() {
  const { chartData } = dashboardData
  const { count, loading, error } = useCountVehicles()
  const { upcomingDate, loading: upcomingLoading, error: upcomingError } = useFetchUpcoming()
  const { vehicle, loading: recentLoading, error: recentError } = useRecentVehicle()
  const { data: upcomingMaintenanceData, loading: upcomingMaintenanceLoading, error: upcomingMaintenanceError, refetch: refetchUpcomingMaintenance } = useUpcomingMaintenance()
  const { count: overdueCount, loading: overdueLoading, error: overdueError } = useCountOverdue()
  const { activities: recentActivity, loading: recentActivityLoading, error: recentActivityError } = useRecentActivity()
  const { getTypeInArabic } = useMaintenanceTypes()
  const { updateStatus, loading: updateLoading, error: updateError } = useUpdateMaintenanceStatus()

  const handleStatusUpdate = async (recordId: string, status: 'COMPLETED' | 'CANCELED') => {
    const success = await updateStatus(recordId, status)
    if (success) {
      // Refresh the upcoming maintenance data
      await refetchUpcomingMaintenance()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NavBar />
        
        {/* Header */}
        <DashboardHeader />

        {/* Error Display */}
        <ErrorDisplay error={updateError} />

        {/* Metrics Cards */}
        <DashboardMetrics
          vehicleCount={count}
          vehicleLoading={loading}
          vehicleError={error}
          upcomingDate={upcomingDate ?? 0}
          upcomingLoading={upcomingLoading}
          upcomingError={upcomingError}
          overdueCount={overdueCount}
          overdueLoading={overdueLoading}
          overdueError={overdueError}
          recentVehicleName={vehicle?.name || null}
          recentLoading={recentLoading}
          recentError={recentError}
        />

        {/* Chart and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <TotalCostCard />
          </div>
          <div>
            <RecentActivityList 
              data={recentActivityLoading ? [] : recentActivityError ? [] : recentActivity} 
              loading={recentActivityLoading}
              error={recentActivityError}
            />
          </div>
        </div>

        {/* Upcoming Maintenance Table */}
        <div className="mb-8">
          <UpcomingMaintenanceTable 
            data={upcomingMaintenanceLoading ? [] : upcomingMaintenanceError ? [] : upcomingMaintenanceData} 
            loading={upcomingMaintenanceLoading}
            error={upcomingMaintenanceError}
            getTypeInArabic={getTypeInArabic}
            onStatusUpdate={handleStatusUpdate}
            updateLoading={updateLoading}
          />
        </div>
      </div>
    </div>
  )
}
