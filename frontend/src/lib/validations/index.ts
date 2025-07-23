import { z } from 'zod'

// Registration form validation schema
export const registerSchema = z.object({
  name: z
    .string()
    .min(2, 'الاسم يجب أن يكون على الأقل حرفين')
    .max(50, 'الاسم يجب أن يكون أقل من 50 حرف')
    .regex(/^[\u0600-\u06FFa-zA-Z\s]+$/, 'الاسم يجب أن يحتوي على أحرف عربية أو إنجليزية فقط'),
  email: z
    .string()
    .min(1, 'البريد الإلكتروني مطلوب')
    .email('البريد الإلكتروني غير صحيح'),
  password: z
    .string()
    .min(8, 'كلمة المرور يجب أن تكون على الأقل 8 أحرف')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 'كلمة المرور يجب أن تحتوي على: حرف كبير، حرف صغير، رقم، ورمز خاص (@$!%*?&)'),
  confirmPassword: z.string().min(1, 'تأكيد كلمة المرور مطلوب')
}).refine((data) => data.password === data.confirmPassword, {
  message: 'كلمة المرور غير متطابقة',
  path: ['confirmPassword']
})

// Vehicle form validation schema
export const vehicleSchema = z.object({
  name: z
    .string()
    .min(2, 'اسم المركبة يجب أن يكون على الأقل حرفين')
    .max(100, 'اسم المركبة يجب أن يكون أقل من 100 حرف'),
  model: z
    .string()
    .min(2, 'الموديل يجب أن يكون على الأقل حرفين')
    .max(100, 'الموديل يجب أن يكون أقل من 100 حرف'),
  year: z
    .string()
    .min(1, 'سنة الصنع مطلوبة')
    .refine((val) => {
      const year = parseInt(val)
      const currentYear = new Date().getFullYear()
      return year >= 1900 && year <= currentYear + 1
    }, 'سنة الصنع يجب أن تكون بين 1900 والسنة الحالية'),
  license: z
    .string()
    .min(2, 'رقم اللوحة يجب أن يكون على الأقل حرفين')
    .max(20, 'رقم اللوحة يجب أن يكون أقل من 20 حرف')
    .regex(/^[\u0600-\u06FFa-zA-Z0-9\s-]+$/, 'رقم اللوحة يحتوي على أحرف غير صحيحة'),
  color: z
    .string()
    .min(2, 'اللون يجب أن يكون على الأقل حرفين')
    .max(50, 'اللون يجب أن يكون أقل من 50 حرف')
    .regex(/^[\u0600-\u06FFa-zA-Z\s]+$/, 'اللون يجب أن يحتوي على أحرف عربية أو إنجليزية فقط')
})

// Maintenance record form validation schema
export const maintenanceRecordSchema = z.object({
  type: z
    .string()
    .min(1, 'نوع الخدمة مطلوب'),
  description: z
    .string()
    .max(500, 'وصف الخدمة يجب أن يكون أقل من 500 حرف')
    .optional(),
  price: z
    .number()
    .min(0.01, 'السعر يجب أن يكون أكبر من صفر')
    .max(99999.99, 'السعر يجب أن يكون أقل من 100,000')
    .multipleOf(0.01, 'السعر يجب أن يكون بدقة خانتين عشريتين'),
  reminderDate: z
    .string()
    .min(1, 'تاريخ التذكير مطلوب')
    .refine((date) => {
      const selectedDate = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return selectedDate >= today
    }, 'تاريخ التذكير يجب أن يكون اليوم أو في المستقبل'),
  useCustomReminder: z.boolean()
})

// Types derived from schemas
export type RegisterFormData = z.infer<typeof registerSchema>
export type VehicleFormData = z.infer<typeof vehicleSchema>
export type MaintenanceRecordFormData = z.infer<typeof maintenanceRecordSchema>
