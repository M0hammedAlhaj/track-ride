import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Calendar, DollarSign, Settings, FileText, Loader2 } from "lucide-react"
import { useMaintenanceTypes } from "../hooks/useMaintenanceTypes"
import { MaintenanceType } from "../../../types"

interface MaintenanceRecordFormData {
  type: string
  description: string
  price: number
  reminderDate: string
  useCustomReminder: boolean
}

interface AddMaintenanceRecordFormProps {
  onSubmit: (data: MaintenanceRecordFormData) => void
  trigger?: React.ReactNode
}

export default function AddMaintenanceRecordForm({ onSubmit, trigger }: AddMaintenanceRecordFormProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { maintenanceTypes, loading: typesLoading, error: typesError } = useMaintenanceTypes()
  
  // Helper function to get maintenance type by key
  const getMaintenanceTypeByKey = (key: string): MaintenanceType | undefined => {
    return maintenanceTypes?.find(type => type.key === key)
  }
  
  // Helper function to calculate default reminder date based on service type
  const getDefaultReminderDate = (serviceTypeKey: string = '') => {
    const date = new Date()
    const maintenanceType = getMaintenanceTypeByKey(serviceTypeKey)
    const days = maintenanceType?.timeInterval || 180 // Default to 180 days if not found
    date.setDate(date.getDate() + days)
    return date.toISOString().split('T')[0]
  }
  
  const [formData, setFormData] = useState<MaintenanceRecordFormData>({
    type: '',
    description: '',
    price: 0.01, // Start with minimum valid price instead of 0
    reminderDate: getDefaultReminderDate(),
    useCustomReminder: false
  })

  const handleInputChange = (field: keyof MaintenanceRecordFormData, value: string | number | boolean) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value }
      
      // Auto-update reminder date when service type changes and not using custom reminder
      if (field === 'type' && !prev.useCustomReminder) {
        newData.reminderDate = getDefaultReminderDate(value as string)
      }
      
      return newData
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await onSubmit(formData)
      setOpen(false)
      // Reset form
      setFormData({
        type: '',
        description: '',
        price: 0.01, // Reset to minimum valid price
        reminderDate: getDefaultReminderDate(),
        useCustomReminder: false
      })
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button 
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
            size="sm"
          >
            <Plus className="ml-2 h-4 w-4" />
            إضافة سجل جديد
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-gray-800 border-gray-700 text-white" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2 text-white">
            <Plus className="h-5 w-5 text-emerald-400" />
            إضافة سجل صيانة جديد
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            قم بإضافة سجل صيانة جديد للمركبة مع تحديد نوع الخدمة والتفاصيل المطلوبة
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Maintenance Type */}
          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Settings className="h-4 w-4 text-emerald-400" />
              نوع الخدمة
            </Label>
            {typesLoading ? (
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md">
                <Loader2 className="h-4 w-4 animate-spin text-emerald-400" />
                <span className="text-gray-300">جاري تحميل أنواع الخدمات...</span>
              </div>
            ) : typesError ? (
              <div className="space-y-2">
                <div className="px-3 py-2 bg-red-900/20 border border-red-600 rounded-md text-red-400 text-sm">
                  <p className="font-medium">خطأ في تحميل أنواع الخدمات:</p>
                  <p>{typesError}</p>
                </div>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                >
                  <option value="">اختر نوع الخدمة (البيانات الافتراضية)</option>
                  {maintenanceTypes?.map((type) => (
                    <option key={type.key} value={type.key}>
                      {type.arabicName}
                    </option>
                  )) || []}
                </select>
                <p className="text-xs text-yellow-400">
                  تم تحميل البيانات الافتراضية بسبب عدم توفر الاتصال بالخادم
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                >
                  <option value="">اختر نوع الخدمة</option>
                  {maintenanceTypes?.map((type) => (
                    <option key={type.key} value={type.key}>
                      {type.arabicName}
                    </option>
                  )) || []}
                </select>
                {maintenanceTypes && maintenanceTypes.length > 0 && (
                  <p className="text-xs text-emerald-400">
                    تم تحميل {maintenanceTypes.length} أنواع خدمات من الخادم
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <FileText className="h-4 w-4 text-emerald-400" />
              وصف الخدمة
            </Label>
            <textarea
              id="description"
              placeholder="أدخل وصف تفصيلي للخدمة المطلوبة..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
              rows={3}
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-emerald-400" />
              السعر (دينار أردني)
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="0.01"
              value={formData.price || ''}
              onChange={(e) => {
                const value = parseFloat(e.target.value)
                // Ensure minimum price is 0.01 (greater than zero as required by backend)
                handleInputChange('price', value > 0 ? value : 0.01)
              }}
              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500"
              min="0.01"
              step="0.01"
            />
          </div>

          {/* Reminder Date */}
          <div className="space-y-2">
            <Label htmlFor="reminderDate" className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-emerald-400" />
              تاريخ التذكير التالي
            </Label>
            
            {/* Toggle for custom reminder */}
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                id="useCustomReminder"
                checked={formData.useCustomReminder}
                onChange={(e) => handleInputChange('useCustomReminder', e.target.checked)}
                className="w-4 h-4 text-emerald-600 bg-gray-700 border-gray-600 rounded focus:ring-emerald-500"
              />
              <Label htmlFor="useCustomReminder" className="text-sm text-gray-300">
                تخصيص تاريخ التذكير
              </Label>
            </div>
            
            {!formData.useCustomReminder && formData.type && (
              <div className="text-xs text-emerald-400 mb-2">
                التذكير التلقائي: {Math.ceil((getMaintenanceTypeByKey(formData.type)?.timeInterval || 180) / 30)} شهر من اليوم
              </div>
            )}
            
            <Input
              id="reminderDate"
              type="date"
              value={formData.reminderDate}
              onChange={(e) => handleInputChange('reminderDate', e.target.value)}
              disabled={!formData.useCustomReminder}
              className={`bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-emerald-500 ${
                !formData.useCustomReminder ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            />
            
            {!formData.useCustomReminder ? (
              <p className="text-xs text-gray-400">
                التاريخ يُحدد تلقائياً حسب نوع الخدمة المختارة
              </p>
            ) : (
              <p className="text-xs text-gray-400">
                يمكنك تحديد تاريخ مخصص للتذكير
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                'إضافة السجل'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              disabled={isSubmitting}
            >
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
