import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Plus, Wand2, X } from 'lucide-react';
import { Card } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { FormField, inputStyles } from '../../components/ui/FormField.tsx';
import { ErrorMessage, Spinner } from '../../components/ui/Feedback.tsx';
import { api, ApiError } from '../../lib/api.ts';
import type { AdminTreatment } from '../../types/index.ts';
import { Seo } from '../../components/Seo.tsx';

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const treatmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(120, 'El nombre no puede superar 120 caracteres'),
  slug: z
    .string()
    .trim()
    .min(2, 'El slug debe tener al menos 2 caracteres')
    .max(120, 'El slug no puede superar 120 caracteres')
    .regex(
      slugRegex,
      'El slug solo puede contener minúsculas, números y guiones medios',
    ),
  shortDescription: z
    .string()
    .trim()
    .min(5, 'La descripción corta debe tener al menos 5 caracteres')
    .max(300, 'La descripción corta no puede superar 300 caracteres'),
  description: z
    .string()
    .trim()
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(5000, 'La descripción no puede superar 5000 caracteres'),
  benefits: z
    .array(z.string().trim().min(1, 'El beneficio no puede quedar vacío').max(300))
    .min(1, 'Debe indicar al menos un beneficio')
    .max(20, 'No puede indicar más de 20 beneficios'),
  durationMinutes: z
    .number()
    .int('La duración debe ser un número entero')
    .min(5, 'La duración debe ser de al menos 5 minutos')
    .max(600, 'La duración no puede superar 600 minutos'),
  price: z
    .number()
    .int('El precio debe ser un número entero')
    .min(0, 'El precio no puede ser negativo'),
  imageUrl: z
    .string()
    .trim()
    .min(1, 'La imagen es obligatoria')
    .max(300, 'La URL de imagen no puede superar 300 caracteres'),
  isFeatured: z.boolean().optional(),
  sortOrder: z
    .number()
    .int('El orden debe ser un número entero')
    .min(0, 'El orden no puede ser negativo')
    .optional(),
  isActive: z.boolean().optional(),
});

type TreatmentFormValues = z.infer<typeof treatmentSchema>;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const createInitial: TreatmentFormValues = {
  name: '',
  slug: '',
  shortDescription: '',
  description: '',
  benefits: [''],
  durationMinutes: 30,
  price: 0,
  imageUrl: '',
  isFeatured: false,
  sortOrder: 0,
  isActive: true,
};

export function AdminTreatmentFormPage() {
  const { id } = useParams();
  const treatmentId = Number(id);
  const editing = Number.isInteger(treatmentId) && treatmentId > 0;

  const [detail, setDetail] = useState<{
    data: AdminTreatment | null;
    loading: boolean;
    error: string | null;
  }>({ data: null, loading: editing, error: null });

  const load = useCallback(() => {
    if (!editing) return;
    setDetail((s) => ({ ...s, loading: true, error: null }));
    api
      .getAdminTreatment(treatmentId)
      .then((data) => setDetail({ data, loading: false, error: null }))
      .catch((e: unknown) =>
        setDetail({
          data: null,
          loading: false,
          error:
            e instanceof ApiError
              ? e.message
              : 'No fue posible cargar el tratamiento.',
        }),
      );
  }, [editing, treatmentId]);

  useEffect(() => {
    load();
  }, [load]);

  if (detail.loading) return <Spinner label="Cargando tratamiento..." />;
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
        slug: detail.data.slug,
        shortDescription: detail.data.shortDescription,
        description: detail.data.description,
        benefits: detail.data.benefits,
        durationMinutes: detail.data.durationMinutes,
        price: detail.data.price,
        imageUrl: detail.data.imageUrl,
        isFeatured: detail.data.isFeatured,
        sortOrder: detail.data.sortOrder,
      }
    : createInitial;

  return (
    <TreatmentForm
      key={editing ? `edit-${treatmentId}` : 'create'}
      treatmentId={editing ? treatmentId : undefined}
      initialValues={initialValues}
    />
  );
}

