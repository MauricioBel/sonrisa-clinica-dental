import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Card } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { EmptyState, ErrorMessage, Spinner } from '../../components/ui/Feedback.tsx';
import { ActiveBadge } from '../../components/admin/StatusBadge.tsx';
import { ConfirmAction } from '../../components/admin/ConfirmAction.tsx';
import { useAdminDentists } from '../../hooks/admin/useAdminDentists.ts';
import { api, ApiError } from '../../lib/api.ts';
import type { Dentist } from '../../types/index.ts';
import { Seo } from '../../components/Seo.tsx';

export function AdminDentistsPage() {
  const { data, loading, error, reload } = useAdminDentists();
  const [pendingToggle, setPendingToggle] = useState<number | null>(null);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  const toggleActive = async (dentist: Dentist) => {
    setPendingToggle(dentist.id);
    try {
      await api.setDentistActive(dentist.id, !dentist.isActive);
      setFeedbackError(null);
      reload();
    } catch (e) {
      setFeedbackError(
        e instanceof ApiError
          ? e.message
          : 'No fue posible actualizar el profesional.',
      );
    } finally {
      setPendingToggle(null);
    }
  };

  return (
    <>
      <Seo
        title="Gestión de dentistas"
        description="Gestión de dentistas del panel administrativo."
        path="/admin/dentistas"
        noIndex
      />
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-950">Dentistas</h1>
          <p className="mt-1 text-sm text-slate-600">
            Administra el equipo profesional. La desactivación no borra el historial.
          </p>
        </div>
        <Button to="/admin/dentistas/nuevo">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Nuevo dentista
        </Button>
      </div>

      {feedbackError && (
        <div className="mb-4">
          <ErrorMessage message={feedbackError} />
        </div>
      )}

      {loading && <Spinner label="Cargando dentistas..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && data && (
        <>
          {data.length === 0 ? (
            <Card>
              <EmptyState message="Aún no hay dentistas registrados." />
            </Card>
          ) : (
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Profesional
                      </th>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Especialidad
                      </th>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Años de experiencia
                      </th>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Estado
                      </th>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.map((dentist) => (
                      <tr key={dentist.id} className="transition-colors hover:bg-slate-50/70">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <img
                              src={dentist.imageUrl}
                              alt=""
                              aria-hidden="true"
                              loading="lazy"
                              className="h-10 w-10 shrink-0 rounded-full object-cover"
                            />
                            <div className="min-w-0">
                              <p className="font-semibold text-brand-950">{dentist.name}</p>
                              <p className="text-xs text-slate-500">{dentist.role}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-slate-700">
                          {dentist.specialty}
                        </td>
                        <td className="px-5 py-3.5 text-slate-700">
                          {dentist.experienceYears} años
                        </td>
                        <td className="px-5 py-3.5">
                          <ActiveBadge active={dentist.isActive} />
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex flex-wrap items-center gap-1">
                            <Button
                              to={`/admin/dentistas/${dentist.id}/editar`}
                              size="sm"
                              variant="ghost"
                            >
                              Editar
                            </Button>
                            {dentist.isActive ? (
                              <ConfirmAction
                                confirmLabel="Desactivar"
                                message={`¿Desactivar a ${dentist.name}? Se conservará su historial de citas.`}
                                pending={pendingToggle === dentist.id}
                                pendingLabel="Procesando..."
                                onConfirm={() => toggleActive(dentist)}
                              />
                            ) : (
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                disabled={pendingToggle === dentist.id}
                                onClick={() => void toggleActive(dentist)}
                              >
                                Activar
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </>
      )}
    </>
  );
}