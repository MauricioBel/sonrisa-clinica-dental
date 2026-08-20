import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CalendarOff, RotateCcw } from 'lucide-react';
import { Card } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { FormField, inputStyles } from '../../components/ui/FormField.tsx';
import { EmptyState, ErrorMessage, Spinner } from '../../components/ui/Feedback.tsx';
import { ConfirmAction } from '../../components/admin/ConfirmAction.tsx';
import { useAdminTimeBlocks } from '../../hooks/admin/useAdminTimeBlocks.ts';
import { useAdminDentists } from '../../hooks/admin/useAdminDentists.ts';
import { api, ApiError } from '../../lib/api.ts';
import { formatDateShort, todayISO } from '../../lib/format.ts';
import type { TimeBlockParams } from '../../types/index.ts';
import { Seo } from '../../components/Seo.tsx';

const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

const blockSchema = z
  .object({
    dentistId: z.coerce
      .number()
      .int('Profesional inválido')
      .positive('Profesional inválido'),
    date: z.string().min(1, 'La fecha es obligatoria'),
    startTime: z
      .string()
      .regex(timeRegex, 'La hora debe tener formato HH:mm'),
    endTime: z
      .string()
      .regex(timeRegex, 'La hora debe tener formato HH:mm'),
    reason: z
      .string()
      .trim()
      .max(200, 'El motivo no puede superar 200 caracteres')
      .optional(),
  })
  .refine((input) => input.endTime > input.startTime, {
    message: 'El fin del bloqueo debe ser posterior al inicio',
    path: ['endTime'],
  });

type BlockInput = z.input<typeof blockSchema>;
type BlockFormValues = z.output<typeof blockSchema>;

