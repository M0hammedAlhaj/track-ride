import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormError, FormFieldWrapper } from "@/components/ui/form-error"
import { Plus, Calendar, DollarSign, Settings, FileText, Loader2 } from "lucide-react"
import { useMaintenanceTypes } from "../hooks/useMaintenanceTypes"
import { maintenanceRecordSchema, type MaintenanceRecordFormData as ValidationFormData } from "../../../lib/validations"
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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
    setError,
  } = useForm<ValidationFormData>({
    resolver: zodResolver(maintenanceRecordSchema),
    defaultValues: {
      type: '',
      description: '',
      price: 0.01,
      reminderDate: getDefaultReminderDate(),
      useCustomReminder: false
    },
  });

  const watchedType = watch('type');
  const watchedUseCustomReminder = watch('useCustomReminder');

  // Auto-update reminder date when service type changes and not using custom reminder
  useEffect(() => {
    if (watchedType && !watchedUseCustomReminder) {
      setValue('reminderDate', getDefaultReminderDate(watchedType));
    }
  }, [watchedType, watchedUseCustomReminder, setValue]);

  const onFormSubmit = async (data: ValidationFormData) => {
    try {
      const formData: MaintenanceRecordFormData = {
        type: data.type,
        description: data.description,
        price: data.price,
        reminderDate: data.reminderDate,
        useCustomReminder: data.useCustomReminder
      };
      
      await onSubmit(formData);
      setOpen(false);
      reset();
    } catch (error: any) {
      // Handle specific field errors if they come from the server
      if (error.response?.data?.errors) {
        const serverErrors = error.response.data.errors;
        Object.entries(serverErrors).forEach(([field, message]) => {
          setError(field as keyof ValidationFormData, {
            type: 'server',
            message: message as string,
          });
        });
      }
    }
  };  return (
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
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* Maintenance Type */}
          <FormFieldWrapper error={errors.type?.message}>
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
                  {...register("type")}
                  className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    errors.type ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : ''
                  }`}
                  disabled={isSubmitting}
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
                  {...register("type")}
                  className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    errors.type ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : ''
                  }`}
                  disabled={isSubmitting}
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
          </FormFieldWrapper>

          {/* Description */}
          <FormFieldWrapper error={errors.description?.message}>
            <Label htmlFor="description" className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <FileText className="h-4 w-4 text-emerald-400" />
              وصف الخدمة <span className="text-gray-500 text-xs">(اختياري)</span>
            </Label>
            <textarea
              id="description"
              placeholder="أدخل وصف تفصيلي للخدمة المطلوبة... (اختياري)"
              {...register("description")}
              className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.description ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : ''
              }`}
              rows={3}
              disabled={isSubmitting}
            />
          </FormFieldWrapper>

          {/* Price */}
          <FormFieldWrapper error={errors.price?.message}>
            <Label htmlFor="price" className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-emerald-400" />
              السعر (دينار أردني)
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="0.01"
              {...register("price", { 
                valueAsNumber: true,
                setValueAs: (v) => v === "" ? 0.01 : parseFloat(v)
              })}
              className={`bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 ${
                errors.price ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : ''
              }`}
              min="0.01"
              step="0.01"
              disabled={isSubmitting}
            />
          </FormFieldWrapper>

          {/* Reminder Date */}
          <FormFieldWrapper error={errors.reminderDate?.message}>
            <Label htmlFor="reminderDate" className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-emerald-400" />
              تاريخ التذكير التالي
            </Label>
            
            {/* Toggle for custom reminder */}
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                id="useCustomReminder"
                {...register("useCustomReminder")}
                className="w-4 h-4 text-emerald-600 bg-gray-700 border-gray-600 rounded focus:ring-emerald-500"
                disabled={isSubmitting}
              />
              <Label htmlFor="useCustomReminder" className="text-sm text-gray-300">
                تخصيص تاريخ التذكير
              </Label>
            </div>
            
            {!watchedUseCustomReminder && watchedType && (
              <div className="text-xs text-emerald-400 mb-2">
                التذكير التلقائي: {Math.ceil((getMaintenanceTypeByKey(watchedType)?.timeInterval || 180) / 30)} شهر من اليوم
              </div>
            )}
            
            <Input
              id="reminderDate"
              type="date"
              {...register("reminderDate")}
              disabled={!watchedUseCustomReminder || isSubmitting}
              className={`bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-emerald-500 ${
                !watchedUseCustomReminder ? 'opacity-50 cursor-not-allowed' : ''
              } ${errors.reminderDate ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : ''}`}
            />
            
            {!watchedUseCustomReminder ? (
              <p className="text-xs text-gray-400">
                التاريخ يُحدد تلقائياً حسب نوع الخدمة المختارة
              </p>
            ) : (
              <p className="text-xs text-gray-400">
                يمكنك تحديد تاريخ مخصص للتذكير
              </p>
            )}
          </FormFieldWrapper>

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
