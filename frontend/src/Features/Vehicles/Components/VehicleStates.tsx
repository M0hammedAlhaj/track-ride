import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface LoadingStateProps {
  message?: string
}

interface ErrorStateProps {
  error?: string | null
}

export function LoadingState({ message = "جاري تحميل تفاصيل المركبة..." }: LoadingStateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400 mx-auto" />
        <p className="text-gray-300 text-lg">{message}</p>
      </div>
    </div>
  )
}

export function ErrorState({ error = "لم يتم العثور على المركبة" }: ErrorStateProps) {
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
          <Link to="/vehicles" className="flex items-center">
            <ArrowLeft className="ml-2 h-4 w-4" />
            العودة إلى المركبات
          </Link>
        </Button>
      </div>
    </div>
  )
}
