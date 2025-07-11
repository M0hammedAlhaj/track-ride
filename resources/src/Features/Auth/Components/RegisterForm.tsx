import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RegisterPayload } from "../types";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";
import {
  registerSchema,
  RegisterFormData,
} from "../validation/RegisterValidation";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const { register: registerUser, error, loading } = useRegister();

  const navigate = useNavigate();
  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
      navigate("/login");
    } catch {
      // handled in hook
    }
  };

  return (
    <div className="flex flex-col items-center px-[10rem]">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-green-700 mb-6">
          تسجيل حساب جديد
        </h2>

        {error && (
          <p className="text-red-600 text-center mb-4 font-medium">{error}</p>
        )}

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">الاسم</label>
          <input
            type="text"
            {...register("name")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-400 focus:outline-none"
            placeholder="أدخل اسمك"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-400 focus:outline-none"
            placeholder="example@gmail.com"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            كلمة المرور
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-400 focus:outline-none"
            placeholder="********"
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">
            تأكيد كلمة المرور
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-400 focus:outline-none"
            placeholder="********"
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "جارٍ التسجيل..." : "تسجيل"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
