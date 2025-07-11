import { useState } from "react";
import { login as loginApi } from "../api";
import type { LoginPayload } from "../types";

export function useAuth(): UseAuthReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  localStorage.getItem("token");

  const login = async (login: LoginPayload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginApi(login);
      localStorage.setItem("token", res.data.token);
    } catch (e: any) {
      setError("حدث خطأ أثناء تسجيل الدخول");
      throw e;
    } finally {
      setLoading(false);
    }
  };
  return { login, loading, error };
}
interface UseAuthReturn {
  login: (payload: LoginPayload) => Promise<void>;
  loading: boolean;
  error: string | null;
}
