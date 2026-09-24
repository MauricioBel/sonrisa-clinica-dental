import { MessageCircle } from 'lucide-react';
import { useWhatsApp } from '../../hooks/useConfig.ts';

/** Botón flotante de WhatsApp, visible en todas las vistas. */
export function WhatsAppFloat() {
  const { link, display } = useWhatsApp();
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Consultar por WhatsApp al ${display}`}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#167D3F] text-white shadow-lg transition hover:scale-105 hover:bg-[#137638] sm:h-16 sm:w-16"
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}