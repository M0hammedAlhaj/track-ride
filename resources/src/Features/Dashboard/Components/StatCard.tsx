// components/StatCard.tsx
type StatCardProps = {
  title: string;
  value: string;
  icon: string;
  trend?: 'up' | 'down';
  trendValue?: string;
};

const StatCard = ({ title, value, icon, trend, trendValue }: StatCardProps) => (
  <div className="group relative overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-emerald-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25">
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center text-xs px-2 py-1 rounded-full ${trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {trend === 'up' ? '↗' : '↘'} {trendValue}
          </div>
        )}
      </div>
      <h3 className="text-gray-300 text-sm font-medium mb-2">{title}</h3>
      <p className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">{value}</p>
    </div>
  </div>

);

export default StatCard;
