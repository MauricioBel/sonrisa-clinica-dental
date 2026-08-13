import { Link } from 'react-router-dom';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from './Logo.tsx';
import {
  BUSINESS_HOURS,
  CLINIC_ADDRESS,
  CLINIC_EMAIL,
  CLINIC_PHONE,
  WHATSAPP_LINK,
} from '../../lib/constants.ts';

const FOOTER_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/tratamientos', label: 'Tratamientos' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/equipo', label: 'Equipo profesional' },
  { to: '/preguntas-frecuentes', label: 'Preguntas frecuentes' },
  { to: '/contacto', label: 'Contacto' },
  { to: '/agendar-hora', label: 'Agendar hora' },
];

export function Footer() {
  return (
    <footer className="bg-brand-950 text-brand-100">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo footer />
            <p className="text-sm leading-relaxed text-brand-200">
              Cuidamos tu sonrisa con tecnología de vanguardia y un equipo de
              especialistas comprometidos con tu bienestar.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#167D3F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#137638]"
            >
              Escríbenos por WhatsApp
            </a>
          </div>

          <nav aria-label="Enlaces del sitio">
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-white">
              Navegación
            </h3>
            <ul className="space-y-2 text-sm">
              {FOOTER_LINKS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-brand-200 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-white">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
                <span>{CLINIC_ADDRESS}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
                <a href={`tel:${CLINIC_PHONE.replace(/\s/g, '')}`} className="hover:text-white">
                  {CLINIC_PHONE}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
                <a href={`mailto:${CLINIC_EMAIL}`} className="hover:text-white">
                  {CLINIC_EMAIL}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-white">
              Horarios
            </h3>
            <ul className="space-y-2 text-sm">
              {BUSINESS_HOURS.map((item) => (
                <li key={item.days} className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" aria-hidden="true" />
                  <span>
                    <span className="block font-medium text-white">{item.days}</span>
                    <span className="text-brand-200">{item.hours}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-brand-900 pt-6 text-center text-xs text-brand-300">
          <p>
            © {new Date().getFullYear()} Sonrisa Clínica Dental. Proyecto educativo
            con datos ficticios.
          </p>
        </div>
      </div>
    </footer>
  );
}