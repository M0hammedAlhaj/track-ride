import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { TrendingUp } from "lucide-react"

interface ChartDataItem {
  status: string
  count: number
  color: string
}

interface MaintenanceChartProps {
  data: ChartDataItem[]
}

export function MaintenanceChart({ data }: MaintenanceChartProps) {
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
