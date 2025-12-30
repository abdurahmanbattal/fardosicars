import { useState } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Car } from '../lib/database.types';

interface CarFormProps {
  car: Car | null;
  onClose: () => void;
}

export function CarForm({ car, onClose }: CarFormProps) {
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>(car?.images || []);
  const [newImageUrl, setNewImageUrl] = useState('');

  const [formData, setFormData] = useState({
    brand: car?.brand || '',
    model: car?.model || '',
    year: car?.year || new Date().getFullYear(),
    price: car?.price || 0,
    currency: car?.currency || 'USD',
    mileage: car?.mileage || 0,
    condition: car?.condition || 'مستعملة',
    engine_type: car?.engine_type || '',
    engine_size: car?.engine_size || '',
    transmission: car?.transmission || '',
    fuel_type: car?.fuel_type || '',
    drive_type: car?.drive_type || '',
    exterior_color: car?.exterior_color || '',
    interior_color: car?.interior_color || '',
    description: car?.description || '',
    status: car?.status || 'متوفرة',
    is_featured: car?.is_featured || false,
    is_visible: car?.is_visible || true,
  });

  // دالة لتحويل الأرقام العربية إلى لاتينية
  const toLatinNumber = (value: string | number): number => {
    const str = String(value);
    const arabic = '٠١٢٣٤٥٦٧٨٩';
    const latin = '0123456789';
    const converted = str.replace(/[٠-٩]/g, (match) => latin[arabic.indexOf(match)]);
    return Number(converted) || 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const processedData = {
      ...formData,
      year: toLatinNumber(formData.year),
      price: toLatinNumber(formData.price),
      mileage: toLatinNumber(formData.mileage),
      images: imageUrls,
    };

    let error;
    if (car) {
      ({ error } = await supabase.from('cars').update(processedData).eq('id', car.id));
    } else {
      ({ error } = await supabase.from('cars').insert([processedData]));
    }

    setLoading(false);

    if (!error) {
      onClose();
    } else {
      alert('حدث خطأ أثناء حفظ البيانات: ' + error.message);
    }
  };

  const addImageUrl = () => {
    if (newImageUrl.trim()) {
      setImageUrls([...imageUrls, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const removeImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-red-900/30 rounded-xl w-full max-w-4xl my-8 max-h-screen overflow-y-auto">
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6 lg:space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {car ? 'تعديل السيارة' : 'إضافة سيارة جديدة'}
            </h2>
            <button type="button" onClick={onClose} className="text-gray-400 hover:text-red-500 transition">
              <X size={28} />
            </button>
          </div>

          {/* Basic Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <Input label="الماركة *" value={formData.brand} onChange={(v) => setFormData({ ...formData, brand: v })} placeholder="مثل: Mercedes, Toyota, BMW" />
            <Input label="الموديل *" value={formData.model} onChange={(v) => setFormData({ ...formData, model: v })} placeholder="مثل: S-Class, Camry, X5" />
            <Input label="السنة *" value={formData.year} onChange={(v) => setFormData({ ...formData, year: v })} placeholder="مثل: ٢٠٢٤ أو 2024" isNumeric />
            <Input label="السعر (USD) *" value={formData.price} onChange={(v) => setFormData({ ...formData, price: v })} placeholder="مثل: ٥٠٠٠٠ أو 50000" isNumeric />
            <Input label="المسافة المقطوعة (كم)" value={formData.mileage} onChange={(v) => setFormData({ ...formData, mileage: v })} placeholder="مثل: ٤٥٠٠٠ أو 45000" isNumeric />
            <Select label="الحالة" value={formData.condition} onChange={(v) => setFormData({ ...formData, condition: v })} options={['جديدة', 'مستعملة']} />
            <Input label="نوع المحرك" value={formData.engine_type} onChange={(v) => setFormData({ ...formData, engine_type: v })} placeholder="مثل: V6, V8, Turbo" />
            <Input label="سعة المحرك" value={formData.engine_size} onChange={(v) => setFormData({ ...formData, engine_size: v })} placeholder="مثل: 3.0L أو 2000cc" />
            <Select label="ناقل الحركة" value={formData.transmission} onChange={(v) => setFormData({ ...formData, transmission: v })} options={['أوتوماتيك', 'يدوي']} />
            <Select label="نوع الوقود" value={formData.fuel_type} onChange={(v) => setFormData({ ...formData, fuel_type: v })} options={['بنزين', 'ديزل', 'هايبرد', 'كهربائي']} />
            <Select label="نوع الدفع" value={formData.drive_type} onChange={(v) => setFormData({ ...formData, drive_type: v })} options={['دفع أمامي', 'دفع خلفي', 'دفع رباعي']} />
            <Input label="اللون الخارجي" value={formData.exterior_color} onChange={(v) => setFormData({ ...formData, exterior_color: v })} placeholder="مثل: أسود, أبيض, فضي" />
            <Input label="اللون الداخلي" value={formData.interior_color} onChange={(v) => setFormData({ ...formData, interior_color: v })} placeholder="مثل: جلد بيج, أسود" />
            <Select label="حالة البيع" value={formData.status} onChange={(v) => setFormData({ ...formData, status: v })} options={['متوفرة', 'محجوزة', 'مباعة']} />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-300 mb-2 font-bold text-lg">الوصف</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={6}
              placeholder="اكتب وصفًا مفصلًا عن السيارة، مميزاتها، حالتها، أي إضافات..."
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 resize-none focus:border-red-600 transition text-base"
            />
          </div>

          {/* Images Section */}
          <div>
            <label className="block text-gray-300 mb-2 font-bold text-lg">الصور (روابط URLs)</label>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://example.com/car-image.jpg"
                className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:border-red-600 transition text-base"
              />
              <button
                type="button"
                onClick={addImageUrl}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white flex items-center justify-center gap-2 transition whitespace-nowrap"
              >
                <Upload size={20} /> إضافة
              </button>
            </div>

            {imageUrls.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {imageUrls.map((url, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={url}
                      alt={`صورة ${i + 1}`}
                      className="w-full h-40 object-cover rounded-lg border border-gray-700"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-2 left-2 bg-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Flags */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            <Checkbox label="سيارة مميزة" checked={formData.is_featured} onChange={(v) => setFormData({ ...formData, is_featured: v })} />
            <Checkbox label="إظهار للعملاء" checked={formData.is_visible} onChange={(v) => setFormData({ ...formData, is_visible: v })} />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-800">
            <button
              type="submit"
              disabled={loading || !formData.brand || !formData.model || formData.year <= 0 || formData.price <= 0}
              className="w-full sm:flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-700 py-4 rounded-lg font-bold text-white text-lg transition"
            >
              {loading ? 'جاري الحفظ...' : car ? 'حفظ التعديلات' : 'إضافة السيارة'}
            </button>
            <button type="button" onClick={onClose} className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 px-8 py-4 rounded-lg text-white font-bold text-lg transition">
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- المكونات الصغيرة ---------- */

interface InputProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  isNumeric?: boolean;
}

function Input({ label, value, onChange, placeholder, isNumeric = false }: InputProps) {
  return (
    <div>
      <label className="block text-gray-300 mb-2 font-bold text-lg">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={label.includes('*')}
        placeholder={placeholder}
        inputMode={isNumeric ? 'numeric' : 'text'}
        pattern={isNumeric ? '[0-9٠١٢٣٤٥٦٧٨٩]*' : undefined}
        dir="rtl"
        className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:border-red-600 transition text-base"
      />
    </div>
  );
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

function Select({ label, value, onChange, options }: SelectProps) {
  return (
    <div>
      <label className="block text-gray-300 mb-2 font-bold text-lg">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 focus:border-red-600 transition text-base"
      >
        <option value="">اختر...</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <label className="flex items-center gap-4 cursor-pointer select-none text-lg">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-6 h-6 text-red-600 bg-gray-800 border-gray-700 rounded focus:ring-red-600"
      />
      <span className="text-gray-300 font-bold">{label}</span>
    </label>
  );
}
