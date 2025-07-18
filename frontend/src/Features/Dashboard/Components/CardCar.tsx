// components/CarCard.tsx

type CarCardProps = {
  carName: string;
  lastService: string;
  lastServiceDate: string;
  nextServiceInfo: string;
};

const CarCard = ({
  carName,
  lastService,
  lastServiceDate,
  nextServiceInfo,
}: CarCardProps) => {
  return (
    <div className="group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-emerald-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-xl">
            <span className="text-xl">🚙</span>
          </div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">
          {carName}
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-300">
            <span className="text-emerald-400 mr-2">🔧</span>
            <span>آخر صيانة: {lastService}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <span className="text-teal-400 mr-2">📅</span>
            <span>{lastServiceDate}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <span className="text-cyan-400 mr-2">⏰</span>
            <span>{nextServiceInfo}</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/10">
          <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/50">
            عرض التفاصيل
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
