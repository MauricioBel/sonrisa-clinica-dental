import { useEffect, useMemo } from 'react';

const SITE_NAME = 'Sonrisa Clínica Dental';
const SITE_URL = (import.meta.env.VITE_SITE_URL ?? 'http://localhost:5173').replace(/\/$/, '');

export const DEFAULT_OG_IMAGE = '/og-image.png';

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noIndex?: boolean;
}

function setMeta(name: string, content: string) {
  const el = document.createElement('meta');
  el.setAttribute('name', name);
  el.setAttribute('content', content);
  document.head.appendChild(el);
}

function setProperty(property: string, content: string) {
  const el = document.createElement('meta');
  el.setAttribute('property', property);
  el.setAttribute('content', content);
  document.head.appendChild(el);
}

/**
 * Limpia las etiquetas SEO gestionadas por este componente para que no se
 * acumulen al navegar entre páginas (cada ruta emite su propio conjunto).
 */
function cleanupManaged() {
  document.head
    .querySelectorAll(
      'meta[name="description"], meta[name="robots"], meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"], script[data-seo-jsonld]',
    )
    .forEach((el) => el.remove());
}

/**
 * Actualiza el SEO de la página: title, description, canonical,
 * robots, Open Graph, Twitter Card y datos estructurados (JSON-LD).
 * Reemplaza el conjunto completo anterior para evitar duplicados.
 */
export function Seo({
  title,
  description,
  path = '/',
  type = 'website',
  image = DEFAULT_OG_IMAGE,
  jsonLd,
  noIndex = false,
}: SeoProps) {
  // JSON-LD serializado para comparar por contenido (no por referencia) y no
  // re-ejecutar el effect en cada render de páginas con objetos inline.
  const jsonLdKey = useMemo(() => (jsonLd ? JSON.stringify(jsonLd) : ''), [jsonLd]);

  useEffect(() => {
    cleanupManaged();

    const fullTitle = `${title} | ${SITE_NAME}`;
    const url = `${SITE_URL}${path}`;
    const absImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

    document.title = fullTitle;
    setMeta('description', description);
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    const canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', url);
    document.head.appendChild(canonical);

    setProperty('og:title', fullTitle);
    setProperty('og:description', description);
    setProperty('og:type', type);
    setProperty('og:url', url);
    setProperty('og:site_name', SITE_NAME);
    setProperty('og:locale', 'es_CL');
    setProperty('og:image', absImage);
    setProperty('og:image:alt', `${title} · ${SITE_NAME}`);

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', absImage);

    if (jsonLdKey) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seoJsonld = 'true';
      script.textContent = jsonLdKey;
      document.head.appendChild(script);
    }
  }, [title, description, path, type, image, jsonLdKey, noIndex]);

  return null;
}
