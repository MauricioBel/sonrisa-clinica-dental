import { CalendarCheck, XCircle, CheckCircle, Clock } from 'lucide-react';
import { Card } from '../../components/ui/Card.tsx';
import { SectionTitle } from '../../components/ui/SectionTitle.tsx';
import { adminApi } from '../../lib/api-admin.ts';
import { useQuery } from '@tanstack/react-query';
import { useAdminAuth } from '../../context/AdminAuthContext.tsx';

export function DashboardPage() {
  const { user } = useAdminAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['adminAppointments', user?.clinicaId],
    queryFn: () => adminApi.getAppointments({ limit: 5, status: 'CONFIRMED' }),
    enabled: !!user?.clinicaId,
  });

  const upcomingAppointments = data?.data ?? [];
  const totalAppointments = data?.pagination?.total ?? 0;

  return (
    <div className="space-y-6">
      <SectionTitle
        level="h1"
        title="Dashboard"
        description={`Bienvenido, ${user?.nombre}. Resumen de la clínica ${user?.clinicaNombre}`}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Citas Totales</p>
              <p className="font-display text-3xl font-bold text-brand-900">{totalAppointments}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-brand-100 flex items-center justify-center text-brand-700">
              <CalendarCheck className="h-6 w-6" aria-hidden="true" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Confirmadas</p>
              <p className="font-display text-3xl font-bold text-green-700">
                {data?.data?.filter((a) => a.status === 'CONFIRMED').length ?? 0}
              </p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center text-green-700">
              <CheckCircle className="h-6 w-6" aria-hidden="true" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Pendientes</p>
              <p className="font-display text-3xl font-bold text-amber-700">
                {data?.data?.filter((a) => a.status === 'PENDING').length ?? 0}
              </p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
              <Clock className="h-6 w-6" aria-hidden="true" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Canceladas</p>
              <p className="font-display text-3xl font-bold text-red-700">
                {data?.data?.filter((a) => a.status === 'CANCELLED').length ?? 0}
              </p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-red-100 flex items-center justify-center text-red-700">
              <XCircle className="h-6 w-6" aria-hidden="true" />
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-6 border-b border-slate-200">
          <h3 className="font-display text-lg font-semibold text-brand-900">Próximas Citas Confirmadas</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-left text-sm font-semibold text-slate-600">
                <th className="p-4">Paciente</th>
                <th className="p-4">Servicio</th>
                <th className="p-4">Médico</th>
                <th className="p-4">Fecha</th>
                <th className="p-4">Hora</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    Cargando...
                  </td>
                </tr>
              ) : upcomingAppointments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    No hay citas confirmadas próximas
                  </td>
                </tr>
              ) : (
                upcomingAppointments.map((appt) => (
                  <tr key={appt.id} className="hover:bg-slate-50">
                    <td className="p-4">
                      <p className="font-medium text-brand-900">
                        {appt.patientName} {appt.patientLastName}
                      </p>
                      <p className="text-xs text-slate-500">{appt.patientPhone}</p>
                    </td>
                    <td className="p-4 text-sm text-slate-700">{appt.treatment.name}</td>
                    <td className="p-4 text-sm text-slate-700">{appt.dentist.name}</td>
                    <td className="p-4 text-sm text-slate-700">
                      {new Date(appt.date).toLocaleDateString('es-CL', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                      })}
                    </td>
                    <td className="p-4 text-sm text-slate-700">{appt.time}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-200 text-right">
          <a href="/admin/citas" className="text-sm font-medium text-brand-700 hover:text-brand-800">
            Ver todas las citas →
          </a>
        </div>
      </Card>
    </div>
  );
}