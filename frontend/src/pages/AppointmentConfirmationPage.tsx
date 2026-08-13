import { useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Stethoscope,
} from 'lucide-react';
import { Seo } from '../components/Seo.tsx';
import { Card } from '../components/ui/Card.tsx';
import { Button } from '../components/ui/Button.tsx';
import { Badge } from '../components/ui/Badge.tsx';
import { ErrorMessage, Skeleton } from '../components/ui/Feedback.tsx';
import { useAppointment } from '../hooks/useAppointment.ts';
import { formatCLP, formatDateLong, formatTime } from '../lib/format.ts';
import { WHATSAPP_LINK } from '../lib/constants.ts';

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pendiente',
  CONFIRMED: 'Confirmada',
  CANCELLED: 'Cancelada',
  COMPLETED: 'Completada',
};

export function AppointmentConfirmationPage() {
  const { id } = useParams<{ id: string }>();
  const numericId = id ? Number(id) : null;
  const { data: appointment, loading, error } = useAppointment(
    Number.isInteger(numericId) && (numericId ?? 0) > 0 ? numericId : null,
  );

  return (
    <>
      <Seo
        title="Confirmación de reserva"
        description="Revisa el detalle de tu reserva en Sonrisa Clínica Dental."
        path={`/reserva/confirmacion/${id ?? ''}`}
      />

      <section className="bg-brand-50 py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-brand-950 sm:text-4xl">
            Confirmación de reserva
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        {loading && (
          <Card className="p-6">
            <Skeleton className="h-8 w-3/4" />
            <div className="mt-4 space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-2/3" />
            </div>
          </Card>
        )}

        {error && (
          <div>
            <ErrorMessage message={error} />
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button to="/agendar-hora">
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                Agendar otra hora
              </Button>
              <Button to="/" variant="outline">
                Ir al inicio
              </Button>
            </div>
          </div>
        )}

        {appointment && !loading && !error && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-brand-700 p-6 text-center text-white sm:p-8">
              <CheckCircle2 className="mx-auto h-12 w-12 text-brand-200" aria-hidden="true" />
              <h2 className="mt-3 font-display text-2xl font-bold">
                ¡Reserva confirmada!
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-brand-100">
                Tu hora fue registrada con éxito. Te esperamos en la fecha y horario
                indicados. Recibirás un recordatorio por WhatsApp.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold">
                <Badge variant="accent">N° {appointment.id}</Badge>
              </div>
            </div>

            <Card className="overflow-hidden">
              <div className="border-b border-slate-100 px-5 py-4">
                <h2 className="font-display text-lg font-bold text-brand-950">
                  Detalle de tu reserva
                </h2>
              </div>
              <dl className="divide-y divide-slate-100">
                <DetailRow icon={<Stethoscope className="h-4 w-4" aria-hidden="true" />} label="Tratamiento">
                  {appointment.treatment.name}
                </DetailRow>
                <DetailRow icon={<Clock className="h-4 w-4" aria-hidden="true" />} label="Duración">
                  {appointment.treatment.durationMinutes} minutos por sesión
                </DetailRow>
                <DetailRow label="Profesional">
                  {appointment.dentist.name}
                </DetailRow>
                <DetailRow label="Fecha">
                  {formatDateLong(appointment.date)}
                </DetailRow>
                <DetailRow label="Hora">
                  {formatTime(appointment.time)}
                </DetailRow>
                <DetailRow label="Valor referencial">
                  {formatCLP(appointment.treatment.price)}
                </DetailRow>
                <DetailRow label="Estado">
                  <Badge variant="accent">{STATUS_LABELS[appointment.status] ?? appointment.status}</Badge>
                </DetailRow>
              </dl>
            </Card>

            <Card className="overflow-hidden">
              <div className="border-b border-slate-100 px-5 py-4">
                <h2 className="font-display text-lg font-bold text-brand-950">
                  Tus datos
                </h2>
              </div>
              <dl className="divide-y divide-slate-100">
                <DetailRow label="Nombre">
                  {appointment.patientName} {appointment.patientLastName}
                </DetailRow>
                <DetailRow icon={<Mail className="h-4 w-4" aria-hidden="true" />} label="Email">
                  {appointment.patientEmail}
                </DetailRow>
                <DetailRow icon={<Phone className="h-4 w-4" aria-hidden="true" />} label="Teléfono">
                  {appointment.patientPhone}
                </DetailRow>
                {appointment.comment && (
                  <DetailRow label="Comentario">
                    {appointment.comment}
                  </DetailRow>
                )}
              </dl>
            </Card>

            <Card className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3 text-sm text-slate-600">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                <p>
                  Av. Providencia 1234, oficina 502, Providencia, Santiago.
                  Metro Salvador (Línea 1).
                </p>
              </div>
            </Card>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#167D3F] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#137638]"
              >
                Consultar por WhatsApp
              </a>
              <Button to="/" variant="outline">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Volver al inicio
              </Button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

function DetailRow({
  label,
  children,
  icon,
}: {
  label: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <dt className="flex shrink-0 items-center gap-2 text-sm font-semibold text-slate-500">
        {icon}
        {label}
      </dt>
      <dd className="text-sm font-medium text-brand-950">{children}</dd>
    </div>
  );
}
