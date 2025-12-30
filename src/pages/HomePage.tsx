import { useEffect, useState } from 'react';
import { Car, Phone, Shield, Star, MapPin, Facebook, Instagram } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Car as CarType } from '../lib/database.types';
import { navigate } from '../components/Router';
import logoImage from '../assets/fardosi_logo.png';

export function HomePage() {
  const [featuredCars, setFeaturedCars] = useState<CarType[]>([]);

  useEffect(() => {
    loadFeaturedCars();
  }, []);

  const loadFeaturedCars = async () => {
    const { data } = await supabase
      .from('cars')
      .select('*')
      .eq('is_featured', true)
      .eq('is_visible', true)
      .limit(3);

    if (data) {
      setFeaturedCars(data);
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white" dir="rtl">
      {/* Hero Section - خلفية ثابتة بدون استيراد صورة */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/fardosi_background.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <img
            src={logoImage}
            alt="Fardosi Cars"
            className="w-64 h-auto mx-auto mb-8 drop-shadow-2xl animate-fade-in"
          />
          <h1 className="text-6xl md:text-7xl font-bold mb-4 text-white drop-shadow-lg animate-slide-up">
            شركة فردوسي التجارية
          </h1>
          <p className="text-2xl md:text-3xl mb-8 text-gray-200 font-light animate-slide-up-delay">
            لبيع السيارات الحديثة والفاخرة
          </p>
          <div className="flex gap-4 justify-center flex-wrap animate-fade-in-delay">
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 shadow-2xl"
            >
              تواصل معنا
            </button>
            <button
              onClick={() => navigate('/cars')}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105"
            >
              عرض السيارات
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8 text-white">من نحن</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mb-8" />
          <p className="text-xl text-gray-300 leading-relaxed">
            شركة فردوسي التجارية هي وجهتك الأولى لشراء السيارات الحديثة والفاخرة في حلب. نفخر بتقديم أرقى وأجود أنواع السيارات مع خدمة عملاء استثنائية من الطراز الأول. نحن نؤمن بأن كل عميل يستحق تجربة VIP فريدة من نوعها، ونلتزم بتوفير سيارات عالية الجودة تلبي أعلى معايير الفخامة والأداء.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center text-white">خدماتنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Car, title: 'بيع سيارات حديثة', desc: 'أحدث موديلات السيارات العالمية' },
              { icon: Star, title: 'سيارات فاخرة', desc: 'مجموعة مميزة من السيارات الفاخرة' },
              { icon: Shield, title: 'جودة مضمونة', desc: 'فحص شامل وضمان على كل سيارة' },
              { icon: Phone, title: 'خدمة عملاء VIP', desc: 'دعم متواصل واستشارات مجانية' },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gray-800 to-black p-8 rounded-xl border border-red-900/30 hover:border-red-600/50 transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-red-900/20 group"
              >
                <service.icon className="w-16 h-16 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-2 text-white">{service.title}</h3>
                <p className="text-gray-400">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      {featuredCars.length > 0 && (
        <section id="featured" className="py-20 px-4 bg-black">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold mb-16 text-center text-white">سيارات مميزة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCars.map((car) => (
                <div
                  key={car.id}
                  onClick={() => navigate(`/car/${car.id}`)}
                  className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-red-900/30 hover:border-red-600 transition-all transform hover:scale-105 cursor-pointer group shadow-xl"
                >
                  <div className="relative h-56 bg-gray-800 overflow-hidden">
                    {car.images?.[0] ? (
                      <img
                        src={car.images[0]}
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Car className="w-20 h-20 text-gray-700" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {car.status ?? 'متوفر'}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-white">
                      {car.brand} {car.model}
                    </h3>
                    <p className="text-gray-400 mb-4">موديل {car.year}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-bold text-red-600">
                        ${car.price.toLocaleString()}
                      </span>
                      <span className="text-white group-hover:text-red-600 transition-colors">
                        عرض التفاصيل ←
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button
                onClick={() => navigate('/cars')}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105"
              >
                عرض جميع السيارات
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Location Section */}
      <section id="location" className="py-20 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8 text-white flex items-center justify-center gap-3">
            <MapPin className="text-red-600" />
            موقعنا
          </h2>
          <p className="text-2xl text-gray-300 mb-8">حلب – الفيض</p>
          <div className="rounded-xl overflow-hidden shadow-2xl border border-red-900/30">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3235.9!2d37.1639!3d36.1978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDExJzUyLjEiTiAzN8KwMDknNTAuMCJF!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقع شركة فردوسي"
            />
          </div>
          <a
            href="https://maps.app.goo.gl/3Qv6a4xCRXu4qaxj8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 text-red-600 hover:text-red-500 text-lg font-bold transition-colors"
          >
            فتح في خرائط Google ←
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-12 text-white">للاستفسار والتواصل</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {['0947777504', '0991000108', '0212233333', '0212244444', '0212288888'].map((phone) => {
              const isMobile = phone.startsWith('09');
              const phoneIntl = isMobile ? `+963${phone.substring(1)}` : phone;
              const cleanedMobile = isMobile ? `963${phone.substring(1)}` : null;

              return (
                <div
                  key={phone}
                  className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-xl border border-red-900/30 flex flex-col gap-4 hover:border-red-600 transition-all"
                >
                  <div className="flex items-center justify-center gap-4 text-2xl font-bold">
                    <Phone className="text-red-600" />
                    <span className="text-white" dir="ltr">{phone}</span>
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={`tel:${phoneIntl}`}
                      className="flex-1 bg-black hover:bg-gray-800 text-white py-3 rounded-lg text-lg font-bold transition-all text-center border border-white/10"
                    >
                      اتصال
                    </a>
                    {isMobile && cleanedMobile && (
                      <a
                        href={`https://wa.me/${cleanedMobile}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-bold transition-all text-center"
                      >
                        واتساب
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Section */}
      <section id="social" className="py-16 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-white">تابعنا</h2>
          <div className="flex justify-center gap-8">
            <a
              href="https://www.facebook.com/share/1BvYPGheYF/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 p-6 rounded-full transition-all transform hover:scale-110 shadow-xl"
            >
              <Facebook size={40} />
            </a>
            <a
              href="https://www.instagram.com/fardosi_cars"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 hover:opacity-90 p-6 rounded-full transition-all transform hover:scale-110 shadow-xl"
            >
              <Instagram size={40} />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 px-4 border-t border-red-900/30">
        <div className="max-w-6xl mx-auto text-center">
          <img src={logoImage} alt="Fardosi Cars" className="w-32 h-auto mx-auto mb-4 opacity-80" />
          <p className="text-gray-400 text-lg mb-2">شركة فردوسي التجارية لبيع السيارات الحديثة</p>
          <p className="text-gray-600">© 2025 FARDOSI CARS - جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  );
}