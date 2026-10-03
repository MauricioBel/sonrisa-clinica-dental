import { useEffect, useState } from 'react';
import { MoreVertical, Eye, CheckCircle } from 'lucide-react';
import { adminApi } from '../../lib/api-admin.ts';
import type { AdminAppointment } from '../../types/admin.ts';
import { StatusBadge } from './StatusBadge.tsx';
import { ErrorMessage, Skeleton } from '../../components/ui/Feedback.tsx';

type AppointmentStatus = 'CONFIRMED' | 'PENDING' | 'IN_PROGRESS' | 'CANCELLED';

interface AppointmentRow {
  id: number;
  time: string;
  patientName: string;
  patientLastName: string;
  patientPhone: string;
  treatment: string;
  dentist: string;
  status: AppointmentStatus;
}

interface ActionMenuProps {
  appointmentId: number;
}

function ActionMenu({ appointmentId: _appointmentId }: ActionMenuProps) {
  return (
    <div className="relative inline-block text-left">
      <button
        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        aria-label="Más acciones"
      >
        <MoreVertical className="h-5 w-5" aria-hidden="true" />
      </button>
      <div className="absolute right-0 mt-1 w-36 rounded-lg bg-white border border-slate-200 shadow-lg py-1 z-10">
        <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2">
          <Eye className="h-4 w-4" aria-hidden="true" />
          Ver Ficha
        </button>
        <button className="w-full text-left px-4 py-2 text-sm text-brand-700 hover:bg-brand-50 flex items-center gap-2">
          <CheckCircle className="h-4 w-4" aria-hidden="true" />
          Confirmar
        </button>
        <hr className="my-1 border-slate-100" />
        <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Cancelar
        </button>
      </div>
    </div>
  );
}

function AppointmentSkeleton() {
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="p-4 whitespace-nowrap"><Skeleton className="h-5 w-20" /></td>
      <td className="p-4"><Skeleton className="h-5 w-48" /><Skeleton className="h-4 w-64 mt-2" /></td>
      <td className="p-4"><Skeleton className="h-4 w-40" /></td>
      <td className="p-4"><Skeleton className="h-4 w-36" /></td>
      <td className="p-4"><Skeleton className="h-6 w-24" /></td>
      <td className="p-4 text-center"><Skeleton className="h-5 w-5 mx-auto" /></td>
    </tr>
  );
}

export function AgendaView() {
  const [appointments, setAppointments] = useState<AppointmentRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchAppointments() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await adminApi.getTodayAppointments({ limit: 50 });
        if (mounted) {
          // Validación defensiva: response.data debe ser un array
          const rawAppointments = Array.isArray(response?.data) ? response.data : 
                                 Array.isArray((response as unknown as Record<string, unknown>)?.appointments) ? (response as unknown as Record<string, unknown>).appointments as AdminAppointment[] : 
                                 Array.isArray(response) ? response as AdminAppointment[] : [];
          
          const mapped: AppointmentRow[] = rawAppointments.map((appt: AdminAppointment) => ({
            id: appt.id,
            time: appt.time,
            patientName: appt.patientName,
            patientLastName: appt.patientLastName,
            patientPhone: appt.patientPhone,
            treatment: appt.treatment?.name ?? 'Sin tratamiento',
            dentist: appt.dentist?.name ?? 'Sin odontólogo',
            status: (appt.status as AppointmentStatus) ?? 'PENDING',
          }));
          setAppointments(mapped);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Error al cargar las citas');
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    fetchAppointments();
    return () => { mounted = false; };
  }, []);

  if (isLoading) {
    return (
      <div className="border border-slate-200 rounded-xl bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full" role="table">
            <thead>
              <tr className="bg-slate-50 text-left text-sm font-semibold text-slate-600 border-b border-slate-200">
                <th className="p-4 w-20">Hora</th>
                <th className="p-4">Paciente</th>
                <th className="p-4">Tratamiento</th>
                <th className="p-4">Odontólogo</th>
                <th className="p-4 w-36">Estado</th>
                <th className="p-4 w-24 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[...Array(5)].map((_, i) => <AppointmentSkeleton key={i} />)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-slate-200 rounded-xl bg-white overflow-hidden p-8">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="border border-slate-200 rounded-xl bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full" role="table">
          <thead>
            <tr className="bg-slate-50 text-left text-sm font-semibold text-slate-600 border-b border-slate-200">
              <th className="p-4 w-20">Hora</th>
              <th className="p-4">Paciente</th>
              <th className="p-4">Tratamiento</th>
              <th className="p-4">Odontólogo</th>
              <th className="p-4 w-36">Estado</th>
              <th className="p-4 w-24 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500">
                  No hay citas programadas para hoy
                </td>
              </tr>
            ) : (
              appointments.map((appt) => (
                <tr key={appt.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 whitespace-nowrap">
                    <span className="font-mono text-sm font-medium text-slate-900">{appt.time}</span>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-slate-900">{appt.patientName} {appt.patientLastName}</p>
                    <p className="text-xs text-slate-500">{appt.patientPhone}</p>
                  </td>
                  <td className="p-4 text-sm text-slate-700">{appt.treatment}</td>
                  <td className="p-4 text-sm text-slate-700">{appt.dentist}</td>
                  <td className="p-4">
                    <StatusBadge status={appt.status} />
                  </td>
                  <td className="p-4 text-center">
                    <ActionMenu appointmentId={appt.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}