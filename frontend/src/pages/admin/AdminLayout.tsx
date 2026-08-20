import type { ComponentType } from 'react';
import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  CalendarDays,
  CalendarOff,
  HeartPulse,
  LayoutDashboard,
  LogOut,
  Menu,
  Stethoscope,
  X,
} from 'lucide-react';
import { Logo } from '../../components/layout/Logo.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { ErrorMessage, Spinner } from '../../components/ui/Feedback.tsx';
import { api, ApiError } from '../../lib/api.ts';
import { clearSession, getStoredToken, getStoredUser } from '../../lib/auth.ts';

interface NavItem {
  to: string;
  label: string;
  end?: boolean;
  icon: ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { to: '/admin', label: 'Resumen', end: true, icon: LayoutDashboard },
  { to: '/admin/citas', label: 'Citas', icon: CalendarDays },
  { to: '/admin/dentistas', label: 'Dentistas', icon: Stethoscope },
  { to: '/admin/tratamientos', label: 'Tratamientos', icon: HeartPulse },
  { to: '/admin/bloqueos', label: 'Bloqueos', icon: CalendarOff },
];

function SidebarLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
          isActive
            ? 'bg-brand-700 text-white shadow-sm'
            : 'text-slate-600 hover:bg-brand-50 hover:text-brand-900'
        }`
      }
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
      {item.label}
    </NavLink>
  );
}

/**
 * Layout del panel administrativo. Protege todas las rutas hijas: sin token
 * redirige al login y, si el token existe, lo valida contra GET /api/auth/me.
 */
export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getStoredUser();
  const [checking, setChecking] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!getStoredToken()) {
      navigate('/admin/login', { replace: true });
      return;
    }
    let cancelled = false;
    api
      .me()
      .then(() => {
        if (!cancelled) setChecking(false);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        if (e instanceof ApiError && e.status === 401) {
          clearSession();
          navigate('/admin/login', {
            replace: true,
            state: { from: location.pathname },
          });
        } else {
          setAuthError(
            e instanceof ApiError
              ? e.message
              : 'No se pudo validar la sesión. Verifica tu conexión.',
          );
          setChecking(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [navigate, location.pathname]);

  const logout = () => {
    clearSession();
    navigate('/admin/login', { replace: true });
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-950/5">
        <Spinner label="Verificando sesión..." />
      </div>
    );
  }

  if (authError) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-sm space-y-4">
          <ErrorMessage message={authError} />
          <Button className="w-full" onClick={() => window.location.reload()}>
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  const userInitial = (user?.name ?? 'A').charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-16 items-center border-b border-slate-200 px-5">
          <Logo />
        </div>
        <nav
          aria-label="Panel administrativo"
          className="flex-1 space-y-1 overflow-y-auto px-3 py-4"
        >
          {NAV_ITEMS.map((item) => (
            <SidebarLink key={item.to} item={item} />
          ))}
        </nav>
        <div className="border-t border-slate-200 p-4">
          <div className="mb-3 flex items-center gap-3 px-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-800">
              {userInitial}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-brand-950">{user?.name}</p>
              <p className="truncate text-xs text-slate-500">{user?.email}</p>
            </div>
          </div>
          <Button type="button" variant="outline" className="w-full" onClick={logout}>
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Cerrar sesión
          </Button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="admin-mobile-nav"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="inline-flex items-center justify-center rounded-lg p-2 text-brand-900 hover:bg-brand-50 lg:hidden"
            >
              {menuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
            <p className="font-display text-lg font-bold text-brand-950">Panel administrativo</p>
          </div>
          <span className="hidden text-sm text-slate-600 sm:inline">{user?.name}</span>
        </header>

        {menuOpen && (
          <nav
            id="admin-mobile-nav"
            aria-label="Panel administrativo"
            className="border-b border-slate-200 bg-white lg:hidden"
          >
            <ul className="space-y-1 px-3 py-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <SidebarLink item={item} onNavigate={() => setMenuOpen(false)} />
                </li>
              ))}
              <li className="pt-2">
                <Button type="button" variant="outline" className="w-full" onClick={logout}>
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Cerrar sesión
                </Button>
              </li>
            </ul>
          </nav>
        )}

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}