import { Router, useCurrentPath } from './components/Router';
import { AuthProvider } from './contexts/AuthContext';
import { HomePage } from './pages/HomePage';
import { CarsPage } from './pages/CarsPage';
import { CarDetailPage } from './pages/CarDetailPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboard } from './pages/AdminDashboard';

function AppContent() {
  const path = useCurrentPath();

  if (path === '/') return <HomePage />;
  if (path === '/cars') return <CarsPage />;
  if (path.startsWith('/car/')) return <CarDetailPage />;
  if (path === '/admin') return <AdminLoginPage />;
  if (path === '/admin/dashboard') return <AdminDashboard />;

  return <HomePage />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
