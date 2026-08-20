import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Card } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { EmptyState, ErrorMessage, Spinner } from '../../components/ui/Feedback.tsx';
import { ActiveBadge } from '../../components/admin/StatusBadge.tsx';
import { ConfirmAction } from '../../components/admin/ConfirmAction.tsx';
import { useAdminTreatments } from '../../hooks/admin/useAdminTreatments.ts';
import { api, ApiError } from '../../lib/api.ts';
import { formatCLP } from '../../lib/format.ts';
import type { AdminTreatment } from '../../types/index.ts';
import { Seo } from '../../components/Seo.tsx';

export function AdminTreatmentsPage() {
  const { data, loading, error, reload } = useAdminTreatments();
  const [pendingToggle, setPendingToggle] = useState<number | null>(null);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  const toggleActive = async (treatment: AdminTreatment) => {
    setPendingToggle(treatment.id);
    try {
      await api.setTreatmentActive(treatment.id, !treatment.isActive);
      setFeedbackError(null);
      reload();
    } catch (e) {
      setFeedbackError(
        e instanceof ApiError
          ? e.message
          : 'No fue posible actualizar el tratamiento.',
      );
    } finally {
      setPendingToggle(null);
    }
  };

  return (
    <>
      <Seo
        title="Gestión de tratamientos"
        description="Gestión de tratamientos del panel administrativo."
        path="/admin/tratamientos"
        noIndex
      />
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-950">Tratamientos</h1>
          <p className="mt-1 text-sm text-slate-600">
            Crea y edita la carta de tratamientos del sitio público.
          </p>
        </div>
        <Button to="/admin/tratamientos/nuevo">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Nuevo tratamiento
        </Button>
      </div>

      {feedbackError && (
        <div className="mb-4">
          <ErrorMessage message={feedbackError} />
        </div>
      )}

      {loading && <Spinner label="Cargando tratamientos..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && data && (
        <>
          {data.length === 0 ? (
            <Card>
              <EmptyState message="Aún no hay tratamientos registrados." />
            </Card>
          ) : (
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Tratamiento
                      </th>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Duración
                      </th>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Precio
                      </th>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Beneficios
                      </th>
                      <th scope="col" className="px-5 py-3 font-semibold">
                        Citas
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
                    {data.map((treatment) => (
                      <tr key={treatment.id} className="transition-colors hover:bg-slate-50/70">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <img
                              src={treatment.imageUrl}
                              alt=""
                              aria-hidden="true"
                              loading="lazy"
                              className="h-10 w-10 shrink-0 rounded-xl object-cover"
                            />
                            <div className="min-w-0">
                              <p className="font-semibold text-brand-950">
                                {treatment.name}
                              </p>
                              <p className="text-xs text-slate-500">
                                /{treatment.slug}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-5 py-3.5 text-slate-700">
                          {treatment.durationMinutes} min
                        </td>
                        <td className="whitespace-nowrap px-5 py-3.5 font-medium text-brand-800">
                          {formatCLP(treatment.price)}
                        </td>
                        <td className="px-5 py-3.5 text-slate-700">
                          {treatment.benefits.length}
                        </td>
                        <td className="px-5 py-3.5 text-slate-700">
                          {treatment._count.appointments}
                        </td>
                        <td className="px-5 py-3.5">
                          <ActiveBadge active={treatment.isActive} />
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex flex-wrap items-center gap-1">
                            <Button
                              to={`/admin/tratamientos/${treatment.id}/editar`}
                              size="sm"
                              variant="ghost"
                            >
                              Editar
                            </Button>
                            {treatment.isActive ? (
                              <ConfirmAction
                                confirmLabel="Desactivar"
                                message={`¿Desactivar "${treatment.name}"? Dejará de mostrarse y reservarse en el sitio público.`}
                                pending={pendingToggle === treatment.id}
                                pendingLabel="Procesando..."
                                onConfirm={() => toggleActive(treatment)}
                              />
                            ) : (
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                disabled={pendingToggle === treatment.id}
                                onClick={() => void toggleActive(treatment)}
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