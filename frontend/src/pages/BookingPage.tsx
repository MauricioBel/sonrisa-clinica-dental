import type { KeyboardEvent, ReactNode } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Check,
  Clock,
} from 'lucide-react';
import { Seo } from '../components/Seo.tsx';
import { Card } from '../components/ui/Card.tsx';
import { Button } from '../components/ui/Button.tsx';
import { SectionTitle } from '../components/ui/SectionTitle.tsx';
import { ErrorMessage, EmptyState, Spinner } from '../components/ui/Feedback.tsx';
import { useTreatments } from '../hooks/useTreatments.ts';
import { useDentists } from '../hooks/useDentists.ts';
import { useAvailability } from '../hooks/useAvailability.ts';
import { api, ApiError } from '../lib/api.ts';
import {
  dayNameShort,
  dayOfWeekFromISO,
  formatDateLong,
  formatDateShort,
  formatCLP,
  formatTime,
  nextDays,
} from '../lib/format.ts';

const patientSchema = z.object({
  patientName: z
    .string()
    .trim()
    .min(2, 'Ingresa tu nombre')
    .max(80, 'El nombre no puede superar 80 caracteres'),
  patientLastName: z
    .string()
    .trim()
    .min(2, 'Ingresa tu apellido')
    .max(80, 'El apellido no puede superar 80 caracteres'),
  patientEmail: z.string().trim().email('El email no es válido').max(120),
  patientPhone: z
    .string()
    .trim()
    .regex(/^\+?[0-9]{9,15}$/, 'Ingresa un teléfono válido'),
  comment: z
    .string()
    .trim()
    .max(500, 'El comentario no puede superar 500 caracteres')
    .optional(),
});

type PatientForm = z.infer<typeof patientSchema>;

