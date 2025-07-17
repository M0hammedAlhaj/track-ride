import { useState } from "react";
import { login as loginApi } from "../api";
import type { LoginPayload } from "../types";
import { useAuth } from "../../../app/AuthContext";

export function useLogin() {
  const { setToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginApi(payload);
      setToken(res.data.token); 
    } catch (e: any) {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
