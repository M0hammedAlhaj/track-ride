"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MetricCard } from "../Components/MetricCard"
import { useCountVehicles } from "../hooks/useCountVehicles"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Car, Calendar, AlertTriangle, Plus, Clock, TrendingUp, Wrench, CheckCircle, Activity } from "lucide-react"
import NavBar from "../../../Components/NavBar"
import { useFetchUpcoming } from "../hooks/useFetchUpcoming"
import { useRecentVehicle } from "../hooks/useRecentVehicle"
import { useUpcomingMaintenance } from "../hooks/useUpcomingMaintenance"
import { useCountOverdue } from "../hooks/useCountOverdue"
import { useRecentActivity } from "../hooks/useRecentActivity"
import { useMaintenanceTypes } from "../../MaintenanceTypes/hooks/useMaintenanceTypes"
// Types
interface DashboardStats {
  totalVehicles: number
  upcoming: number
  overdue: number
  lastVehicle: string
}

interface ChartDataItem {
  status: string
  count: number
  color: string
}

interface UpcomingMaintenance {
  id: string
  vehicleName: string
  licensePlate: string
  lastServiceDate: string
  nextReminderDate: string
  priority: "high" | "medium" | "low"
}

interface MaintenanceData {
  id: string
  vehicleName: string
  licensePlate: string
  lastServiceDate: string
  nextReminderDate: string
  priority: "high" | "medium" | "low"
}

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

interface RecentActivity {
  id: string
  vehicleName: string
  maintenanceType: string
  date: string
  status: "completed" | "scheduled" | "cancelled"
}

interface DashboardData {
  stats: DashboardStats
  chartData: ChartDataItem[]
  upcomingMaintenance: UpcomingMaintenance[]
}

// Dummy Data
const dashboardData: DashboardData = {
  stats: {
    totalVehicles: 12,
    upcoming: 3,
    overdue: 1,
    lastVehicle: "BMW X5",
  },
  chartData: [
    { status: "نشط", count: 8, color: "#10b981" },
    { status: "يحتاج صيانة", count: 3, color: "#f59e0b" },
    { status: "قيد الصيانة", count: 1, color: "#3b82f6" },
  ],
  upcomingMaintenance: [
    {
      id: "1",
      vehicleName: "Toyota Camry",
      licensePlate: "JOD-123",
      lastServiceDate: "2024-11-15",
      nextReminderDate: "2025-01-15",
      priority: "high",
    },
    {
      id: "2",
      vehicleName: "BMW X5",
      licensePlate: "JOD-456",
      lastServiceDate: "2024-10-20",
      nextReminderDate: "2025-01-20",
      priority: "medium",
    },
    {
      id: "3",
      vehicleName: "Mercedes C-Class",
      licensePlate: "JOD-789",
      lastServiceDate: "2024-12-01",
      nextReminderDate: "2025-02-01",
      priority: "low",
    },
    {
      id: "4",
      vehicleName: "Honda Accord",
      licensePlate: "JOD-321",
      lastServiceDate: "2024-11-30",
      nextReminderDate: "2025-01-30",
      priority: "medium",
    },
  ],
}

