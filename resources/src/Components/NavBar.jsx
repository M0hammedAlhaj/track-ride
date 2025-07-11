import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div>
      <nav
        className="bg-gradient-to-l from-green-100 to-amber-50 shadow-md px-10 py-4"
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-green-700 tracking-wide select-none">
            <a href="/" className="hover:text-green-800 transition">
              Track<span className="text-gray-800">Ride</span>
            </a>
          </h1>

          <div className="flex items-center gap-8">
            <ul className="flex gap-10 text-gray-800 font-medium">
              <li>
                <a href="/">الرئيسية</a>
              </li>
              <li>
                <a href="#">حول</a>
              </li>
              <li>
                <a href="#">الخدمات</a>
              </li>
            </ul>
            <div className="flex gap-4">
              <Link to="/login">
                <button className="bg-white border border-green-600 text-green-700 px-4 py-2 rounded-md hover:bg-green-50 transition">
                  تسجيل الدخول
                </button>
              </Link>

              <Link to="/register">
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
                  إنشاء حساب
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
