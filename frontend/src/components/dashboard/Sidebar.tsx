import { NavLink } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';

type UserRole = 'ADMIN' | 'DENTIST' | 'RECEPTION';

interface NavItem {
  to: string;
  label: string;
  icon: string;
  allowedRoles: UserRole[];
}

const NAVIGATION_ITEMS: NavItem[] = [
  { to: '/admin', label: 'Agenda Diaria', icon: '📅', allowedRoles: ['ADMIN', 'DENTIST', 'RECEPTION'] },
  { to: '/admin/patients', label: 'Pacientes', icon: '👥', allowedRoles: ['ADMIN', 'RECEPTION'] },
  { to: '/admin/treatments', label: 'Tratamientos', icon: '🦷', allowedRoles: ['ADMIN', 'DENTIST'] },
  { to: '/admin/dentists', label: 'Profesionales', icon: '👨‍⚕️', allowedRoles: ['ADMIN'] },
  { to: '/admin/reports', label: 'Reportes', icon: '📊', allowedRoles: ['ADMIN'] },
  { to: '/admin/billing', label: 'Suscripción SaaS', icon: '💳', allowedRoles: ['ADMIN'] },
  { to: '/admin/settings', label: 'Configuración', icon: '⚙️', allowedRoles: ['ADMIN'] },
];

export function Sidebar() {
  const { user } = useAdminAuth();

  const userRole = user?.role || 'ADMIN';
  const filteredItems = NAVIGATION_ITEMS.filter((item) => item.allowedRoles.includes(userRole));

  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800">
      <div className="flex h-16 items-center justify-between border-b border-slate-800 px-6">
        <span className="font-display text-lg font-bold text-white">Sonrisa Admin</span>
      </div>
      <nav className="flex-1 space-y-1 p-4 overflow-y-auto" aria-label="Navegación principal">
        {filteredItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-slate-800 text-white'
                  : 'hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <span className="text-base" aria-hidden="true">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}