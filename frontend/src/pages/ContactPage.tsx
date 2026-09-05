import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Seo } from '../components/Seo.tsx';
import { SectionTitle } from '../components/ui/SectionTitle.tsx';
import { Card } from '../components/ui/Card.tsx';
import { BusinessHours } from '../components/BusinessHours.tsx';
import {
  BUSINESS_HOURS,
  CLINIC_ADDRESS,
  CLINIC_EMAIL,
  CLINIC_PHONE,
  WHATSAPP_DISPLAY,
} from '../lib/constants.ts';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Ingresa tu nombre'),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9]{9,15}$/, 'Ingresa un teléfono válido'),
  message: z
    .string()
    .trim()
    .min(10, 'Cuéntanos brevemente tu consulta (mínimo 10 caracteres)')
    .max(500, 'El mensaje no puede superar 500 caracteres'),
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactForm) => {
    const text = encodeURIComponent(
      `Hola, soy ${data.name} (${data.phone}).\n\n${data.message}`,
    );
    window.open(`https://wa.me/${WHATSAPP_DISPLAY.replace(/\D/g, '')}?text=${text}`, '_blank');
  };

  return (
    <>
      <Seo
        title="Contacto"
        description="Contacta a Sonrisa Clínica Dental por WhatsApp, teléfono o correo. Estamos en Av. Providencia 1234, Providencia, Santiago."
        path="/contacto"
      />

      <section className="bg-brand-50 py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            level="h1"
            eyebrow="Contacto"
            title="Estamos para ayudarte"
            description="Escríbenos y te responderemos dentro del horario de atención. También puedes visitarnos en Providencia."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-brand-950">
              Envíanos tu consulta
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Completa el formulario y se abrirá WhatsApp con tu mensaje listo
              para enviar.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-6 space-y-4"
              noValidate
            >
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Nombre
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                  placeholder="Ej: María Pérez"
                  {...register('name')}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                />
                {errors.name && (
                  <p id="contact-name-error" role="alert" className="mt-1 text-xs text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Teléfono
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                  placeholder="+56 9 1234 5678"
                  {...register('phone')}
                  aria-invalid={errors.phone ? true : undefined}
                  aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                />
                {errors.phone && (
                  <p id="contact-phone-error" role="alert" className="mt-1 text-xs text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Mensaje
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  className="w-full resize-y rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                  placeholder="Cuéntanos en qué podemos ayudarte"
                  {...register('message')}
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                />
                {errors.message && (
                  <p id="contact-message-error" role="alert" className="mt-1 text-xs text-red-600">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#167D3F] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#137638] sm:w-auto min-h-[48px]"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Enviar por WhatsApp
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <Card className="p-6">
              <h2 className="font-display text-lg font-bold text-brand-950">Información de contacto</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                  <span>{CLINIC_ADDRESS}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                  <a href={`tel:${CLINIC_PHONE.replace(/\s/g, '')}`} className="hover:text-brand-800">
                    {CLINIC_PHONE}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                  <a href={`mailto:${CLINIC_EMAIL}`} className="hover:text-brand-800">
                    {CLINIC_EMAIL}
                  </a>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <h2 className="font-display text-lg font-bold text-brand-950">Horarios de atención</h2>
              <BusinessHours hours={BUSINESS_HOURS} />
            </Card>

            <Card className="bg-brand-900 p-6 text-white">
              <div>
                <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-brand-300">
                  Dirección
                </span>
                <p className="text-sm text-brand-100">{CLINIC_ADDRESS}</p>
              </div>
              <div className="mt-4">
                <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-brand-300">
                  Metro y acceso
                </span>
                <p className="text-sm text-brand-100">
                  A 3 cuadras de la estación Salvador (Línea 1). Edificio con
                  acceso universal y estacionamiento con convenio a pasos.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-brand-100">
                <Clock className="h-4 w-4 text-brand-300" aria-hidden="true" />
                Respuesta promedio: el mismo día
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}