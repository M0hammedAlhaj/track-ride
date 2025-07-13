import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../Features/Auth/Pages/LoginPage";
import Home from "../Features/Home/Pages/Home";
import RegisterPage from "../Features/Auth/Pages/RegisterPage";
import Dashboard from "../Features/Dashboard/Pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={<Dashboard/>}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
