import { useConfig, useClinicaId, useClinicaNombre } from '../context/ConfigContext.tsx';
import { useNavigate as useRouterNavigate } from 'react-router-dom';

export function useWhatsApp() {
  const { config, loading } = useConfig();
  if (loading || !config) {
    return { link: '#', display: '', numero: '' };
  }
  const { numero, display, mensajeDefault } = config.clinica.whatsapp;
  const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensajeDefault)}`;
  return { link, display, numero };
}

export function useClinicaInfo() {
  const { config, loading } = useConfig();
  if (loading || !config) {
    return {
      nombre: '',
      slogan: '',
      telefono: '',
      email: '',
      direccion: '',
      horario: [],
    };
  }
  return config.clinica;
}

export function useNavigate() {
  return useRouterNavigate();
}

export { useClinicaId, useClinicaNombre };