import type { RegisterPayload } from "../types";
import { register as registerApi } from "../api";
import { useState } from "react";

export function useRegister() {
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const register = async (payload: RegisterPayload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await registerApi(payload);
      return response.data;
    } catch (err: any) {
      setError(
        "حدث خطأ أثناء التسجيل، الرجاء المحاولة لاحقاً"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    error,
    loading,
  };
}
