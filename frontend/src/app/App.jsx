import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../Features/Auth/Pages/LoginPage";
import Home from "../Features/Home/Pages/Home";
import RegisterPage from "../Features/Auth/Pages/RegisterPage";
import Dashboard from "../Features/Dashboard/Pages/Dashboard";
import { Navigate } from "react-router-dom";
import { useAuth } from "../app/AuthContext";
import Vhehicles from "../Features/Vehicles/Page/Vhehicles";
import VehicleDetailsPage from "../Features/Vehicles/Page/VehicleDetailsPage";
function App() {
  const { isLoggedIn } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !isLoggedIn ? <Home /> : <Navigate to="/dashboard" replace />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />
               <Route
          path="/my-vehicles"
          element={
            isLoggedIn ? <Vhehicles /> : <Navigate to="/login" replace />
          }
        />
         <Route
          path="/vehicles/:id"
          element={isLoggedIn ? <VehicleDetailsPage /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
