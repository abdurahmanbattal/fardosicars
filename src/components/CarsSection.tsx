import { useEffect, useState } from 'react';
import { Car } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Car as CarType } from '../lib/database.types';
import { navigate } from './Router';

export function CarsSection() {
  const [cars, setCars] = useState<CarType[]>([]);

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    const { data } = await supabase
      .from('cars')
      .select('*')
      .eq('is_visible', true)
      .order('created_at', { ascending: false });

    if (data) {
      setCars(data);
    }
  };

  if (cars.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        لا توجد سيارات متاحة
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-white">
        أحدث السيارات
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
          <div
            key={car.id}
            onClick={() => navigate(`/car/${car.id}`)}
            className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-red-900/30 hover:border-red-600 transition-all transform hover:scale-105 cursor-pointer shadow-xl"
          >
            <div className="relative h-56 bg-gray-800 overflow-hidden">
              {car.images?.[0] ? (
                <img
                  src={car.images[0]}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Car className="w-20 h-20 text-gray-700" />
                </div>
              )}
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-1 text-white">
                {car.brand} {car.model}
              </h3>
              <p className="text-gray-400 mb-3">موديل {car.year}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-red-600">
                  ${car.price.toLocaleString()}
                </span>
                <span className="text-white hover:text-red-600">
                  التفاصيل →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
