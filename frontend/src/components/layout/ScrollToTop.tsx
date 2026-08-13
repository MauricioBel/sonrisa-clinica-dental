import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Restaura el scroll al inicio en cada cambio de ruta. */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}