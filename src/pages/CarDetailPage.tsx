import { useEffect, useState } from 'react';
import { ArrowRight, Phone, MessageCircle, Share2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Car as CarType } from '../lib/database.types';
import { navigate, useCurrentPath } from '../components/Router';
import logoImage from '../assets/fardosi_logo.png';

export function CarDetailPage() {
  const path = useCurrentPath();
  const carId = path.split('/').pop();
  const [car, setCar] = useState<CarType | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (carId) loadCar(carId);
  }, [carId]);

  const loadCar = async (id: string) => {
    const { data } = await supabase
      .from('cars')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (data) setCar(data);
  };

  if (!car) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-400">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  const shareOnWhatsApp = () => {
    const message = `السيارة: ${car.brand} ${car.model}\nموديل: ${car.year}\nالسعر: $${car.price.toLocaleString()}\nالحالة: ${car.status}\n\nللمزيد من التفاصيل: ${window.location.href}`;
    window.open(`https://wa.me/963947777504?text=${encodeURIComponent(message)}`, '_blank');
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: `${car.brand} ${car.model}`,
        text: `${car.brand} ${car.model} - موديل ${car.year}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ الرابط!');
    }
  };

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
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {car.brand} {car.model}
          </h1>
          <button
            onClick={() => navigate('/cars')}
            className="flex items-center gap-2 text-red-600 hover:text-red-500 font-bold transition-colors"
          >
            <ArrowRight size={20} />
            <span className="hidden md:inline">العودة</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="relative bg-gray-900 rounded-xl overflow-hidden border border-red-900/30 mb-4">
              {car.images.length > 0 ? (
                <>
                  <img
                    src={car.images[currentImageIndex]}
                    alt={`${car.brand} ${car.model}`}
                    onClick={() => setLightboxOpen(true)}
                    className="w-full h-96 object-cover cursor-pointer"
                  />
                  {car.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-full transition-colors"
                      >
                        <ChevronRight size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black text-white p-3 rounded-full transition-colors"
                      >
                        <ChevronLeft size={24} />
                      </button>
                    </>
                  )}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 px-4 py-2 rounded-full text-sm">
                    {currentImageIndex + 1} / {car.images.length}
                  </div>
                </>
              ) : (
                <div className="w-full h-96 flex items-center justify-center text-gray-700">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🚗</div>
                    <p>لا توجد صور</p>
                  </div>
                </div>
              )}
            </div>

            {car.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {car.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${car.brand} ${car.model} ${idx + 1}`}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-full h-20 object-cover rounded-lg cursor-pointer border-2 transition-all ${
                      idx === currentImageIndex
                        ? 'border-red-600 scale-105'
                        : 'border-transparent hover:border-red-600/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-4xl font-bold mb-2 text-white">
                  {car.brand} {car.model}
                </h2>
                <p className="text-xl text-gray-400">موديل {car.year}</p>
              </div>
              <div
                className={`px-4 py-2 rounded-full font-bold ${
                  car.status === 'متوفرة'
                    ? 'bg-green-600'
                    : car.status === 'محجوزة'
                    ? 'bg-yellow-600'
                    : 'bg-red-600'
                }`}
              >
                {car.status}
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-900 to-red-700 p-8 rounded-xl mb-8 shadow-2xl">
              <p className="text-lg mb-2 text-red-100">السعر</p>
              <p className="text-5xl font-bold text-white">
                ${car.price.toLocaleString()}
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-red-900/30 mb-8">
              <h3 className="text-2xl font-bold mb-4 text-white">المواصفات</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'نوع المحرك', value: car.engine_type },
                  { label: 'سعة المحرك', value: car.engine_size },
                  { label: 'ناقل الحركة', value: car.transmission },
                  { label: 'نوع الوقود', value: car.fuel_type },
                  { label: 'نوع الدفع', value: car.drive_type },
                  { label: 'المسافة المقطوعة', value: car.mileage ? `${car.mileage.toLocaleString()} كم` : null },
                  { label: 'اللون الخارجي', value: car.exterior_color },
                  { label: 'اللون الداخلي', value: car.interior_color },
                  { label: 'الحالة', value: car.condition }
                ].filter(spec => spec.value).map((spec, idx) => (
                  <div key={idx} className="border-b border-gray-800 pb-2">
                    <p className="text-gray-400 text-sm">{spec.label}</p>
                    <p className="text-white font-bold">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {car.description && (
              <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-red-900/30 mb-8">
                <h3 className="text-2xl font-bold mb-4 text-white">الوصف</h3>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{car.description}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="tel:+963947777504"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-4 rounded-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-xl"
              >
                <Phone size={24} />
                اتصال مباشر
              </a>

              <button
                onClick={shareOnWhatsApp}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-xl"
              >
                <MessageCircle size={24} />
                واتساب
              </button>

              <button
                onClick={shareLink}
                className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-4 rounded-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-3 md:col-span-2"
              >
                <Share2 size={24} />
                مشاركة
              </button>
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen && car.images.length > 0 && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 left-4 text-white hover:text-red-600 transition-colors"
          >
            <X size={40} />
          </button>

          <img
            src={car.images[currentImageIndex]}
            alt={`${car.brand} ${car.model}`}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {car.images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black text-white p-4 rounded-full transition-colors"
              >
                <ChevronRight size={32} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black text-white p-4 rounded-full transition-colors"
              >
                <ChevronLeft size={32} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
