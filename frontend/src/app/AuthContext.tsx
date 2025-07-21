import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { initializeMaintenanceTypes } from "../Features/MaintenanceTypes/api";

interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const isLoggedIn = !!token;

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      // Initialize maintenance types when user is logged in (for performance)
      initializeMaintenanceTypes();
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
