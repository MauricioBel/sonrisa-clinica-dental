import { useState } from 'react';
import { Search, X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Card } from '../../components/ui/Card.tsx';
import { SectionTitle } from '../../components/ui/SectionTitle.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { Badge } from '../../components/ui/Badge.tsx';
import { adminApi } from '../../lib/api-admin.ts';
import type { AdminAppointment, AdminAppointmentsResponse } from '../../types/admin.ts';

const STATUS_COLORS: Record<string, 'default' | 'success' | 'warning' | 'danger'> = {
  CONFIRMED: 'success',
  PENDING: 'warning',
  CANCELLED: 'danger',
  COMPLETED: 'default',
};

const STATUS_LABELS: Record<string, string> = {
  CONFIRMED: 'Confirmada',
  PENDING: 'Pendiente',
  CANCELLED: 'Cancelada',
  COMPLETED: 'Completada',
};

export function AdminAppointmentsPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [search, setSearch] = useState('');
  const [data, setData] = useState<AdminAppointmentsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingIds, setCancellingIds] = useState<Set<number>>(new Set());

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const result = await adminApi.getAppointments({
        page,
        limit,
        status: statusFilter || undefined,
        dateFrom: dateFrom || undefined,
        dateTo: dateTo || undefined,
      });
      setData(result);
    } catch (error) {
      console.error('Error cargando citas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async (appointment: AdminAppointment) => {
    if (!window.confirm(`¿Cancelar la cita de ${appointment.patientName} ${appointment.patientLastName} para el ${new Date(appointment.date).toLocaleDateString('es-CL')} a las ${appointment.time}?`)) {
      return;
    }
    setCancellingIds((prev) => new Set(prev).add(appointment.id));
    try {
      await adminApi.updateAppointmentStatus(appointment.id, { status: 'CANCELLED' });
      fetchAppointments();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error al cancelar la cita');
    } finally {
      setCancellingIds((prev) => {
        const next = new Set(prev);
        next.delete(appointment.id);
        return next;
      });
    }
  };

  const handleStatusChange = async (appointment: AdminAppointment, newStatus: AdminAppointment['status']) => {
    setCancellingIds((prev) => new Set(prev).add(appointment.id));
    try {
      await adminApi.updateAppointmentStatus(appointment.id, { status: newStatus });
      fetchAppointments();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error al cambiar estado');
    } finally {
      setCancellingIds((prev) => {
        const next = new Set(prev);
        next.delete(appointment.id);
        return next;
      });
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-CL', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <SectionTitle
        level="h1"
        title="Gestión de Citas"
        description="Visualiza, filtra y gestiona el estado de las citas agendadas"
      />

      <Card className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="text"
              placeholder="Buscar por paciente, email, teléfono..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchAppointments()}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
                fetchAppointments();
              }}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            >
              <option value="">Todos los estados</option>
              <option value="CONFIRMED">Confirmada</option>
              <option value="PENDING">Pendiente</option>
              <option value="CANCELLED">Cancelada</option>
              <option value="COMPLETED">Completada</option>
            </select>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => {
                setDateFrom(e.target.value);
                setPage(1);
                fetchAppointments();
              }}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => {
                setDateTo(e.target.value);
                setPage(1);
                fetchAppointments();
              }}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            />
          </div>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full" role="grid">
            <thead>
              <tr className="bg-slate-50 text-left text-sm font-semibold text-slate-600">
                <th className="p-4">Paciente</th>
                <th className="p-4">Contacto</th>
                <th className="p-4">Servicio</th>
                <th className="p-4">Médico</th>
                <th className="p-4">Fecha</th>
                <th className="p-4">Hora</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center">
                    <div className="flex items-center justify-center gap-2 text-slate-500">
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                      Cargando citas...
                    </div>
                  </td>
                </tr>
              ) : data?.data.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500">
                    No se encontraron citas con los filtros actuales
                  </td>
                </tr>
              ) : (
                data!.data.map((appt) => (
                  <tr key={appt.id} className="hover:bg-slate-50">
                    <td className="p-4">
                      <p className="font-medium text-brand-900">
                        {appt.patientName} {appt.patientLastName}
                      </p>
                    </td>
                    <td className="p-4 text-sm text-slate-600">
                      <p>{appt.patientEmail}</p>
                      <p>{appt.patientPhone}</p>
                    </td>
                    <td className="p-4 text-sm text-slate-700">{appt.treatment.name}</td>
                    <td className="p-4 text-sm text-slate-700">{appt.dentist.name}</td>
                    <td className="p-4 whitespace-nowrap text-sm text-slate-700">{formatDate(appt.date)}</td>
                    <td className="p-4 whitespace-nowrap text-sm text-slate-700">{appt.time}</td>
                    <td className="p-4">
                      <Badge variant={STATUS_COLORS[appt.status]}>
                        {STATUS_LABELS[appt.status]}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {appt.status !== 'CANCELLED' && appt.status !== 'COMPLETED' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancel(appt)}
                            loading={cancellingIds.has(appt.id)}
                            disabled={cancellingIds.has(appt.id)}
                            className="text-red-700 border-red-300 hover:bg-red-50"
                          >
                            <X className="h-4 w-4 mr-1" aria-hidden="true" />
                            Cancelar
                          </Button>
                        )}
                        <select
                          value={appt.status}
                          onChange={(e) => handleStatusChange(appt, e.target.value as AdminAppointment['status'])}
                          disabled={cancellingIds.has(appt.id)}
                          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                        >
                          <option value="PENDING">Pendiente</option>
                          <option value="CONFIRMED">Confirmada</option>
                          <option value="CANCELLED">Cancelada</option>
                          <option value="COMPLETED">Completada</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {data && data.pagination.totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-slate-200">
            <p className="text-sm text-slate-600">
              Mostrando {((page - 1) * limit) + 1} a {Math.min(page * limit, data.pagination.total)} de {data.pagination.total} citas
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </Button>
              <span className="text-sm text-slate-600">
                Página {page} de {data.pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(data!.pagination.totalPages, p + 1))}
                disabled={page === data.pagination.totalPages}
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}