const STEPS = [
  { label: 'Tratamiento' },
  { label: 'Profesional' },
  { label: 'Fecha y hora' },
  { label: 'Tus datos' },
  { label: 'Revisión' },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <ol
      aria-label="Pasos de la reserva"
      className="mx-auto flex max-w-2xl items-center justify-between gap-1"
    >
      {STEPS.map((step, i) => {
        const number = i + 1;
        const done = number < current;
        const active = number === current;
        return (
          <li key={step.label} className="flex flex-1 items-center gap-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <span
                aria-current={active ? 'step' : undefined}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                  done
                    ? 'bg-brand-700 text-white'
                    : active
                      ? 'bg-brand-700 text-white ring-4 ring-brand-100'
                      : 'bg-slate-200 text-slate-500'
                }`}
              >
                {done ? <Check className="h-4 w-4" aria-hidden="true" /> : number}
              </span>
              <span
                className={`hidden text-[11px] font-semibold sm:block ${
                  active ? 'text-brand-900' : 'text-slate-500'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-0.5 flex-1 ${done ? 'bg-brand-700' : 'bg-slate-200'}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Navegación por teclado para grupos de `role="radio"` con roving tabindex:
 * ←/↑ y →/↓ mueven la selección, Home/End van al primero/último.
 */
function handleRadioKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
  const group = e.currentTarget.parentElement;
  if (!group) return;
  const radios = Array.from(
    group.querySelectorAll<HTMLButtonElement>('[role="radio"]'),
  );
  const index = radios.indexOf(e.currentTarget);
  if (index === -1) return;

  let next: number;
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    next = (index + 1) % radios.length;
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    next = (index - 1 + radios.length) % radios.length;
  } else if (e.key === 'Home') {
    next = 0;
  } else if (e.key === 'End') {
    next = radios.length - 1;
  } else {
    return;
  }
  if (next === index) return;
  e.preventDefault();
  radios[next]?.click();
  radios[next]?.focus();
}

function SelectableCard({
  selected,
  onSelect,
  children,
  className = '',
}: {
  selected: boolean;
  onSelect: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative w-full rounded-2xl border-2 p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
        selected
          ? 'border-brand-600 bg-brand-50'
          : 'border-slate-200 bg-white hover:border-brand-300'
      } ${className}`}
    >
      {selected && (
        <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-brand-700 text-white">
          <Check className="h-4 w-4" aria-hidden="true" />
        </span>
      )}
      {children}
    </button>
  );
}

export function BookingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSlug = searchParams.get('tratamiento');

  const { data: treatments, loading: treatmentsLoading, error: treatmentsError } = useTreatments();
  const { data: dentists, loading: dentistsLoading, error: dentistsError } = useDentists();

  const [step, setStep] = useState(1);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const prevStepRef = useRef(1);

  // Mueve el foco al encabezado del paso al navegar (la pantalla 3.5 no lo hace).
  useEffect(() => {
    if (prevStepRef.current !== step) {
      prevStepRef.current = step;
      stepHeadingRef.current?.focus({ preventScroll: true });
    }
  }, [step]);
  const [treatmentId, setTreatmentId] = useState<number | null>(null);
  const [dentistId, setDentistId] = useState<number | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [reserved, setReserved] = useState(false);

  const availability = useAvailability({
    date: date ?? '',
    treatmentId: treatmentId ?? 0,
    dentistId: dentistId ?? 0,
  });

  const selectedTreatment = useMemo(
    () => treatments?.find((t) => t.id === treatmentId) ?? null,
    [treatments, treatmentId],
  );

  const selectedDentist = useMemo(
    () => dentists?.find((d) => d.id === dentistId) ?? null,
    [dentists, dentistId],
  );

  // Preseleccionar tratamiento desde ?tratamiento=slug (enlace de la ficha).
  const initialTreatment = useMemo(() => {
    if (!initialSlug) return null;
    return treatments?.find((t) => t.slug === initialSlug) ?? null;
  }, [initialSlug, treatments]);

  // Días en que el dentista atiende, según sus BusinessHours (UX; el backend es la autoridad).
  const dentistDays = useMemo(() => {
    const days = new Set<number>();
    selectedDentist?.businessHours.forEach((h) => days.add(h.dayOfWeek));
    return days;
  }, [selectedDentist]);

  const candidateDates = useMemo(() => {
    const dates = nextDays(14);
    if (!selectedDentist || dentistDays.size === 0) return dates;
    return dates.filter((d) => dentistDays.has(dayOfWeekFromISO(d)));
  }, [selectedDentist, dentistDays]);

  const canContinueFrom = (s: number): boolean => {
    switch (s) {
      case 1:
        return treatmentId !== null;
      case 2:
        return treatmentId !== null && dentistId !== null;
      case 3:
        return treatmentId !== null && dentistId !== null && date !== null;
      case 4:
        return treatmentId !== null && dentistId !== null && date !== null && time !== null;
      default:
        return true;
    }
  };

  const goNext = async () => {
    if (!canContinueFrom(step)) return;
    if (step === 4) {
      const valid = await form.trigger();
      if (!valid) return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length));
  };

  const goBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const form = useForm<PatientForm>({
    resolver: zodResolver(patientSchema),
    defaultValues: { comment: '' },
  });

  const advanceFromForm = (data: PatientForm) => {
    void data;
    setStep((s) => Math.min(s + 1, STEPS.length));
  };

  const onSubmit = async (data: PatientForm) => {
    if (!treatmentId || !dentistId || !date || !time) return;
    if (submitting || reserved) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await api.createAppointment({
        patientName: data.patientName,
        patientLastName: data.patientLastName,
        patientEmail: data.patientEmail,
        patientPhone: data.patientPhone,
        treatmentId,
        dentistId,
        date,
        time,
        comment: data.comment || null,
      });
      setReserved(true);
      navigate(`/reserva/confirmacion/${result.id}`);
    } catch (e) {
      if (e instanceof ApiError && e.status === 409) {
        setSubmitError(e.message);
        // La hora fue ocupada: volvemos a elegir horario y refrescamos disponibilidad.
        setStep(3);
        setTime(null);
        availability.reload();
      } else if (e instanceof ApiError) {
        setSubmitError(e.message);
      } else {
        setSubmitError(
          'No fue posible completar la reserva. Revisa tu conexión e inténtalo de nuevo.',
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const submitFromReview = () => {
    void form.handleSubmit(onSubmit)();
  };

  return (
    <>
      <Seo
        title="Agendar hora"
        description="Agenda tu hora online en Sonrisa Clínica Dental: elige tratamiento, profesional, fecha y horario en menos de un minuto."
        path="/agendar-hora"
      />

      <section className="bg-brand-50 py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            level="h1"
            eyebrow="Reserva online"
            title="Agenda tu hora en minutos"
            description="Selecciona el tratamiento, el profesional y el horario disponible que más te acomode."
          />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="sr-only" role="status" aria-live="polite">
          Paso {step} de {STEPS.length}: {STEPS[step - 1]?.label}
        </p>
        <StepIndicator current={step} />

        <div className="mt-8">
          {/* Paso 1: Tratamiento */}
          {step === 1 && (
            <div>
              <h2
                ref={stepHeadingRef}
                tabIndex={-1}
                className="font-display text-2xl font-bold text-brand-950"
              >
                Elige tu tratamiento
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Si vienes desde una ficha de tratamiento, ya está preseleccionado.
              </p>

              {treatmentsLoading && <Spinner label="Cargando tratamientos..." />}
              {treatmentsError && <ErrorMessage message={treatmentsError} />}

              {treatments && !treatmentsError && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {treatments.map((treatment) => (
                    <SelectableCard
                      key={treatment.id}
                      selected={treatment.id === (initialTreatment?.id ?? treatmentId)}
                      onSelect={() => {
                        setTreatmentId(treatment.id);
                        setDate(null);
                        setTime(null);
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={treatment.imageUrl}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          className="h-14 w-14 shrink-0 rounded-xl object-cover"
                        />
                        <div className="min-w-0">
                          <h3 className="font-display font-bold text-brand-950">
                            {treatment.name}
                          </h3>
                          <p className="mt-0.5 line-clamp-2 text-sm text-slate-600">
                            {treatment.shortDescription}
                          </p>
                          <p className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                              {treatment.durationMinutes} min
                            </span>
                            <span className="font-semibold text-brand-800">
                              {formatCLP(treatment.price)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </SelectableCard>
                  ))}
                </div>
              )}

              {treatments && !treatmentsError && treatments.length === 0 && (
                <EmptyState message="Aún no hay tratamientos disponibles para agendar." />
              )}
            </div>
          )}

          {/* Paso 2: Dentista */}
          {step === 2 && (
            <div>
              <h2
                ref={stepHeadingRef}
                tabIndex={-1}
                className="font-display text-2xl font-bold text-brand-950"
              >
                Elige tu profesional
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Todos los horarios disponibles se confirman en tiempo real.
              </p>

              {dentistsLoading && <Spinner label="Cargando profesionales..." />}
              {dentistsError && <ErrorMessage message={dentistsError} />}

              {dentists && !dentistsError && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {dentists.map((dentist) => (
                    <SelectableCard
                      key={dentist.id}
                      selected={dentist.id === dentistId}
                      onSelect={() => {
                        setDentistId(dentist.id);
                        setDate(null);
                        setTime(null);
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={dentist.imageUrl}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          className="h-14 w-14 shrink-0 rounded-full object-cover"
                        />
                        <div className="min-w-0">
                          <h3 className="font-display font-bold text-brand-950">
                            {dentist.name}
                          </h3>
                          <p className="text-sm font-medium text-brand-700">{dentist.role}</p>
                          <p className="mt-0.5 text-xs text-slate-500">{dentist.specialty}</p>
                        </div>
                      </div>
                    </SelectableCard>
                  ))}
                </div>
              )}

              {dentists && !dentistsError && dentists.length === 0 && (
                <EmptyState message="Aún no hay profesionales disponibles." />
              )}
            </div>
          )}

          {/* Paso 3: Fecha y hora */}
          {step === 3 && (
            <div>
              <h2
                ref={stepHeadingRef}
                tabIndex={-1}
                className="font-display text-2xl font-bold text-brand-950"
              >
                Elige fecha y horario
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Los horarios provienen del sistema de disponibilidad del backend y
                pueden cambiar si otro paciente reserva antes.
              </p>

              <div className="mt-6">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Fecha</span>
                {candidateDates.length === 0 ? (
                  <EmptyState message="El profesional no tiene horarios disponibles en los próximos días." />
                ) : (
                  <div
                    role="radiogroup"
                    aria-label="Elige la fecha"
                    className="flex flex-wrap gap-2"
                  >
                    {candidateDates.map((d, i) => {
                      const selected = d === date;
                      return (
                        <button
                          key={d}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          tabIndex={selected || i === 0 ? 0 : -1}
                          onKeyDown={handleRadioKeyDown}
                          onClick={() => {
                            setDate(d);
                            setTime(null);
                            setSubmitError(null);
                          }}
                          className={`flex min-w-16 flex-col items-center rounded-xl border-2 px-3 py-2 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
                            selected
                              ? 'border-brand-600 bg-brand-50'
                              : 'border-slate-200 bg-white hover:border-brand-300'
                          }`}
                        >
                          <span className="text-xs font-bold uppercase text-brand-700">
                            {dayNameShort(dayOfWeekFromISO(d))}
                          </span>
                          <span className="font-display text-lg font-bold text-brand-950">
                            {Number(d.slice(8, 10))}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {formatDateShort(d).split(' ').slice(0, 2).join(' ')}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {date && (
                <div className="mt-8">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">
                    Horarios disponibles para {formatDateLong(date)}
                  </span>
                  {submitError && (
                    <div className="mb-4">
                      <ErrorMessage message={submitError} />
                    </div>
                  )}
                  {availability.loading && <Spinner label="Consultando horarios..." />}
                  {availability.error && <ErrorMessage message={availability.error} />}
                  {availability.data &&
                    !availability.loading &&
                    !availability.error &&
                    (availability.data.isOpen === false ||
                      availability.data.slots.length === 0) && (
                      <EmptyState message="No hay horarios disponibles para esta fecha. Elige otra fecha." />
                    )}
                  {availability.data &&
                    !availability.loading &&
                    !availability.error &&
                    availability.data.isOpen &&
                    availability.data.slots.length > 0 && (
                      <div role="radiogroup" aria-label="Elige la hora" className="flex flex-wrap gap-2">
                        {availability.data.slots.map((slot, i) => {
                          const selected = slot === time;
                          return (
                            <button
                              key={slot}
                              type="button"
                              role="radio"
                              aria-checked={selected}
                              tabIndex={selected || i === 0 ? 0 : -1}
                              onKeyDown={handleRadioKeyDown}
                              onClick={() => {
                                setTime(slot);
                                setSubmitError(null);
                              }}
                              className={`flex min-w-20 items-center justify-center gap-1 rounded-lg border-2 px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
                                selected
                                  ? 'border-brand-600 bg-brand-700 text-white'
                                  : 'border-slate-200 bg-white text-slate-700 hover:border-brand-300'
                              }`}
                            >
                              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    )}
                </div>
              )}
            </div>
          )}

          {/* Paso 4: Datos del paciente */}
          {step === 4 && (
            <div>
              <h2
                ref={stepHeadingRef}
                tabIndex={-1}
                className="font-display text-2xl font-bold text-brand-950"
              >Tus datos</h2>
              <p className="mt-1 text-sm text-slate-600">
                Completa tus datos de contacto. No enviaremos spam.
              </p>

              <form
                id="booking-form"
                onSubmit={form.handleSubmit(advanceFromForm)}
                className="mt-6 grid gap-4 sm:grid-cols-2"
                noValidate
              >
                <div>
                  <label htmlFor="patient-name" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Nombre
                  </label>
                  <input
                    id="patient-name"
                    type="text"
                    autoComplete="given-name"
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                    placeholder="Ej: María"
                    {...form.register('patientName')}
                    aria-invalid={form.formState.errors.patientName ? true : undefined}
                    aria-describedby={
                      form.formState.errors.patientName ? 'patient-name-error' : undefined
                    }
                  />
                  {form.formState.errors.patientName && (
                    <p id="patient-name-error" role="alert" className="mt-1 text-xs text-red-600">
                      {form.formState.errors.patientName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="patient-lastname" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Apellido
                  </label>
                  <input
                    id="patient-lastname"
                    type="text"
                    autoComplete="family-name"
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                    placeholder="Ej: Pérez"
                    {...form.register('patientLastName')}
                    aria-invalid={form.formState.errors.patientLastName ? true : undefined}
                    aria-describedby={
                      form.formState.errors.patientLastName ? 'patient-lastname-error' : undefined
                    }
                  />
                  {form.formState.errors.patientLastName && (
                    <p id="patient-lastname-error" role="alert" className="mt-1 text-xs text-red-600">
                      {form.formState.errors.patientLastName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="patient-email" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    id="patient-email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                    placeholder="tucorreo@ejemplo.cl"
                    {...form.register('patientEmail')}
                    aria-invalid={form.formState.errors.patientEmail ? true : undefined}
                    aria-describedby={
                      form.formState.errors.patientEmail ? 'patient-email-error' : undefined
                    }
                  />
                  {form.formState.errors.patientEmail && (
                    <p id="patient-email-error" role="alert" className="mt-1 text-xs text-red-600">
                      {form.formState.errors.patientEmail.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="patient-phone" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Teléfono
                  </label>
                  <input
                    id="patient-phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                    placeholder="+56 9 1234 5678"
                    {...form.register('patientPhone')}
                    aria-invalid={form.formState.errors.patientPhone ? true : undefined}
                    aria-describedby={
                      form.formState.errors.patientPhone ? 'patient-phone-error' : undefined
                    }
                  />
                  {form.formState.errors.patientPhone && (
                    <p id="patient-phone-error" role="alert" className="mt-1 text-xs text-red-600">
                      {form.formState.errors.patientPhone.message}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="patient-comment" className="mb-1.5 block text-sm font-medium text-slate-700">
                    Comentario <span className="font-normal text-slate-500">(opcional)</span>
                  </label>
                  <textarea
                    id="patient-comment"
                    rows={4}
                    className="w-full resize-y rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                    placeholder="Cuéntanos si tienes alguna preferencia o duda"
                    {...form.register('comment')}
                    aria-invalid={form.formState.errors.comment ? true : undefined}
                    aria-describedby={
                      form.formState.errors.comment ? 'patient-comment-error' : undefined
                    }
                  />
                  {form.formState.errors.comment && (
                    <p id="patient-comment-error" role="alert" className="mt-1 text-xs text-red-600">
                      {form.formState.errors.comment.message}
                    </p>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* Paso 5: Revisión */}
          {step === 5 && (
            <div>
              <h2
                ref={stepHeadingRef}
                tabIndex={-1}
                className="font-display text-2xl font-bold text-brand-950"
              >
                Revisa tu reserva
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Verifica que todos los datos sean correctos antes de confirmar.
              </p>

              <Card className="mt-6 overflow-hidden">
                <dl className="divide-y divide-slate-100">
                  <ReviewRow label="Tratamiento">
                    {selectedTreatment?.name}
                  </ReviewRow>
                  <ReviewRow label="Duración">
                    {selectedTreatment
                      ? `${selectedTreatment.durationMinutes} minutos por sesión`
                      : '—'}
                  </ReviewRow>
                  <ReviewRow label="Profesional">
                    {selectedDentist?.name}
                  </ReviewRow>
                  <ReviewRow label="Fecha">
                    {date ? formatDateLong(date) : '—'}
                  </ReviewRow>
                  <ReviewRow label="Hora">
                    {time ? formatTime(time) : '—'}
                  </ReviewRow>
                  <ReviewRow label="Precio referencial">
                    {selectedTreatment ? formatCLP(selectedTreatment.price) : '—'}
                  </ReviewRow>
                  <ReviewRow label="Nombre">
                    {form.watch('patientName')} {form.watch('patientLastName')}
                  </ReviewRow>
                  <ReviewRow label="Contacto">
                    {form.watch('patientEmail')} · {form.watch('patientPhone')}
                  </ReviewRow>
                </dl>
              </Card>

              {submitError && (
                <div className="mt-4">
                  <ErrorMessage message={submitError} />
                </div>
              )}

              <div className="mt-6 rounded-xl bg-brand-50 p-4 text-sm text-slate-600">
                Al confirmar, tu horario quedará reservado de inmediato. Si no puedes
                asistir, avísanos con 24 horas de anticipación y reagendamos sin costo.
              </div>
            </div>
          )}
        </div>

        {/* Navegación */}
        <div className="mt-10 flex items-center justify-between gap-3">
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={goBack} disabled={submitting}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Volver
            </Button>
          ) : (
            <span />
          )}

          {step < STEPS.length && (
            <Button
              type="button"
              onClick={() => void goNext()}
              disabled={!canContinueFrom(step)}
              className="ml-auto"
            >
              Continuar
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          )}

          {step === STEPS.length && (
            <Button
              type="button"
              onClick={submitFromReview}
              loading={submitting}
              disabled={submitting}
              className="ml-auto"
            >
              {submitting ? 'Reservando...' : 'Confirmar reserva'}
              {!submitting && <CalendarCheck className="h-5 w-5" aria-hidden="true" />}
            </Button>
          )}
        </div>
      </section>
    </>
  );
}

function ReviewRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <dt className="shrink-0 text-sm font-semibold text-slate-500">{label}</dt>
      <dd className="text-sm font-medium text-brand-950">{children}</dd>
    </div>
  );
}
