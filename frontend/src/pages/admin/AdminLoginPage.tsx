import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LogIn, ShieldCheck } from 'lucide-react';
import { Seo } from '../../components/Seo.tsx';
import { Card } from '../../components/ui/Card.tsx';
import { Button } from '../../components/ui/Button.tsx';
import { ErrorMessage } from '../../components/ui/Feedback.tsx';
import { FormField, inputStyles } from '../../components/ui/FormField.tsx';
import { Logo } from '../../components/layout/Logo.tsx';
import { api, ApiError } from '../../lib/api.ts';
import { getStoredToken, saveSession } from '../../lib/auth.ts';

const loginSchema = z.object({
  email: z.string().trim().email('El email no es válido').max(120),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(128, 'La contraseña no puede superar 128 caracteres'),
});

type LoginForm = z.infer<typeof loginSchema>;

export function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (getStoredToken()) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginForm) => {
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const session = await api.login({
        email: data.email,
        password: data.password,
      });
      saveSession(session);
      const from =
        (location.state as { from?: string } | null)?.from ?? null;
      navigate(from && from.startsWith('/admin') ? from : '/admin', {
        replace: true,
      });
    } catch (e) {
      setSubmitError(
        e instanceof ApiError
          ? e.message
          : 'No se pudo iniciar sesión. Revisa tu conexión e inténtalo de nuevo.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Seo
        title="Acceso administrativo"
        description="Acceso restringido al panel administrativo de Sonrisa Clínica Dental."
        path="/admin/login"
        noIndex
      />
      <div className="flex min-h-screen items-center justify-center bg-brand-950 px-4">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex flex-col items-center gap-4 text-center">
            <div className="rounded-2xl bg-white p-3 shadow-lg">
              <Logo />
            </div>
            <div>
              <h1 className="flex items-center justify-center gap-2 font-display text-xl font-bold text-white">
                <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                Panel administrativo
              </h1>
              <p className="mt-1 text-sm text-brand-200">
                Acceso restringido al personal autorizado
              </p>
            </div>
          </div>
          <Card className="p-6">
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-4">
              {submitError && <ErrorMessage message={submitError} />}
              <FormField
                id="login-email"
                label="Email"
                error={form.formState.errors.email?.message}
              >
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  className={inputStyles}
                  placeholder="admin@clinica.cl"
                  aria-invalid={
                    form.formState.errors.email ? true : undefined
                  }
                  {...form.register('email')}
                />
              </FormField>
              <FormField
                id="login-password"
                label="Contraseña"
                error={form.formState.errors.password?.message}
              >
                <input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  className={inputStyles}
                  placeholder="••••••••"
                  aria-invalid={
                    form.formState.errors.password ? true : undefined
                  }
                  {...form.register('password')}
                />
              </FormField>
              <Button type="submit" className="w-full" loading={submitting}>
                {submitting ? 'Ingresando...' : 'Ingresar'}
                {!submitting && <LogIn className="h-4 w-4" aria-hidden="true" />}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}