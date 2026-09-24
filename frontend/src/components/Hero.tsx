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
    <section className="relative overflow-hidden hero-gradient">
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold shadow-sm badge">
            <span className="h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
            {eyebrow}
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-brand-950 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/agendar-hora" size="lg">
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              Agendar mi hora
            </Button>
            <Button to="/tratamientos" variant="outline" size="lg">
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
    <section className="section-divider bg-brand-900 dark:bg-brand-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-12 text-center sm:px-6 lg:flex-row lg:justify-between lg:px-8 lg:text-left">
        <div>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">{title}</h2>
          <p className="mt-2 max-w-xl text-brand-100">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/agendar-hora" size="lg">
            Agendar hora
          </Button>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white transition-colors min-h-[48px]"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}