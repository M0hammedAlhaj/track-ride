interface DashboardHeaderProps {
  title?: string
  subtitle?: string
}

export function DashboardHeader({ 
  title = "لوحة التحكم", 
  subtitle = "نظرة شاملة على حالة أسطولك وجدولة الصيانة" 
}: DashboardHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
        {title}
      </h1>
      <p className="text-gray-400">{subtitle}</p>
    </div>
  )
}
