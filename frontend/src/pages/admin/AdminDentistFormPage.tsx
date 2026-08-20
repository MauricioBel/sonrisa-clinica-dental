import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import { Card } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { FormField, inputStyles } from '../../components/ui/FormField.tsx';
import { ErrorMessage, Spinner } from '../../components/ui/Feedback.tsx';
import { api, ApiError } from '../../lib/api.ts';
import type { Dentist } from '../../types/index.ts';
import { Seo } from '../../components/Seo.tsx';

const dentistSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(80, 'El nombre no puede superar 80 caracteres'),
  role: z
    .string()
    .trim()
    .min(2, 'El cargo debe tener al menos 2 caracteres')
    .max(80, 'El cargo no puede superar 80 caracteres'),
  specialty: z
    .string()
    .trim()
    .min(2, 'La especialidad debe tener al menos 2 caracteres')
    .max(80, 'La especialidad no puede superar 80 caracteres'),
  description: z
    .string()
    .trim()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(2000, 'La descripción no puede superar 2000 caracteres'),
  experienceYears: z
    .number()
    .int('Los años de experiencia deben ser un número entero')
    .min(0, 'Los años de experiencia no pueden ser negativos')
    .max(80, 'Los años de experiencia no pueden superar 80'),
  imageUrl: z
    .string()
    .trim()
    .min(1, 'La imagen es obligatoria')
    .max(300, 'La URL de imagen no puede superar 300 caracteres'),
  isActive: z.boolean().optional(),
});

type DentistFormValues = z.infer<typeof dentistSchema>;

const createInitial: DentistFormValues = {
  name: '',
  role: '',
  specialty: '',
  description: '',
  experienceYears: 5,
  imageUrl: '',
  isActive: true,
};

export function AdminDentistFormPage() {
  const { id } = useParams();
  const dentistId = Number(id);
  const editing = Number.isInteger(dentistId) && dentistId > 0;

  const [detail, setDetail] = useState<{
    data: Dentist | null;
    loading: boolean;
    error: string | null;
  }>({ data: null, loading: editing, error: null });

  const load = useCallback(() => {
    if (!editing) return;
    setDetail((s) => ({ ...s, loading: true, error: null }));
    api
      .getAdminDentist(dentistId)
      .then((data) => setDetail({ data, loading: false, error: null }))
      .catch((e: unknown) =>
        setDetail({
          data: null,
          loading: false,
          error:
            e instanceof ApiError
              ? e.message
              : 'No fue posible cargar el profesional.',
        }),
      );
  }, [editing, dentistId]);

  useEffect(() => {
    load();
  }, [load]);

  if (detail.loading) return <Spinner label="Cargando profesional..." />;
  if (detail.error) {
    return (
      <div className="space-y-4">
        <ErrorMessage message={detail.error} />
        <Button onClick={() => void load()}>Reintentar</Button>
      </div>
    );
  }

  const initialValues = detail.data
    ? {
        name: detail.data.name,
        role: detail.data.role,
        specialty: detail.data.specialty,
        description: detail.data.description,
        experienceYears: detail.data.experienceYears,
        imageUrl: detail.data.imageUrl,
      }
    : createInitial;

  return (
    <DentistForm
      key={editing ? `edit-${dentistId}` : 'create'}
      dentistId={editing ? dentistId : undefined}
      initialValues={initialValues}
    />
  );
}

function DentistForm({
  dentistId,
  initialValues,
}: {
  dentistId?: number;
  initialValues: DentistFormValues;
}) {
  const navigate = useNavigate();
  const editing = dentistId !== undefined;
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<DentistFormValues>({
    resolver: zodResolver(dentistSchema),
    defaultValues: initialValues,
  });

  const { errors } = form.formState;

  const onSubmit = async (data: DentistFormValues) => {
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      if (editing) {
        await api.updateDentist(dentistId, {
          name: data.name,
          role: data.role,
          specialty: data.specialty,
          description: data.description,
          experienceYears: data.experienceYears,
          imageUrl: data.imageUrl,
        });
      } else {
        await api.createDentist({
          name: data.name,
          role: data.role,
          specialty: data.specialty,
          description: data.description,
          experienceYears: data.experienceYears,
          imageUrl: data.imageUrl,
          ...(data.isActive === false ? { isActive: data.isActive } : {}),
        });
      }
      navigate('/admin/dentistas');
    } catch (e) {
      setSubmitError(
        e instanceof ApiError
          ? e.message
          : 'No fue posible guardar el profesional. Inténtalo de nuevo.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Seo
        title={editing ? 'Editar dentista' : 'Nuevo dentista'}
        description="Formulario de dentistas del panel administrativo."
        path={editing ? `/admin/dentistas/${dentistId}/editar` : '/admin/dentistas/nuevo'}
        noIndex
      />
      <Link
        to="/admin/dentistas"
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-brand-800"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Volver a dentistas
      </Link>

      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-brand-950">
          {editing ? 'Editar dentista' : 'Nuevo dentista'}
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          {editing
            ? 'Actualiza la información del profesional.'
            : 'Registra un nuevo profesional del equipo.'}
        </p>
      </div>

      <Card className="max-w-2xl p-6">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          className="space-y-4"
        >
          {submitError && <ErrorMessage message={submitError} />}

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField id="dentist-name" label="Nombre" error={errors.name?.message}>
              <input
                id="dentist-name"
                type="text"
                className={inputStyles}
                placeholder="Ej: Dra. María González"
                {...form.register('name')}
              />
            </FormField>
            <FormField id="dentist-role" label="Cargo" error={errors.role?.message}>
              <input
                id="dentist-role"
                type="text"
                className={inputStyles}
                placeholder="Ej: Odontóloga general"
                {...form.register('role')}
              />
            </FormField>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              id="dentist-specialty"
              label="Especialidad"
              error={errors.specialty?.message}
            >
              <input
                id="dentist-specialty"
                type="text"
                className={inputStyles}
                placeholder="Ej: Ortodoncia"
                {...form.register('specialty')}
              />
            </FormField>
            <FormField
              id="dentist-experience"
              label="Años de experiencia"
              error={errors.experienceYears?.message}
            >
              <input
                id="dentist-experience"
                type="number"
                min={0}
                max={80}
                className={inputStyles}
                {...form.register('experienceYears', { valueAsNumber: true })}
              />
            </FormField>
          </div>

          <FormField
            id="dentist-image"
            label="URL de imagen"
            error={errors.imageUrl?.message}
            hint="URL pública de una foto del profesional."
          >
            <input
              id="dentist-image"
              type="url"
              className={inputStyles}
              placeholder="https://..."
              {...form.register('imageUrl')}
            />
          </FormField>

          <FormField
            id="dentist-description"
            label="Descripción"
            error={errors.description?.message}
          >
            <textarea
              id="dentist-description"
              rows={5}
              className={`${inputStyles} resize-y`}
              placeholder="Breve presentación del profesional y sus áreas de dedicación."
              {...form.register('description')}
            />
          </FormField>

          {!editing && (
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-brand-600"
                {...form.register('isActive')}
              />
              Activo desde el primer momento
            </label>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate('/admin/dentistas')}
              disabled={submitting}
            >
              Cancelar
            </Button>
            <Button type="submit" loading={submitting}>
              {submitting ? 'Guardando...' : 'Guardar dentista'}
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
}