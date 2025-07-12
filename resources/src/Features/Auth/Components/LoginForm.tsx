import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { LoginPayload } from "../types";
export default function LoginForm() {
  const [form, setForm] = useState<LoginPayload>({
    email: "",
    password: "",
  });

  const { login, loading, error } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(form);
      navigate("/dashboard");
    } catch {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-4  w-full max-w-md border border-gray-200"
        dir="rtl"
      >
        <h2 className="text-3xl font-extrabold text-center text-green-700 mb-6">
          تسجيل الدخول
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-400 focus:outline-none"
            placeholder="example@example.com"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-1">
            كلمة المرور
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-400 focus:outline-none"
            placeholder="********"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 rounded-md text-lg font-bold transition ${
            loading
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "جارٍ التحقق..." : "دخول"}
        </button>
      </form>
    </div>
  );
}
