import * as React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../app/AuthContext";

const NavBar: React.FC = () => {
  const { isLoggedIn, setToken } = useAuth();

  const handleLogout = (): void => {
    setToken(null);
  };

  return (
    <nav
      className="bg-gray-900 shadow-lg px-10 py-4 fixed top-0 left-0 w-full z-50 "
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-3xl font-extrabold text-emerald-400 tracking-wide select-none">
          <Link to="/" className="hover:text-emerald-300 transition">
            Track<span className="text-white">Ride</span>
          </Link>
        </h1>

        {/* Navigation */}
        {!isLoggedIn ? (
          <div className="flex items-center gap-8">
            {/* Menu Items */}
            <ul className="flex gap-10 text-gray-300 font-medium">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition">
                  الرئيسية
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  حول
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition">
                  الخدمات
                </a>
              </li>
            </ul>

            {/* Buttons */}
            <div className="flex gap-4">
              <Link to="/login">
                <button className="border border-emerald-500 text-emerald-400 px-4 py-2 rounded-md hover:bg-emerald-500 hover:text-white transition">
                  تسجيل الدخول
                </button>
              </Link>

              <Link to="/register">
                <button className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition">
                  إنشاء حساب
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <ul className="flex gap-10 text-gray-300 font-medium items-center">
            <li>
              <Link
                to="/my-vehicles"
                className="hover:text-emerald-400 transition"
              >
                مركباتي 
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="hover:text-emerald-400 transition"
              >
                لوحة التحكم
              </Link>
            </li>
            <li>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                onClick={handleLogout}
              >
                تسجيل الخروج
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
