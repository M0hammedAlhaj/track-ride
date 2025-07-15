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
import React from "react"
import NavBar from "../../../Components/NavBar"

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
  recentActivity: RecentActivity[]
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
  recentActivity: [
    {
      id: "1",
      vehicleName: "Toyota Camry",
      maintenanceType: "تغيير الزيت",
      date: "2024-12-15",
      status: "completed",
    },
    {
      id: "2",
      vehicleName: "BMW X5",
      maintenanceType: "فحص الفرامل",
      date: "2024-12-14",
      status: "completed",
    },
    {
      id: "3",
      vehicleName: "Mercedes C-Class",
      maintenanceType: "صيانة دورية",
      date: "2024-12-13",
      status: "scheduled",
    },
    {
      id: "4",
      vehicleName: "Honda Accord",
      maintenanceType: "تغيير الإطارات",
      date: "2024-12-12",
      status: "completed",
    },
    {
      id: "5",
      vehicleName: "Nissan Altima",
      maintenanceType: "فحص المحرك",
      date: "2024-12-11",
      status: "cancelled",
    },
  ],
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
function UpcomingMaintenanceTable({ data }: { data: UpcomingMaintenance[] }) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "high":
        return "عالية"
      case "medium":
        return "متوسطة"
      case "low":
        return "منخفضة"
      default:
        return "غير محدد"
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
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-600 hover:bg-gray-700/50">
                <TableHead className="text-gray-300">اسم المركبة</TableHead>
                <TableHead className="text-gray-300">رقم اللوحة</TableHead>
                <TableHead className="text-gray-300">آخر صيانة</TableHead>
                <TableHead className="text-gray-300">التذكير القادم</TableHead>
                <TableHead className="text-gray-300">الأولوية</TableHead>
                <TableHead className="text-gray-300">الإجراء</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="border-gray-600 hover:bg-gray-700/30">
                  <TableCell className="text-white font-medium">{item.vehicleName}</TableCell>
                  <TableCell className="text-gray-300 font-mono">{item.licensePlate}</TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(item.lastServiceDate).toLocaleDateString("ar-SA")}
                  </TableCell>
                  <TableCell className="text-emerald-400 font-medium">
                    {new Date(item.nextReminderDate).toLocaleDateString("ar-SA")}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getPriorityColor(item.priority)} border`}>
                      {getPriorityLabel(item.priority)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 hover:scale-105"
                    >
                      <Clock className="w-4 h-4 ml-1" />
                      جدولة
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

// Recent Activity Component
function RecentActivityList({ data }: { data: RecentActivity[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "scheduled":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "مكتملة"
      case "scheduled":
        return "مجدولة"
      case "cancelled":
        return "ملغية"
      default:
        return "غير محدد"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return CheckCircle
      case "scheduled":
        return Clock
      case "cancelled":
        return AlertTriangle
      default:
        return Activity
    }
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center">
          <Activity className="w-6 h-6 ml-2 text-emerald-400" />
          النشاط الأخير
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((activity) => {
            const StatusIcon = getStatusIcon(activity.status)
            return (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors duration-300"
              >
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <StatusIcon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{activity.vehicleName}</p>
                    <p className="text-gray-400 text-sm">{activity.maintenanceType}</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-gray-300 text-sm mb-1">{new Date(activity.date).toLocaleDateString("ar-SA")}</p>
                  <Badge className={`${getStatusColor(activity.status)} border text-xs`}>
                    {getStatusLabel(activity.status)}
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

// Quick Actions Component
function QuickActions() {
  return (
    <>
      {/* Desktop Quick Actions */}
      <div className="hidden md:flex gap-4 mt-8">
        <Button
          size="lg"
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة مركبة جديدة
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-gray-900 transition-all duration-300 hover:scale-105 bg-transparent"
        >
          <Wrench className="w-5 h-5 ml-2" />
          تسجيل صيانة
        </Button>
      </div>

      {/* Mobile Floating Action Buttons */}
      <div className="md:hidden fixed bottom-6 left-6 z-50 flex flex-col gap-3">
        <Button
          size="lg"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-110"
        >
          <Plus className="w-6 h-6" />
        </Button>
        <Button
          size="lg"
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-110"
        >
          <Wrench className="w-6 h-6" />
        </Button>
      </div>
    </>
  )
}

// Main Dashboard Component
export default function Dashboard() {
  const { stats, chartData, upcomingMaintenance, recentActivity } = dashboardData
  const {count,loading,error  } = useCountVehicles()
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
            value={null}
            icon={Calendar}
            gradient="from-blue-500 to-cyan-600"
          />
          <MetricCard
            title="الصيانة المتأخرة"
            value={null}
            icon={AlertTriangle}
            gradient="from-red-500 to-pink-600"
          />
          <MetricCard
            title="آخر مركبة مضافة"
            value={null}
            icon={Plus}
            gradient="from-purple-500 to-indigo-600"
          />
        </div>

        {/* Chart and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <MaintenanceChart data={chartData} />
          </div>
          <div>
            <RecentActivityList data={recentActivity} />
          </div>
        </div>

        {/* Upcoming Maintenance Table */}
        <div className="mb-8">
          <UpcomingMaintenanceTable data={upcomingMaintenance} />
        </div>

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </div>
  )
}
