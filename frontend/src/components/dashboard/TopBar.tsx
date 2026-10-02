import { Search, Building2, UserCircle, ChevronDown, Keyboard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';

export function TopBar() {
  const { user } = useAdminAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const input = document.getElementById('global-search') as HTMLInputElement;
        input?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            id="global-search"
            type="search"
            placeholder="Buscar citas, pacientes, tratamientos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-12 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200 focus:bg-white"
            aria-label="Búsqueda global (Ctrl+K)"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 border border-slate-200">
            <Keyboard className="h-3 w-3" aria-hidden="true" />
            <span>K</span>
          </kbd>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
            <Building2 className="h-4 w-4 text-slate-500" aria-hidden="true" />
            <span className="text-sm font-medium text-slate-700">{user?.clinicaNombre || 'Clínica activa'}</span>
            <ChevronDown className="h-4 w-4 text-slate-400" aria-hidden="true" />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition-colors"
              aria-expanded={showUserMenu}
              aria-haspopup="true"
            >
              <UserCircle className="h-6 w-6 text-slate-500" aria-hidden="true" />
              <span className="hidden sm:block text-sm font-medium text-slate-700">{user?.nombre}</span>
              <ChevronDown className="h-4 w-4 text-slate-400" aria-hidden="true" />
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white border border-slate-200 shadow-lg py-1 z-50">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-sm font-medium text-slate-900">{user?.nombre}</p>
                  <p className="text-xs text-slate-500">{user?.email}</p>
                  <p className="text-xs text-slate-500 capitalize">{user?.role?.toLowerCase()}</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                  <UserCircle className="h-4 w-4" aria-hidden="true" />
                  Mi perfil
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50 flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}