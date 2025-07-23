import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { useTotalCost } from "../hooks/useTotalCost"
import { useLastMonthCost } from "../hooks/useLastMonthCost"
import { useCostDetails } from "../hooks/useCostDetails"
import { getMaintenanceTypeInArabic } from "../../MaintenanceTypes/api"

export function TotalCostCard() {
  const { totalCost, loading, error } = useTotalCost()
  const { lastMonthCost, loading: lastMonthLoading, error: lastMonthError } = useLastMonthCost()
  const { costDetails, loading: costDetailsLoading, error: costDetailsError } = useCostDetails()
  
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
              {loading ? "جاري التحميل..." : error ? "خطأ في التحميل" : `${totalCost.toFixed(2)} دينار`}
            </div>
            <p className="text-gray-400 text-sm">إجمالي تكلفة الصيانة</p>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-700/30 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">الشهر الماضي</p>
                  <p className="text-white font-semibold">
                    {lastMonthLoading ? "جاري التحميل..." : lastMonthError ? "خطأ" : `${lastMonthCost.toFixed(2)} دينار`}
                  </p>
                  {!lastMonthLoading && !lastMonthError && (
                    <div className={`flex items-center mt-1 ${costChange === 'increase' ? 'text-red-400' : 'text-green-400'}`}>
                      {costChange === 'increase' ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingUp className="w-3 h-3 mr-1 rotate-180" />
                      )}
                      <span className="text-xs">{costPercentage}%</span>
                    </div>
                  )}
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
            {costDetailsLoading ? (
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between text-sm animate-pulse">
                    <div className="h-4 bg-gray-600 rounded w-20"></div>
                    <div className="h-4 bg-gray-600 rounded w-16"></div>
                  </div>
                ))}
              </div>
            ) : costDetailsError ? (
              <div className="text-center py-4">
                <p className="text-red-400 text-sm">خطأ في تحميل تفاصيل التكلفة</p>
              </div>
            ) : (
              <div className="space-y-2">
                {Object.entries(costDetails).map(([type, cost]) => (
                  cost !== undefined && (
                    <div key={type} className="flex justify-between text-sm">
                      <span className="text-gray-400">{getMaintenanceTypeInArabic(type)}</span>
                      <span className="text-white">{cost.toFixed(2)} دينار</span>
                    </div>
                  )
                ))}
                <div className="border-t border-gray-600 pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span className="text-emerald-400">الإجمالي</span>
                    <span className="text-emerald-400">
                      {loading ? "جاري التحميل..." : error ? "خطأ" : `${totalCost.toFixed(2)} دينار`}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
