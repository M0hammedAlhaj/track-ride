import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Car } from "lucide-react"

export default function VehicleDetailsHeader() {
  return (
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
  )
}
