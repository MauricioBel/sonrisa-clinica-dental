import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { loadConfig, type ClinicaConfig } from '../lib/config.ts';

interface ConfigContextValue {
  config: ClinicaConfig | null;
  loading: boolean;
  error: Error | null;
}

const ConfigContext = createContext<ConfigContextValue>({
  config: null,
  loading: true,
  error: null,
});

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<ClinicaConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    loadConfig()
      .then((cfg) => {
        if (mounted) {
          setConfig(cfg);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err);
          setLoading(false);
        }
      });
    return () => { mounted = false; };
  }, []);

  return (
    <ConfigContext.Provider value={{ config, loading, error }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig debe usarse dentro de ConfigProvider');
  }
  return context;
}

export function useClinicaConfig() {
  const { config } = useConfig();
  return config?.clinica ?? null;
}

export function useIdentidadVisual() {
  const { config } = useConfig();
  return config?.identidadVisual ?? null;
}

export function useServicios() {
  const { config } = useConfig();
  return config?.servicios ?? [];
}

export function useEspecialistas() {
  const { config } = useConfig();
  return config?.especialistas ?? [];
}

export function useClinicaId() {
  const { config } = useConfig();
  return config?.clinica_id ?? '';
}

export function useClinicaNombre() {
  const { config } = useConfig();
  return config?.clinica.nombre ?? '';
}