import { useEffect, useState } from 'react';
import { Car, Plus, LogOut, BarChart, Eye, EyeOff, Trash2, Edit, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Car as CarType } from '../lib/database.types';
import { navigate } from '../components/Router';
import { CarForm } from '../components/CarForm';
import logoImage from '../assets/fardosi_logo.png';

export function AdminDashboard() {
  const { user, signOut } = useAuth();
  const [cars, setCars] = useState<CarType[]>([]);
  const [stats, setStats] = useState({ total: 0, available: 0, sold: 0 });
  const [showForm, setShowForm] = useState(false);
  const [editingCar, setEditingCar] = useState<CarType | null>(null);
  const [view, setView] = useState<'dashboard' | 'cars'>('dashboard');

  useEffect(() => {
    if (!user) {
      navigate('/admin');
      return;
    }
    loadCars();
  }, [user]);

  const loadCars = async () => {
    const { data } = await supabase
      .from('cars')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setCars(data);
      setStats({
        total: data.length,
        available: data.filter(c => c.status === 'متوفرة').length,
        sold: data.filter(c => c.status === 'مباعة').length
      });
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/admin');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه السيارة؟')) return;

    const { error } = await supabase.from('cars').delete().eq('id', id);

    if (!error) {
      loadCars();
    }
  };

  const toggleVisibility = async (car: CarType) => {
    const { error } = await supabase
      .from('cars')
      .update({ is_visible: !car.is_visible })
      .eq('id', car.id);

    if (!error) {
      loadCars();
    }
  };

  const toggleFeatured = async (car: CarType) => {
    const { error } = await supabase
      .from('cars')
      .update({ is_featured: !car.is_featured })
      .eq('id', car.id);

    if (!error) {
      loadCars();
    }
  };

  const handleEdit = (car: CarType) => {
    setEditingCar(car);
    setShowForm(true);
    setView('cars');
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCar(null);
    loadCars();
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white" dir="rtl">
      <header className="bg-gradient-to-b from-gray-900 to-black py-4 px-4 border-b border-red-900/30 sticky top-0 z-40 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logoImage} alt="Fardosi Cars" className="h-12" />
            <div>
              <h1 className="text-2xl font-bold text-white">لوحة التحكم</h1>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              عرض الموقع
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              تسجيل الخروج
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setView('dashboard')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
              view === 'dashboard'
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <BarChart size={20} />
            لوحة المعلومات
          </button>
          <button
            onClick={() => setView('cars')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
              view === 'cars'
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Car size={20} />
            إدارة السيارات
          </button>
        </div>

        {view === 'dashboard' && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">الإحصائيات</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-900 to-blue-700 p-6 rounded-xl shadow-xl">
                <p className="text-blue-200 mb-2">إجمالي السيارات</p>
                <p className="text-5xl font-bold text-white">{stats.total}</p>
              </div>
              <div className="bg-gradient-to-br from-green-900 to-green-700 p-6 rounded-xl shadow-xl">
                <p className="text-green-200 mb-2">متوفرة</p>
                <p className="text-5xl font-bold text-white">{stats.available}</p>
              </div>
              <div className="bg-gradient-to-br from-red-900 to-red-700 p-6 rounded-xl shadow-xl">
                <p className="text-red-200 mb-2">مباعة</p>
                <p className="text-5xl font-bold text-white">{stats.sold}</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-white">أحدث السيارات</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.slice(0, 6).map((car) => (
                <div
                  key={car.id}
                  className="bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-red-900/30"
                >
                  <div className="relative h-40 bg-gray-800">
                    {car.images[0] ? (
                      <img
                        src={car.images[0]}
                        alt={`${car.brand} ${car.model}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Car className="w-16 h-16 text-gray-700" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="text-xl font-bold text-white mb-1">
                      {car.brand} {car.model}
                    </h4>
                    <p className="text-gray-400 text-sm">{car.year} - ${car.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'cars' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">إدارة السيارات</h2>
              <button
                onClick={() => {
                  setEditingCar(null);
                  setShowForm(true);
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-bold transition-all transform hover:scale-105"
              >
                <Plus size={20} />
                إضافة سيارة جديدة
              </button>
            </div>

            {showForm ? (
              <CarForm car={editingCar} onClose={handleFormClose} />
            ) : (
              <div className="space-y-4">
                {cars.map((car) => (
                  <div
                    key={car.id}
                    className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-xl border border-red-900/30 hover:border-red-600/50 transition-all"
                  >
                    <div className="flex gap-6">
                      <div className="w-32 h-32 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                        {car.images[0] ? (
                          <img
                            src={car.images[0]}
                            alt={`${car.brand} ${car.model}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Car className="w-12 h-12 text-gray-700" />
                          </div>
                        )}
                      </div>

                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-2xl font-bold text-white">
                              {car.brand} {car.model}
                            </h3>
                            <p className="text-gray-400">
                              موديل {car.year} - {car.mileage.toLocaleString()} كم
                            </p>
                          </div>
                          <div className="flex gap-2">
                            {car.is_featured && (
                              <Star className="text-yellow-500" size={24} fill="currentColor" />
                            )}
                            {!car.is_visible && (
                              <EyeOff className="text-gray-500" size={24} />
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-3xl font-bold text-red-600">
                            ${car.price.toLocaleString()}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-bold ${
                              car.status === 'متوفرة'
                                ? 'bg-green-600'
                                : car.status === 'محجوزة'
                                ? 'bg-yellow-600'
                                : 'bg-red-600'
                            }`}
                          >
                            {car.status}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(car)}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            <Edit size={18} />
                            تعديل
                          </button>
                          <button
                            onClick={() => toggleVisibility(car)}
                            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            {car.is_visible ? <EyeOff size={18} /> : <Eye size={18} />}
                            {car.is_visible ? 'إخفاء' : 'إظهار'}
                          </button>
                          <button
                            onClick={() => toggleFeatured(car)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                              car.is_featured
                                ? 'bg-yellow-600 hover:bg-yellow-700'
                                : 'bg-gray-700 hover:bg-gray-600'
                            } text-white`}
                          >
                            <Star size={18} />
                            {car.is_featured ? 'إزالة من المميزة' : 'وضع كمميزة'}
                          </button>
                          <button
                            onClick={() => handleDelete(car.id)}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors mr-auto"
                          >
                            <Trash2 size={18} />
                            حذف
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