// Total Cost Card Component
function TotalCostCard() {
  // Placeholder values - will be replaced with real API data
  const totalCost = 1250.75 // Will come from API
  const monthlyAverage = 208.46 // Will come from API
  const lastMonthCost = 195.30 // Will come from API
  
  const costChange = totalCost > lastMonthCost ? 'increase' : 'decrease'
  const costPercentage = lastMonthCost > 0 ? Math.abs(((totalCost - lastMonthCost) / lastMonthCost) * 100).toFixed(1) : 0

  return (
    <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center">
          <TrendingUp className="w-6 h-6 ml-2 text-emerald-400" />
          إجمالي التكلفة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Total Cost Display */}
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-400 mb-2">
              {totalCost.toFixed(2)} دينار
            </div>
            <p className="text-gray-400 text-sm">إجمالي تكلفة الصيانة</p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">المتوسط الشهري</p>
                  <p className="text-white font-semibold">{monthlyAverage.toFixed(2)} دينار</p>
                </div>
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">الشهر الماضي</p>
                  <p className="text-white font-semibold">{lastMonthCost.toFixed(2)} دينار</p>
                  <div className={`flex items-center mt-1 ${costChange === 'increase' ? 'text-red-400' : 'text-green-400'}`}>
                    {costChange === 'increase' ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingUp className="w-3 h-3 mr-1 rotate-180" />
                    )}
                    <span className="text-xs">{costPercentage}%</span>
                  </div>
                </div>
                <div className={`w-10 h-10 ${costChange === 'increase' ? 'bg-red-500/20' : 'bg-green-500/20'} rounded-lg flex items-center justify-center`}>
                  {costChange === 'increase' ? (
                    <TrendingUp className="w-5 h-5 text-red-400" />
                  ) : (
                    <TrendingUp className="w-5 h-5 text-green-400 rotate-180" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-700">
            <h3 className="text-white font-medium mb-3">تفاصيل التكلفة</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">تغيير الزيت</span>
                <span className="text-white">450.25 دينار</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">فحص الفرامل</span>
                <span className="text-white">320.50 دينار</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">صيانة عامة</span>
                <span className="text-white">480.00 دينار</span>
              </div>
              <div className="border-t border-gray-600 pt-2 mt-2">
                <div className="flex justify-between font-medium">
                  <span className="text-emerald-400">الإجمالي</span>
                  <span className="text-emerald-400">{totalCost.toFixed(2)} دينار</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Chart Component
function MaintenanceChart({ data }: { data: ChartDataItem[] }) {
  const [chartType, setChartType] = useState<"pie" | "bar">("pie")

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{payload[0].payload.status}</p>
          <p className="text-emerald-400">العدد: {payload[0].value}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-white flex items-center">
            <TrendingUp className="w-6 h-6 ml-2 text-emerald-400" />
            حالة المركبات
          </CardTitle>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={chartType === "pie" ? "default" : "outline"}
              onClick={() => setChartType("pie")}
              className={
                chartType === "pie"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "border-gray-600 text-gray-300 hover:bg-gray-700"
              }
            >
              دائري
            </Button>
            <Button
              size="sm"
              variant={chartType === "bar" ? "default" : "outline"}
              onClick={() => setChartType("bar")}
              className={
                chartType === "bar"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "border-gray-600 text-gray-300 hover:bg-gray-700"
              }
            >
              أعمدة
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "pie" ? (
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ status, count }) => `${status}: ${count}`}
                  labelLine={false}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            ) : (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="status" tick={{ fill: "#9CA3AF" }} />
                <YAxis tick={{ fill: "#9CA3AF" }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

// Upcoming Maintenance Table Component
function UpcomingMaintenanceTable({ 
  data, 
  loading = false, 
  error = null,
  getTypeInArabic
}: { 
  data: UpcomingMaintenanceRecord[]
  loading?: boolean
  error?: string | null
  getTypeInArabic: (type: string) => string
}) {
  const handleComplete = (recordId: string) => {
    console.log('Complete maintenance:', recordId)
    // TODO: Implement complete maintenance API call
  }

  const handleCancel = (recordId: string) => {
    console.log('Cancel maintenance:', recordId)
    // TODO: Implement cancel maintenance API call
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
                {data.map((item) => (
                  <TableRow key={item.id} className="border-gray-600 hover:bg-gray-700/30">
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
                    <TableCell className="text-emerald-400 font-medium text-right">
                      {new Date(item.reminderDate).toLocaleDateString("en-US", {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-start">
                        <Button
                          size="sm"
                          onClick={() => handleComplete(item.id)}
                          className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 hover:scale-105"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          تمت
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCancel(item.id)}
                          className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-105"
                        >
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          إلغاء
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Recent Activity Component
function RecentActivityList({ data, loading, error }: { data: RecentActivity[], loading?: boolean, error?: string | null }) {
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
                    <p className="text-gray-400 text-sm">{activity.maintenanceType}</p>
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

// Quick Actions Component
function QuickActions() {
  return (
    <></>
  )
}

// Main Dashboard Component
export default function Dashboard() {
  const { stats, chartData } = dashboardData // Remove recentActivity from dummy data
  const {count,loading,error  } = useCountVehicles()
  const { upcomingDate, loading: upcomingLoading, error: upcomingError } =useFetchUpcoming()
  const { vehicle, loading:recentLoading, error:recentError } = useRecentVehicle();
  const { data: upcomingMaintenanceData, loading: upcomingMaintenanceLoading, error: upcomingMaintenanceError } = useUpcomingMaintenance();
  const { count: overdueCount, loading: overdueLoading, error: overdueError } = useCountOverdue();
  const { activities: recentActivity, loading: recentActivityLoading, error: recentActivityError } = useRecentActivity();
  const { getTypeInArabic } = useMaintenanceTypes();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <NavBar/>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
            لوحة التحكم
          </h1>
          <p className="text-gray-400">نظرة شاملة على حالة أسطولك وجدولة الصيانة</p>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="إجمالي المركبات"
            value={loading ? "..." : error ? "خطأ" : count}
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
            value={recentLoading ? "..." : recentError ? "خطأ" : vehicle?.name || "لا توجد مركبات"}
            icon={Plus}
            gradient="from-purple-500 to-indigo-600"
          />
        </div>

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
          />
        </div>

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </div>
  )
}
