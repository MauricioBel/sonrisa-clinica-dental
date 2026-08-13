export const CLINIC_NAME = 'Sonrisa Clínica Dental';
export const CLINIC_SLOGAN = 'Tu sonrisa es nuestra prioridad';

export const WHATSAPP_NUMBER = '56987654321';
export const WHATSAPP_DISPLAY = '+56 9 8765 4321';

export const WHATSAPP_DEFAULT_MESSAGE =
  'Hola, quisiera consultar por una hora en Sonrisa Clínica Dental.';

export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_DEFAULT_MESSAGE,
)}`;

export const CLINIC_ADDRESS = 'Av. Providencia 1234, oficina 502, Providencia, Santiago de Chile';
export const CLINIC_PHONE = '+56 2 2345 6789';
export const CLINIC_EMAIL = 'contacto@sonrisadental.cl';

export const BUSINESS_HOURS = [
  { days: 'Lunes a Viernes', hours: '09:00 a 19:00 hrs' },
  { days: 'Sábado', hours: '09:00 a 14:00 hrs' },
  { days: 'Domingo', hours: 'Cerrado' },
];