export function AdminTimeBlocksPage() {
  const dentists = useAdminDentists();

  const [filters, setFilters] = useState<{ date: string; dentistId: string }>({
    date: todayISO(),
    dentistId: '',
  });
  const params = useMemo<TimeBlockParams>(
    () => ({
      ...(filters.date ? { date: filters.date } : {}),
      ...(filters.dentistId ? { dentistId: Number(filters.dentistId) } : {}),
    }),
    [filters],
  );

  const blocks = useAdminTimeBlocks(params);
  const [pendingDelete, setPendingDelete] = useState<number | null>(null);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  const form = useForm<BlockInput, unknown, BlockFormValues>({
    resolver: zodResolver(blockSchema),
    defaultValues: {
      dentistId: '',
      date: todayISO(),
      startTime: '09:00',
      endTime: '10:00',
      reason: '',
    },
  });
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const onSubmit = async (data: BlockFormValues) => {
    if (creating) return;
    setCreating(true);
    setCreateError(null);
    try {
      await api.createTimeBlock({
        dentistId: data.dentistId,
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
        reason: data.reason?.trim() || null,
      });
      form.reset({
        dentistId: '',
        date: data.date,
        startTime: '09:00',
        endTime: '10:00',
        reason: '',
      });
      setFeedbackError(null);
      blocks.reload();
    } catch (e) {
      setCreateError(
        e instanceof ApiError
          ? e.message
          : 'No fue posible crear el bloqueo. Inténtalo de nuevo.',
      );
    } finally {
      setCreating(false);
    }
  };

  const deleteBlock = async (id: number) => {
    setPendingDelete(id);
    try {
      await api.deleteTimeBlock(id);
      setFeedbackError(null);
      blocks.reload();
    } catch (e) {
      setFeedbackError(
        e instanceof ApiError
          ? e.message
          : 'No fue posible eliminar el bloqueo.',
      );
    } finally {
      setPendingDelete(null);
    }
  };

  return (
    <>
      <Seo
        title="Bloqueos de agenda"
        description="Bloqueos de agenda del panel administrativo."
        path="/admin/bloqueos"
        noIndex
      />
      <div className="mb-6">
        <h1 className="flex items-center gap-2 font-display text-2xl font-bold text-brand-950">
          <CalendarOff className="h-6 w-6 text-brand-600" aria-hidden="true" />
          Bloqueos de agenda
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Reserva franjas horarias en las que un profesional no atenderá
          (vacaciones, capacitación, etc.).
        </p>
      </div>

      {feedbackError && (
        <div className="mb-4">
          <ErrorMessage message={feedbackError} />
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <Card className="h-fit p-5">
          <h2 className="font-display text-base font-bold text-brand-950">
            Nuevo bloqueo
          </h2>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="mt-4 space-y-4"
          >
            {createError && <ErrorMessage message={createError} />}

            <FormField
              id="block-dentist"
              label="Profesional"
              error={form.formState.errors.dentistId?.message}
            >
              <select
                id="block-dentist"
                className={inputStyles}
                {...form.register('dentistId')}
              >
                <option value="">Selecciona un profesional</option>
                {dentists.data?.map((dentist) => (
                  <option key={dentist.id} value={dentist.id}>
                    {dentist.name}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField
              id="block-date"
              label="Fecha"
              error={form.formState.errors.date?.message}
            >
              <input
                id="block-date"
                type="date"
                className={inputStyles}
                min={todayISO()}
                {...form.register('date')}
              />
            </FormField>

            <div className="grid grid-cols-2 gap-3">
              <FormField
                id="block-start"
                label="Inicio"
                error={form.formState.errors.startTime?.message}
              >
                <input
                  id="block-start"
                  type="time"
                  className={inputStyles}
                  {...form.register('startTime')}
                />
              </FormField>
              <FormField
                id="block-end"
                label="Fin"
                error={form.formState.errors.endTime?.message}
              >
                <input
                  id="block-end"
                  type="time"
                  className={inputStyles}
                  {...form.register('endTime')}
                />
              </FormField>
            </div>

            <FormField
              id="block-reason"
              label="Motivo"
              optional
              error={form.formState.errors.reason?.message}
            >
              <input
                id="block-reason"
                type="text"
                className={inputStyles}
                placeholder="Ej: Capacitación"
                {...form.register('reason')}
              />
            </FormField>

            <Button type="submit" className="w-full" loading={creating}>
              {creating ? 'Creando...' : 'Crear bloqueo'}
            </Button>
          </form>
        </Card>

        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <FormField id="block-filter-date" label="Desde" className="w-auto">
              <input
                id="block-filter-date"
                type="date"
                className={inputStyles}
                value={filters.date}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, date: e.target.value }))
                }
              />
            </FormField>
            <FormField id="block-filter-dentist" label="Profesional" className="w-auto">
              <select
                id="block-filter-dentist"
                className={`${inputStyles} min-w-48`}
                value={filters.dentistId}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, dentistId: e.target.value }))
                }
              >
                <option value="">Todos</option>
                {dentists.data?.map((dentist) => (
                  <option key={dentist.id} value={dentist.id}>
                    {dentist.name}
                  </option>
                ))}
              </select>
            </FormField>
            <Button
              type="button"
              variant="ghost"
              aria-label="Limpiar filtros"
              onClick={() => setFilters({ date: '', dentistId: '' })}
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Limpiar
            </Button>
          </div>

          {blocks.loading && <Spinner label="Cargando bloqueos..." />}
          {blocks.error && <ErrorMessage message={blocks.error} />}

          {!blocks.loading && !blocks.error && blocks.data && (
            <>
              {blocks.data.length === 0 ? (
                <Card>
                  <EmptyState message="No hay bloqueos para los filtros seleccionados." />
                </Card>
              ) : (
                <Card className="overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[560px] text-left text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                          <th scope="col" className="px-5 py-3 font-semibold">
                            Profesional
                          </th>
                          <th scope="col" className="px-5 py-3 font-semibold">
                            Fecha
                          </th>
                          <th scope="col" className="px-5 py-3 font-semibold">
                            Horario
                          </th>
                          <th scope="col" className="px-5 py-3 font-semibold">
                            Motivo
                          </th>
                          <th scope="col" className="px-5 py-3 font-semibold">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {blocks.data.map((block) => (
                          <tr key={block.id} className="transition-colors hover:bg-slate-50/70">
                            <td className="px-5 py-3.5">
                              <p className="font-semibold text-brand-950">
                                {block.dentist.name}
                              </p>
                              <p className="text-xs text-slate-500">
                                {block.dentist.specialty}
                              </p>
                            </td>
                            <td className="whitespace-nowrap px-5 py-3.5 text-slate-700">
                              {formatDateShort(block.date)}
                            </td>
                            <td className="whitespace-nowrap px-5 py-3.5 text-slate-700">
                              {block.startTime} hrs - {block.endTime} hrs
                            </td>
                            <td className="px-5 py-3.5 text-slate-600">
                              {block.reason ?? 'Sin motivo'}
                            </td>
                            <td className="whitespace-nowrap px-5 py-3.5">
                              <ConfirmAction
                                confirmLabel="Eliminar"
                                message={`¿Eliminar el bloqueo del ${formatDateShort(block.date)}? Los horarios volverán a estar disponibles.`}
                                pending={pendingDelete === block.id}
                                pendingLabel="Eliminando..."
                                onConfirm={() => deleteBlock(block.id)}
                              />
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
        </div>
      </div>
    </>
  );
}