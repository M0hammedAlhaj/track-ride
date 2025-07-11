export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-gray-100 to-white py-20 px-6">
      <div className="max-w-5xl mx-auto text-center" dir="rtl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-relaxed mb-6">
          راقب صيانة مركباتك بسهولة وذكاء
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          نظام متكامل لتتبع سجلات الصيانة، وتذكيرك بالمواعيد الدورية، وتحسين عمر المركبة وكفاءتها.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="/login"
            className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition"
          >
            ابدأ الآن   
          </a>
          <a
            href="#features"
            className="border border-green-600 text-green-600 px-6 py-3 rounded-lg text-lg font-medium hover:bg-green-50 transition"
          >
            شاهد الميزات
          </a>
        </div>
      </div>
    </section>
  );
}
