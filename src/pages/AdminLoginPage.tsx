import { useState } from 'react';
import { Lock, Mail, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { navigate } from '../components/Router';
import logoImage from '../assets/fardosi_logo.png';

export function AdminLoginPage() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      setLoading(false);
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4" dir="rtl">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <img
            src={logoImage}
            alt="Fardosi Cars"
            className="w-48 h-auto mx-auto mb-6 drop-shadow-2xl"
          />
          <h1 className="text-4xl font-bold text-white mb-2">لوحة التحكم</h1>
          <p className="text-gray-400">تسجيل دخول المسؤول</p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-red-900/30 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2 font-bold">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg pr-10 pl-4 py-3 focus:outline-none focus:border-red-600 transition-colors"
                  placeholder="admin@fardosicars.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 font-bold">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg pr-10 pl-4 py-3 focus:outline-none focus:border-red-600 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-900/30 border border-red-600 text-red-300 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-4 rounded-lg font-bold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
              ) : (
                <>
                  <LogIn size={24} />
                  تسجيل الدخول
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-red-600 transition-colors"
            >
              العودة إلى الموقع
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
