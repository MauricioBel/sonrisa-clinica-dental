import { PrismaClient } from '../src/generated/prisma/client.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

const prisma = new PrismaClient();

function iso(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// Próximo día de la semana (0=Domingo..6=Sábado), a partir de hoy.
function nextWeekday(target: number, from = new Date()): string {
  const d = new Date(from);
  let diff = (target - d.getDay() + 7) % 7;
  if (diff === 0) diff = 7;
  d.setDate(d.getDate() + diff);
  return iso(d);
}

// Próxima semana desde hoy (para reservas de ejemplo).
function addDays(days: number, from = new Date()): string {
  const d = new Date(from);
  d.setDate(d.getDate() + days);
  return iso(d);
}

async function main() {
  console.log('Limpiando base de datos...');
  await prisma.appointment.deleteMany();
  await prisma.businessHours.deleteMany();
  await prisma.treatment.deleteMany();
  await prisma.dentist.deleteMany();

  console.log('Creando dentistas...');
  const valentina = await prisma.dentist.create({
    data: {
      name: 'Dra. Valentina Rojas',
      role: 'Directora Médica',
      specialty: 'Implantes dentales y Cirugía bucal',
      description:
        'Especialista en implantología y cirugía oral. Lidera el equipo clínico y supervisa cada plan de tratamiento.',
      experienceYears: 15,
      imageUrl: '/images/dentists/valentina-rojas.svg',
      businessHours: {
        create: [
          { dayOfWeek: 1, openTime: '09:00', closeTime: '18:00' },
          { dayOfWeek: 2, openTime: '09:00', closeTime: '18:00' },
          { dayOfWeek: 3, openTime: '09:00', closeTime: '18:00' },
          { dayOfWeek: 4, openTime: '09:00', closeTime: '18:00' },
          { dayOfWeek: 5, openTime: '09:00', closeTime: '14:00' },
        ],
      },
    },
  });

  const sebastian = await prisma.dentist.create({
    data: {
      name: 'Dr. Sebastián Fuentes',
      role: 'Ortodoncista',
      specialty: 'Ortodoncia y Alineadores invisibles',
      description:
        'Ortodoncista con enfoque en tratamientos estéticos. Planifica movimientos dentales con alineadores y brackets.',
      experienceYears: 9,
      imageUrl: '/images/dentists/sebastian-fuentes.svg',
      businessHours: {
        create: [
          { dayOfWeek: 1, openTime: '09:00', closeTime: '18:00' },
          { dayOfWeek: 2, openTime: '09:00', closeTime: '18:00' },
          { dayOfWeek: 3, openTime: '09:00', closeTime: '18:00' },
          { dayOfWeek: 4, openTime: '09:00', closeTime: '18:00' },
          { dayOfWeek: 5, openTime: '09:00', closeTime: '14:00' },
          { dayOfWeek: 6, openTime: '09:00', closeTime: '13:00' },
        ],
      },
    },
  });

  const camila = await prisma.dentist.create({
    data: {
      name: 'Dra. Camila Torres',
      role: 'Odontóloga General',
      specialty: 'Odontología restauradora y estética',
      description:
        'Especialista en rehabilitación oral, carillas y diseño de sonrisa. Combina técnica y estética en cada tratamiento.',
      experienceYears: 7,
      imageUrl: '/images/dentists/camila-torres.svg',
      businessHours: {
        create: [
          { dayOfWeek: 1, openTime: '09:00', closeTime: '18:00' },
          { dayOfWeek: 2, openTime: '09:00', closeTime: '18:00' },
          { dayOfWeek: 3, openTime: '09:00', closeTime: '18:00' },
          { dayOfWeek: 4, openTime: '09:00', closeTime: '18:00' },
          { dayOfWeek: 5, openTime: '09:00', closeTime: '14:00' },
          { dayOfWeek: 6, openTime: '09:00', closeTime: '13:00' },
        ],
      },
    },
  });

  const andres = await prisma.dentist.create({
    data: {
      name: 'Dr. Andrés Muñoz',
      role: 'Odontopediatra',
      specialty: 'Odontopediatría y Endodoncia',
      description:
        'Especialista en atención dental infantil y tratamientos de conducto. Crea experiencias tranquilas para los más pequeños.',
      experienceYears: 11,
      imageUrl: '/images/dentists/andres-munoz.svg',
      businessHours: {
        create: [
          { dayOfWeek: 1, openTime: '09:00', closeTime: '18:00' },
          { dayOfWeek: 2, openTime: '09:00', closeTime: '18:00' },
          { dayOfWeek: 3, openTime: '09:00', closeTime: '18:00' },
          { dayOfWeek: 4, openTime: '09:00', closeTime: '18:00' },
          { dayOfWeek: 5, openTime: '09:00', closeTime: '14:00' },
          { dayOfWeek: 6, openTime: '09:00', closeTime: '13:00' },
        ],
      },
    },
  });

  console.log('Creando tratamientos...');
  const limpieza = await prisma.treatment.create({
    data: {
      name: 'Limpieza Dental',
      slug: 'limpieza-dental',
      shortDescription: 'Profilaxis completa para eliminar sarro y placa bacteriana.',
      description:
        'Limpieza profesional con ultrasonido y pulido, ideal para mantener una boca sana y prevenir caries y enfermedades de las encías.',
      benefits: [
        'Elimina placa y sarro acumulado',
        'Previene caries y gingivitis',
        'Encías más sanas y aliento fresco',
      ],
      durationMinutes: 30,
      price: 35000,
      imageUrl: '/images/treatments/limpieza-dental.svg',
      isFeatured: true,
      sortOrder: 1,
    },
  });

  const blanqueamiento = await prisma.treatment.create({
    data: {
      name: 'Blanqueamiento Dental',
      slug: 'blanqueamiento-dental',
      shortDescription: 'Aclara el tono de tus dientes de forma segura y efectiva.',
      description:
        'Blanqueamiento con peróxido de carbamida supervisado por nuestros especialistas. Resultados visibles desde la primera sesión.',
      benefits: [
        'Sonrisa más brillante',
        'Resultados visibles en una sesión',
        'Técnica segura supervisada',
      ],
      durationMinutes: 60,
      price: 180000,
      imageUrl: '/images/treatments/blanqueamiento-dental.svg',
      isFeatured: true,
      sortOrder: 2,
    },
  });

  const implantes = await prisma.treatment.create({
    data: {
      name: 'Implantes Dentales',
      slug: 'implantes-dentales',
      shortDescription: 'Reemplaza piezas ausentes con implantes de titanio de última generación.',
      description:
        'Solución definitiva para dientes perdidos. Reconstruimos la pieza sobre un implante de titanio biocompatible con apariencia natural.',
      benefits: [
        'Solución definitiva y duradera',
        'Masticación y habla restauradas',
        'Apariencia 100% natural',
      ],
      durationMinutes: 90,
      price: 450000,
      imageUrl: '/images/treatments/implantes-dentales.svg',
      isFeatured: true,
      sortOrder: 3,
    },
  });

  const ortodoncia = await prisma.treatment.create({
    data: {
      name: 'Ortodoncia',
      slug: 'ortodoncia',
      shortDescription: 'Alinea tus dientes con brackets o alineadores transparentes.',
      description:
        'Tratamiento de ortodoncia para corregir la posición dental y la mordida. Opciones de brackets metálicos, cerámicos y alineadores invisibles.',
      benefits: [
        'Dientes alineados y mordida correcta',
        'Mejora la higiene y la función',
        'Opciones estéticas disponibles',
      ],
      durationMinutes: 60,
      price: 90000,
      imageUrl: '/images/treatments/ortodoncia.svg',
      isFeatured: true,
      sortOrder: 4,
    },
  });

  const carillas = await prisma.treatment.create({
    data: {
      name: 'Carillas Dentales',
      slug: 'carillas-dentales',
      shortDescription: 'Láminas ultrafinas de porcelana para una sonrisa perfecta.',
      description:
        'Carillas de porcelana que corrigen color, forma y tamaño de los dientes frontales con un resultado natural y resistente.',
      benefits: [
        'Corrección estética integral',
        'Resultado natural y luminoso',
        'Material resistente y duradero',
      ],
      durationMinutes: 90,
      price: 250000,
      imageUrl: '/images/treatments/carillas-dentales.svg',
      isFeatured: false,
      sortOrder: 5,
    },
  });

  const odontopediatria = await prisma.treatment.create({
    data: {
      name: 'Odontopediatría',
      slug: 'odontopediatria',
      shortDescription: 'Cuidado dental especializado para niños y adolescentes.',
      description:
        'Atención dental preventiva y curativa para los más pequeños, en un ambiente acogedor que reduce el miedo al dentista.',
      benefits: [
        'Atención especializada infantil',
        'Ambiente amigable y sin estrés',
        'Prevención desde temprana edad',
      ],
      durationMinutes: 45,
      price: 40000,
      imageUrl: '/images/treatments/odontopediatria.svg',
      isFeatured: false,
      sortOrder: 6,
    },
  });

  const endodoncia = await prisma.treatment.create({
    data: {
      name: 'Endodoncia',
      slug: 'endodoncia',
      shortDescription: 'Tratamiento de conducto para salvar dientes dañados.',
      description:
        'Tratamiento de conducto indoloro que elimina la infección del nervio dental y preserva la pieza natural.',
      benefits: [
        'Salva el diente afectado',
        'Elimina el dolor de raíz',
        'Técnica moderna y precisa',
      ],
      durationMinutes: 90,
      price: 220000,
      imageUrl: '/images/treatments/endodoncia.svg',
      isFeatured: false,
      sortOrder: 7,
    },
  });

  const disenoSonrisa = await prisma.treatment.create({
    data: {
      name: 'Diseño de Sonrisa',
      slug: 'diseno-de-sonrisa',
      shortDescription: 'Plan estético personalizado para transformar tu sonrisa.',
      description:
        'Evaluación integral y plan de tratamiento 3D para rediseñar tu sonrisa combinando las técnicas estéticas más avanzadas.',
      benefits: [
        'Plan personalizado y digital',
        'Coordinación de tratamientos estéticos',
        'Resultados predecibles en 3D',
      ],
      durationMinutes: 120,
      price: 300000,
      imageUrl: '/images/treatments/diseno-de-sonrisa.svg',
      isFeatured: false,
      sortOrder: 8,
    },
  });

  console.log('Creando reservas de ejemplo...');

  // Reservas coherentes: cada dentista recibe tratamientos de su especialidad,
  // dentro de su horario laboral y sin solaparse entre sí.
  const examples = [
    // Lunes
    { date: nextWeekday(1), time: '10:00', dentistId: valentina.id, treatmentId: implantes.id, name: 'María', last: 'González' },
    { date: nextWeekday(1), time: '11:30', dentistId: sebastian.id, treatmentId: ortodoncia.id, name: 'Pedro', last: 'Riquelme' },
    { date: nextWeekday(1), time: '15:00', dentistId: camila.id, treatmentId: carillas.id, name: 'Javiera', last: 'Silva' },
    // Martes
    { date: nextWeekday(2), time: '09:30', dentistId: andres.id, treatmentId: odontopediatria.id, name: 'Sofía', last: 'Morales' },
    { date: nextWeekday(2), time: '12:00', dentistId: valentina.id, treatmentId: limpieza.id, name: 'Diego', last: 'Fernández' },
    { date: nextWeekday(2), time: '16:00', dentistId: sebastian.id, treatmentId: ortodoncia.id, name: 'Antonia', last: 'Castro' },
    // Miércoles
    { date: nextWeekday(3), time: '10:30', dentistId: camila.id, treatmentId: blanqueamiento.id, name: 'Francisca', last: 'Vargas' },
    { date: nextWeekday(3), time: '15:30', dentistId: andres.id, treatmentId: endodoncia.id, name: 'Rodrigo', last: 'Paredes' },
    // Algunas reservas de hace unos días (históricas, ya pasadas)
    { date: addDays(-5), time: '11:00', dentistId: camila.id, treatmentId: disenoSonrisa.id, name: 'Constanza', last: 'López' },
    { date: addDays(-4), time: '14:30', dentistId: valentina.id, treatmentId: implantes.id, name: 'Ignacio', last: 'Muñoz' },
  ];

  for (const e of examples) {
    await prisma.appointment.create({
      data: {
        patientName: e.name,
        patientLastName: e.last,
        patientEmail: `${e.name.toLowerCase()}.${e.last.toLowerCase()}@example.com`,
        patientPhone: '+56912345678',
        date: e.date,
        time: e.time,
        comment: 'Reserva de ejemplo para demostración.',
        status: 'CONFIRMED',
        dentistId: e.dentistId,
        treatmentId: e.treatmentId,
        clinicaId: 'sonrisa-clinica-dental-001',
      },
    });
  }

  const counts = {
    dentists: await prisma.dentist.count(),
    treatments: await prisma.treatment.count(),
    businessHours: await prisma.businessHours.count(),
    appointments: await prisma.appointment.count(),
  };

  console.log('Seed completado:', counts);

  // Crear usuario admin por defecto
  console.log('Creando usuario admin...');
  await prisma.adminUser.upsert({
    where: { email: 'admin@sonrisadental.cl' },
    update: {},
    create: {
      email: 'admin@sonrisadental.cl',
      password: hashPassword('admin123'),
      nombre: 'Administrador',
      clinicaId: 'sonrisa-clinica-dental-001',
    },
  });
  console.log('Usuario admin creado: admin@sonrisadental.cl / admin123');
}

main()
  .catch((e) => {
    console.error('Error en el seed:', e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });