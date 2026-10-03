import { CalendarCheck } from 'lucide-react';
import { Button } from './ui/Button.tsx';
import { useWhatsApp } from '../hooks/useConfig.ts';

interface HeroProps {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
}

export function Hero({ eyebrow, title, description }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-clinica.jpg')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 z-0 bg-white/60" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl text-center sm:text-left">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold bg-blue-50 text-blue-700 border border-blue-100">
            <span className="h-2 w-2 rounded-full bg-blue-500" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 mx-auto sm:mx-0">
            {description}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row justify-center sm:justify-start">
            <Button
              to="/agendar-hora"
              size="lg"
              className="w-full sm:w-auto min-h-[52px] bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-200 rounded-lg"
            >
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              Agendar mi hora
            </Button>
            <Button
              to="/tratamientos"
              size="lg"
              className="w-full sm:w-auto min-h-[52px] border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg"
            >
              Ver tratamientos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

interface CTABandProps {
  title: string;
  description: string;
}

export function CTABand({ title, description }: CTABandProps) {
  const { link: whatsappLink } = useWhatsApp();
  return (
    <section className="bg-white border-t border-slate-200">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-12 text-center sm:px-6 lg:flex-row lg:justify-between lg:px-8 lg:text-left">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h2>
          <p className="mt-2 max-w-xl text-slate-600">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            to="/agendar-hora"
            size="lg"
            className="min-h-[48px] bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-200 rounded-lg"
          >
            Agendar hora
          </Button>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white transition-colors min-h-[48px] rounded-lg bg-[#167D3F] hover:bg-[#137638]"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}