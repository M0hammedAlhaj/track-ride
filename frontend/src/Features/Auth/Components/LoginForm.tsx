"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FormError, FormFieldWrapper } from "@/components/ui/form-error"
import { Loader2, AlertCircle, Eye, EyeOff } from "lucide-react"
import { useLogin } from "../hooks/useLogin"
import type { LoginPayload } from "../types"
import { useNavigate } from "react-router-dom"
import { loginSchema, type LoginFormData } from "../../../lib/validations"

export default function CarLoginPage() {

  const [showPassword, setShowPassword] = useState(false)
  const navigator = useNavigate()
  const { login, loading, error } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const payload: LoginPayload = {
        email: data.email,
        password: data.password,
      }
      await login(payload)
      navigator("/dashboard") 
    } catch (err: any) {
      // Handle specific field errors if they come from the server
      if (err.response?.data?.errors) {
        const serverErrors = err.response.data.errors;
        Object.entries(serverErrors).forEach(([field, message]) => {
          setError(field as keyof LoginFormData, {
            type: 'server',
            message: message as string,
          });
        });
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex">
      {/* Left Side - Animated Car Illustration (60%) */}
      <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700">
          {/* Animated Background Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Curved Lines */}
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 400 600">
              <path
                d="M0,300 Q200,100 400,300 T800,300"
                stroke="white"
                strokeWidth="2"
                fill="none"
                className="animate-pulse"
              />
              <path
                d="M0,200 Q200,50 400,200 T800,200"
                stroke="white"
                strokeWidth="1"
                fill="none"
                className="animate-pulse"
                style={{ animationDelay: "1s" }}
              />
              <path
                d="M0,400 Q200,250 400,400 T800,400"
                stroke="white"
                strokeWidth="1"
                fill="none"
                className="animate-pulse"
                style={{ animationDelay: "2s" }}
              />
            </svg>
          </div>
        </div>

        {/* Animated Car */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <div className="car-container relative">
            {/* Car Body */}
            <svg
              width="300"
              height="150"
              viewBox="0 0 300 150"
              className="car-body animate-bounce drop-shadow-lg"
              style={{ animationDuration: "3s" }}
            >
              <rect x="50" y="80" width="200" height="40" rx="20" fill="white" />
              <rect x="80" y="50" width="140" height="40" rx="20" fill="white" />
              <rect x="90" y="55" width="50" height="25" rx="5" fill="#3B82F6" opacity="0.7" />
              <rect x="160" y="55" width="50" height="25" rx="5" fill="#3B82F6" opacity="0.7" />
              <circle cx="45" cy="90" r="8" fill="#FEF08A" className="animate-pulse" />
              <circle cx="255" cy="90" r="8" fill="#FEF08A" className="animate-pulse" />
            </svg>

            {/* Animated Wheels */}
            <div className="absolute bottom-0 left-12 w-12 h-12 bg-gray-800 rounded-full border-4 border-white animate-spin">
              <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1/2 transform -translate-x-1/2"></div>
            </div>
            <div className="absolute bottom-0 right-12 w-12 h-12 bg-gray-800 rounded-full border-4 border-white animate-spin">
              <div className="w-2 h-2 bg-white rounded-full absolute top-1 left-1/2 transform -translate-x-1/2"></div>
            </div>

            {/* Floating Text */}
            <div className="absolute bottom-20 w-full text-center text-white top-40 ">
              <h2 className="text-4xl font-bold mb-4 animate-fade-in">مرحباً بك</h2>
              <p className="text-xl opacity-90 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                في نظام إدارة صيانة السيارات
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form (40%) */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-8 lg:pr-16" dir="rtl">
        <div className="w-full max-w-md">
          {/* Glassmorphism Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl hover:bg-white/15 transition-all duration-300">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">تسجيل الدخول</h1>
              <p className="text-gray-300">ادخل بياناتك للوصول إلى حسابك</p>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert className="mb-6 bg-red-500/20 border-red-500/50 text-red-200">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <FormFieldWrapper error={errors.email?.message}>
                <Label htmlFor="email" className="text-white font-medium">
                  البريد الإلكتروني
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={`bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/50 rounded-lg h-12 ${
                    errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : ''
                  }`}
                  placeholder="أدخل بريدك الإلكتروني"
                  disabled={isSubmitting}
                />
              </FormFieldWrapper>

              {/* Password Field */}
              <FormFieldWrapper error={errors.password?.message}>
                <Label htmlFor="password" className="text-white font-medium">
                  كلمة المرور
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className={`bg-white/10 border-white/30 text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400/50 rounded-lg h-12 pr-10 ${
                      errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : ''
                    }`}
                    placeholder="أدخل كلمة المرور"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    disabled={isSubmitting}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </FormFieldWrapper>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin ml-2" />
                    جاري تسجيل الدخول...
                  </>
                ) : (
                  "دخول"
                )}
              </Button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center">
              <a href="#" className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors duration-300">
                نسيت كلمة المرور؟
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Stacked */}
      <div className="lg:hidden absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-teal-600/20 to-cyan-700/20">
        {/* Background Animation for Mobile */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
