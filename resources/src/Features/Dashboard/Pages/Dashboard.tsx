import React, { useState, useEffect } from "react";
import NavBar from "../../../Components/NavBar";
import CarCard from "../Components/CardCar";
const StatCard = ({ title, value, icon, trend, trendValue }) => (
  <div className="group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-emerald-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25">
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        {trend && (
          <div
            className={`flex items-center text-xs px-2 py-1 rounded-full ${
              trend === "up"
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {trend === "up" ? "↗" : "↘"} {trendValue}
          </div>
        )}
      </div>
      <h3 className="text-gray-300 text-sm font-medium mb-2">{title}</h3>
      <p className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">
        {value}
      </p>
    </div>
  </div>
);

const Dashboard = () => {
  const [mounted, setMounted] = useState(false);

  const isLoggedIn = localStorage.getItem("token") !== null;

  useEffect(() => {
    setMounted(true);
  }, []);


  const cars = [
    {
      carName: "Toyota Corolla 2020",
      lastService: "تغيير زيت",
      lastServiceDate: "10 يوليو 2025",
      nextServiceInfo: "بعد 5000 كم أو 6 شهور",
    },
    {
      carName: "Hyundai Elantra 2022",
      lastService: "فحص فرامل",
      lastServiceDate: "1 يوليو 2025",
      nextServiceInfo: "1 أكتوبر 2025",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        <NavBar />

        <div className="container mx-auto px-6 mt-12 mb-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              لوحة التحكم الرئيسية
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              تتبع صيانة سياراتك بسهولة واحصل على تذكيرات ذكية لضمان الأداء
              الأمثل
            </p>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="container  px-6 mb-12 mx-auto">
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <StatCard
              title="عدد السيارات"
              value="2"
              icon="🚗"
              trend="up"
              trendValue="+1"
            />
            <StatCard
              title="آخر صيانة"
              value="10 يوليو 2025"
              icon="🛠️"
              trend={null}
              trendValue={null}
            />
            <StatCard
              title="الصيانات هذا الشهر"
              value="3"
              icon="📅"
              trend="up"
              trendValue="+2"
            />
            <StatCard
              title="متوسط الصيانة"
              value="كل 45 يوم"
              icon="⏱️"
              trend={null}
              trendValue={null}
            />
          </div>
        </div>

        {/* Main Content with Sidebar */}
        <div className="container gap-6 px-6 mb-12 mx-auto">
          {/* Cars Grid */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">سياراتي</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
            </div>
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-300 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {cars.map((car, i) => (
                <CarCard key={i} {...car} />
              ))}
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8 group">
          <button className="relative bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white p-4 rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-110 group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative flex items-center justify-center">
              <span className="text-2xl">➕</span>
            </div>
          </button>
          <div className="absolute bottom-full right-0 mb-2 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            صيانة جديدة
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