function TreatmentForm({
  treatmentId,
  initialValues,
}: {
  treatmentId?: number;
  initialValues: TreatmentFormValues;
}) {
  const navigate = useNavigate();
  const editing = treatmentId !== undefined;
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<TreatmentFormValues>({
    resolver: zodResolver(treatmentSchema),
    defaultValues: initialValues,
  });
  const { errors } = form.formState;
  const benefits = useWatch({
    control: form.control,
    name: 'benefits',
    defaultValue: initialValues.benefits,
  });

  const addBenefit = () => {
    const current = form.getValues('benefits') ?? [];
    form.setValue('benefits', [...current, ''], { shouldValidate: true });
  };

  const removeBenefit = (index: number) => {
    const current = form.getValues('benefits') ?? [];
    form.setValue(
      'benefits',
      current.filter((_, i) => i !== index),
      { shouldValidate: true },
    );
  };

  const benefitsErrors = errors.benefits;
  const createRootBenefitError =
    (benefitsErrors as { root?: unknown } | undefined) !== undefined &&
    !Array.isArray(benefitsErrors)
      ? (benefitsErrors as {
          root?: { message?: string };
          message?: string;
        }).root?.message ??
        (benefitsErrors as { message?: string }).message
      : undefined;

  const generateSlug = () => {
    const name = form.getValues('name').trim();
    const generated = slugify(name);
    if (generated) form.setValue('slug', generated, { shouldValidate: true });
  };

  const onSubmit = async (data: TreatmentFormValues) => {
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const base = {
        name: data.name,
        slug: data.slug,
        shortDescription: data.shortDescription,
        description: data.description,
        benefits: data.benefits,
        durationMinutes: data.durationMinutes,
        price: data.price,
        imageUrl: data.imageUrl,
        isFeatured: data.isFeatured ?? false,
        sortOrder: data.sortOrder ?? 0,
      };
      if (editing) {
        await api.updateTreatment(treatmentId, base);
      } else {
        await api.createTreatment({
          ...base,
          ...(data.isActive === false ? { isActive: false } : {}),
        });
      }
      navigate('/admin/tratamientos');
    } catch (e) {
      setSubmitError(
        e instanceof ApiError
          ? e.message
          : 'No fue posible guardar el tratamiento. Inténtalo de nuevo.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Seo
        title={editing ? 'Editar tratamiento' : 'Nuevo tratamiento'}
        description="Formulario de tratamientos del panel administrativo."
        path={
          editing
            ? `/admin/tratamientos/${treatmentId}/editar`
            : '/admin/tratamientos/nuevo'
        }
        noIndex
      />
      <Link
        to="/admin/tratamientos"
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-brand-800"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Volver a tratamientos
      </Link>

      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-brand-950">
          {editing ? 'Editar tratamiento' : 'Nuevo tratamiento'}
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          {editing
            ? 'Actualiza la información del tratamiento.'
            : 'Registra un nuevo tratamiento para la carta clínica.'}
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
            <FormField id="treatment-name" label="Nombre" error={errors.name?.message}>
              <input
                id="treatment-name"
                type="text"
                className={inputStyles}
                placeholder="Ej: Limpieza dental"
                {...form.register('name')}
              />
            </FormField>
            <FormField
              id="treatment-price"
              label="Precio (CLP)"
              error={errors.price?.message}
            >
              <input
                id="treatment-price"
                type="number"
                min={0}
                className={inputStyles}
                {...form.register('price', { valueAsNumber: true })}
              />
            </FormField>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              id="treatment-slug"
              label="Slug"
              error={errors.slug?.message}
              hint="Identificador único de la URL pública. Solo minúsculas y guiones."
            >
              <input
                id="treatment-slug"
                type="text"
                className={inputStyles}
                placeholder="limpieza-dental"
                {...form.register('slug')}
              />
            </FormField>
            <div className="flex items-end">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={generateSlug}
              >
                <Wand2 className="h-4 w-4" aria-hidden="true" />
                Generar desde el nombre
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              id="treatment-duration"
              label="Duración (minutos)"
              error={errors.durationMinutes?.message}
            >
              <input
                id="treatment-duration"
                type="number"
                min={5}
                max={600}
                className={inputStyles}
                {...form.register('durationMinutes', { valueAsNumber: true })}
              />
            </FormField>
            <FormField
              id="treatment-sort"
              label="Orden"
              error={errors.sortOrder?.message}
              hint="Menor número se muestra primero."
            >
              <input
                id="treatment-sort"
                type="number"
                min={0}
                className={inputStyles}
                {...form.register('sortOrder', { valueAsNumber: true })}
              />
            </FormField>
          </div>

          <FormField
            id="treatment-image"
            label="URL de imagen"
            error={errors.imageUrl?.message}
          >
            <input
              id="treatment-image"
              type="url"
              className={inputStyles}
              placeholder="https://..."
              {...form.register('imageUrl')}
            />
          </FormField>

          <FormField
            id="treatment-short"
            label="Descripción corta"
            error={errors.shortDescription?.message}
          >
            <input
              id="treatment-short"
              type="text"
              className={inputStyles}
              placeholder="Resumen breve para tarjetas y listados."
              {...form.register('shortDescription')}
            />
          </FormField>

          <FormField
            id="treatment-description"
            label="Descripción completa"
            error={errors.description?.message}
          >
            <textarea
              id="treatment-description"
              rows={6}
              className={`${inputStyles} resize-y`}
              placeholder="Detalle del tratamiento para la ficha pública."
              {...form.register('description')}
            />
          </FormField>

          <fieldset>
            <legend className="mb-1.5 block text-sm font-medium text-slate-700">
              Beneficios
            </legend>
            <div className="space-y-2">
              {benefits.map((_, index) => {
                const indexError = Array.isArray(benefitsErrors)
                  ? (benefitsErrors[index] as { message?: string } | undefined)
                      ?.message
                  : undefined;
                return (
                  <div key={index} className="flex items-start gap-2">
                    <div className="flex-1">
                      <input
                        type="text"
                        className={inputStyles}
                        placeholder={`Beneficio ${index + 1}`}
                        aria-label={`Beneficio ${index + 1}`}
                        aria-invalid={indexError ? true : undefined}
                        {...form.register(`benefits.${index}`)}
                      />
                      {indexError && (
                        <p role="alert" className="mt-1 text-xs text-red-600">
                          {indexError}
                        </p>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="shrink-0 px-2"
                      aria-label={`Quitar beneficio ${index + 1}`}
                      onClick={() => removeBenefit(index)}
                      disabled={benefits.length <= 1}
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                );
              })}
            </div>
            {createRootBenefitError && (
              <p role="alert" className="mt-1 text-xs text-red-600">
                {createRootBenefitError}
              </p>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={addBenefit}
              disabled={benefits.length >= 20}
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Agregar beneficio
            </Button>
          </fieldset>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-brand-600"
                {...form.register('isFeatured')}
              />
              Destacado en el sitio
            </label>
            {!editing && (
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-brand-600"
                  {...form.register('isActive')}
                />
                Activo y reservable desde el inicio
              </label>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate('/admin/tratamientos')}
              disabled={submitting}
            >
              Cancelar
            </Button>
            <Button type="submit" loading={submitting}>
              {submitting ? 'Guardando...' : 'Guardar tratamiento'}
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
}