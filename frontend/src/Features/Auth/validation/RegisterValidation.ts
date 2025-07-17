import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, "الاسم مطلوب"),
    email: z.string().email("يرجى إدخال بريد إلكتروني صالح"),
    password: z
      .string()
      .min(8, "يجب أن تكون كلمة المرور 8 أحرف على الأقل")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "كلمة المرور يجب أن تحتوي على حرف كبير، صغير، رقم، ورمز خاص"
      ),
    confirmPassword: z.string().min(1, "يرجى تأكيد كلمة المرور"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
