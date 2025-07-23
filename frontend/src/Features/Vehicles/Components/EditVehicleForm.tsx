import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FormError, FormFieldWrapper } from "@/components/ui/form-error"
import { Car, Calendar, Hash, Palette, Loader2, CheckCircle, XCircle, Edit } from "lucide-react"
import type { Vehicle } from "../../../types"
import { useUpdateVehicle } from "../hooks"
import { vehicleSchema, type VehicleFormData } from "../../../lib/validations"

interface EditVehicleFormProps {
  vehicle: Vehicle
  open: boolean
  onOpenChange: (open: boolean) => void
  onVehicleUpdated?: () => void
}

export default function EditVehicleForm({ vehicle, open, onOpenChange, onVehicleUpdated }: EditVehicleFormProps) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const { updateVehicle, loading: updateLoading, error: updateError } = useUpdateVehicle()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      name: vehicle.name || "",
      model: vehicle.model || "",
      year: vehicle.year?.toString() || "",
      license: vehicle.licensePlate || "",
      color: vehicle.color || ""
    },
  });

  const loading = updateLoading
  const error = updateError

  // Reset form when modal opens or vehicle changes
  useEffect(() => {
    if (open) {
      reset({
        name: vehicle.name || "",
        model: vehicle.model || "",
        year: vehicle.year?.toString() || "",
        license: vehicle.licensePlate || "",
        color: vehicle.color || ""
      });
      setSubmitStatus('idle')
    }
  }, [open, vehicle, reset])

  const onSubmit = async (data: VehicleFormData) => {
    // Check if vehicle ID exists
    if (!vehicle.id) {
      setSubmitStatus('error')
      return
    }

    setSubmitStatus('idle')
    
    try {
      const payload = {
        name: data.name.trim(),
        model: data.model.trim(),
        year: parseInt(data.year),
        license: data.license.trim(),
        color: data.color.trim()
      }

      const result = await updateVehicle(vehicle.id, payload)
      setSubmitStatus('success')
      
      // Close modal after success
      setTimeout(() => {
        onOpenChange(false)
        setSubmitStatus('idle')
        
        if (onVehicleUpdated) {
          onVehicleUpdated()
        }
      }, 1500)
      
    } catch (err: any) {
      setSubmitStatus('error')
      // Handle specific field errors if they come from the server
      if (err.response?.data?.errors) {
        const serverErrors = err.response.data.errors;
        Object.entries(serverErrors).forEach(([field, message]) => {
          setError(field as keyof VehicleFormData, {
            type: 'server',
            message: message as string,
          });
        });
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-gray-800 border-gray-700 text-white" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2 text-white">
            <Edit className="h-5 w-5 text-emerald-400" />
            تعديل بيانات المركبة
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            قم بتعديل تفاصيل المركبة وحفظ التغييرات
          </DialogDescription>
        </DialogHeader>

        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <Alert className="bg-emerald-900/20 border-emerald-600">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            <AlertDescription className="text-emerald-300">
              <strong>نجح!</strong> تم تحديث بيانات المركبة بنجاح
            </AlertDescription>
          </Alert>
        )}

        {submitStatus === 'error' && (
          <Alert className="bg-red-900/20 border-red-600">
            <XCircle className="h-4 w-4 text-red-400" />
            <AlertDescription className="text-red-300">
              <strong>خطأ:</strong> {error || 'حدث خطأ أثناء العملية'}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <fieldset disabled={isSubmitting}>
            {/* Vehicle Name */}
            <FormFieldWrapper error={errors.name?.message}>
              <Label htmlFor="name" className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Car className="h-4 w-4 text-emerald-400" />
                اسم المركبة
              </Label>
              <Input
                id="name"
                placeholder="أدخل اسم المركبة (مثل: سيارتي الشخصية)"
                {...register("name")}
                className={`bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 ${
                  errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : ''
                }`}
                disabled={isSubmitting}
              />
            </FormFieldWrapper>

          {/* Model */}
          <FormFieldWrapper error={errors.model?.message}>
            <Label htmlFor="model" className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Hash className="h-4 w-4 text-emerald-400" />
              الموديل
            </Label>
            <Input
              id="model"
              placeholder="أدخل موديل المركبة (مثل: تويوتا كامري)"
              {...register("model")}
              className={`bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 ${
                errors.model ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : ''
              }`}
              disabled={isSubmitting}
            />
          </FormFieldWrapper>

          {/* Year */}
          <FormFieldWrapper error={errors.year?.message}>
            <Label htmlFor="year" className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-emerald-400" />
              سنة الصنع
            </Label>
            <Input
              id="year"
              placeholder="أدخل سنة الصنع (مثل: 2020)"
              type="number"
              {...register("year")}
              className={`bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 ${
                errors.year ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : ''
              }`}
              min="1900"
              max={new Date().getFullYear() + 1}
              disabled={isSubmitting}
            />
          </FormFieldWrapper>

          {/* License Plate */}
          <FormFieldWrapper error={errors.license?.message}>
            <Label htmlFor="license" className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Hash className="h-4 w-4 text-emerald-400" />
              رقم اللوحة
            </Label>
            <Input
              id="license"
              placeholder="أدخل رقم اللوحة (مثل: أ ب ج 123)"
              {...register("license")}
              className={`bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 ${
                errors.license ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : ''
              }`}
              disabled={isSubmitting}
            />
          </FormFieldWrapper>

          {/* Color */}
          <FormFieldWrapper error={errors.color?.message}>
            <Label htmlFor="color" className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Palette className="h-4 w-4 text-emerald-400" />
              اللون
            </Label>
            <Input
              id="color"
              placeholder="أدخل لون المركبة (مثل: أبيض، أسود، فضي)"
              {...register("color")}
              className={`bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-emerald-500 ${
                errors.color ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : ''
              }`}
              disabled={isSubmitting}
            />
          </FormFieldWrapper>
          </fieldset>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
              disabled={isSubmitting || submitStatus === 'success'}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جاري الحفظ...
                </>
              ) : submitStatus === 'success' ? (
                <>
                  <CheckCircle className="ml-2 h-4 w-4" />
                  تم الحفظ بنجاح
                </>
              ) : (
                'حفظ التعديلات'
              )}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
              disabled={isSubmitting || submitStatus === 'success'}
            >
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
