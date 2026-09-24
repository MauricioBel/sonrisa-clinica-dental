import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CalendarCheck, Menu, X } from 'lucide-react';
import { Logo } from './Logo.tsx';
import { Button } from '../ui/Button.tsx';
import { useWhatsApp } from '../../hooks/useConfig.ts';

const NAV_ITEMS = [
  { to: '/', label: 'Inicio' },
  { to: '/tratamientos', label: 'Tratamientos' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/equipo', label: 'Equipo' },
  { to: '/preguntas-frecuentes', label: 'Preguntas frecuentes' },
  { to: '/contacto', label: 'Contacto' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { link: whatsappLink } = useWhatsApp();

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? 'text-brand-800 bg-brand-50' : 'text-slate-600 hover:text-brand-800'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={navLinkClasses} end={item.to === '/'}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#1f7a5c] transition-colors hover:bg-[#e0f2e9] min-h-[44px]"
          >
            WhatsApp
          </a>
          <Button to="/agendar-hora">
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Agendar hora
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-brand-900 hover:bg-brand-50 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-slate-200 bg-white lg:hidden">
          <ul className="space-y-1 px-4 py-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={navLinkClasses}
                  end={item.to === '/'}
                >
                  <span className="block px-3 py-2">{item.label}</span>
                </NavLink>
              </li>
            ))}
            <li className="flex flex-col gap-2 pt-3">
              <Button to="/agendar-hora" className="w-full">
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                Agendar hora
              </Button>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-brand-300 px-4 py-3 text-sm font-semibold text-brand-800 hover:bg-brand-50 min-h-[44px]"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}