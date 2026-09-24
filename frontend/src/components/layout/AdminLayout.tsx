import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LogOut, CalendarCheck, LayoutDashboard } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';
import { Button } from '../ui/Button.tsx';

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/citas', label: 'Citas', icon: CalendarCheck },
];

export function AdminLayout() {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-6">
          <span className="font-display text-lg font-bold text-brand-900">Admin</span>
        </div>
        <nav className="flex-1 space-y-1 p-4" aria-label="Navegación admin">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-800'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-brand-800'
                }`
              }
            >
              <item.icon className="h-5 w-5" aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700">
              {user?.nombre?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{user?.nombre}</p>
              <p className="text-xs text-slate-500 truncate">{user?.clinicaNombre}</p>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
            Cerrar sesión
          </Button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-brand-900">Panel de Administración</h2>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}