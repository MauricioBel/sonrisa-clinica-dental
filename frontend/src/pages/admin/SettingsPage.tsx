import { Moon, Leaf } from 'lucide-react';
import { SectionTitle } from '../../components/ui/SectionTitle.tsx';
import { Card } from '../../components/ui/Card.tsx';
import { useTheme } from '../../context/ThemeContext.tsx';

const themes = [
  {
    id: 'dark-classic' as const,
    name: 'Clásico Oscuro',
    description: 'Modo oscuro profesional con acentos azules. Ideal para uso prolongado.',
    icon: Moon,
    preview: 'bg-slate-900 border-slate-700',
    accent: 'bg-blue-600',
  },
  {
    id: 'mint-green' as const,
    name: 'Verde Menta',
    description: 'Modo claro fresco con acentos verdes. Diseño limpio y moderno.',
    icon: Leaf,
    preview: 'bg-green-50 border-green-200',
    accent: 'bg-emerald-600',
  },
] as const;

export function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6 max-w-3xl">
      <SectionTitle
        level="h1"
        title="Configuración"
        description="Personaliza la apariencia y preferencias de tu panel de administración."
      />

      <section aria-labelledby="theme-heading">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 id="theme-heading" className="font-display text-lg font-bold text-primary">
                Tema de la interfaz
              </h2>
              <p className="mt-1 text-sm text-secondary">
                Elige el esquema de colores que prefieras. El cambio es inmediato y se guarda automáticamente.
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium badge-${theme === 'dark-classic' ? 'info' : 'success'}`}>
              Actual: {theme === 'dark-classic' ? 'Clásico Oscuro' : 'Verde Menta'}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2" role="radiogroup" aria-label="Seleccionar tema">
            {themes.map((t) => {
              const Icon = t.icon;
              const isActive = theme === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => setTheme(t.id)}
                  className={`
                    relative p-6 rounded-2xl border-2 transition-all duration-200
                    flex flex-col items-center gap-4 text-center
                    ${isActive
                      ? 'ring-2 ring-offset-2'
                      : 'hover:border-primary/50 hover:shadow-md'
                    }
                    ${t.id === 'dark-classic'
                      ? 'ring-blue-500 ring-offset-slate-900 border-slate-700 bg-slate-800/50'
                      : 'ring-emerald-500 ring-offset-green-50 border-green-200 bg-green-50'
                    }
                  `}
                >
                  <div className={`h-16 w-16 rounded-xl flex items-center justify-center ${t.preview}`}>
                    <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-primary">{t.name}</h3>
                    <p className="text-sm text-secondary mt-1">{t.description}</p>
                  </div>
                  <div className={`
                    absolute top-3 right-3 h-6 w-6 rounded-full border-2 flex items-center justify-center
                    ${isActive
                      ? 'bg-primary border-primary text-white'
                      : 'border-border-color bg-card text-muted'
                    }
                  `}>
                    {isActive && <span className="text-[10px]">✓</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>
      </section>

      <section aria-labelledby="info-heading">
        <Card className="p-6">
          <h2 id="info-heading" className="font-display text-lg font-bold text-primary mb-4">
            Información
          </h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-secondary">Versión</dt>
              <dd className="font-medium text-primary">2.1.0</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-secondary">Tema activo</dt>
              <dd className="font-medium text-primary capitalize">{theme.replace('-', ' ')}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-secondary">Preferencia guardada</dt>
              <dd className="font-medium text-primary">localStorage (sonrisa-admin-theme)</dd>
            </div>
          </dl>
        </Card>
      </section>
    </div>
  );
}