import logoImage from '../assets/fardosi_logo.png';
import { navigate } from '../components/Router';
import { CarsSection } from '../components/CarsSection';

export function CarsPage() {
  return (
    <div className="min-h-screen bg-black text-white" dir="rtl">
      <header className="bg-gradient-to-b from-gray-900 to-black py-6 px-4 border-b border-red-900/30 sticky top-0 z-50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <img
            src={logoImage}
            alt="Fardosi Cars"
            onClick={() => navigate('/')}
            className="h-16 cursor-pointer hover:scale-105 transition-transform"
          />

          <h1 className="text-3xl font-bold text-white">
            جميع السيارات
          </h1>

          <button
            onClick={() => navigate('/')}
            className="text-red-600 hover:text-red-500 font-bold transition-colors"
          >
            العودة للرئيسية
          </button>
        </div>
      </header>

      {/* نفس قسم السيارات المستخدم في الصفحة الرئيسية */}
      <CarsSection />
    </div>
  );
}
