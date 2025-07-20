import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Car, Palette, Hash, Clock } from "lucide-react"
import { Vehicle } from "../../../types"

interface VehicleInfoCardProps {
  vehicle: Vehicle
}

export default function VehicleInfoCard({ vehicle }: VehicleInfoCardProps) {
  return (
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
              <p className="font-semibold text-white">
                {vehicle.lastService 
                  ? new Date(vehicle.lastService).toLocaleDateString("ar-EG", {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  : "غير محدد"
                }
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
