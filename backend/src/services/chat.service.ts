import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface ClinicaConfig {
  theme: 'boutique' | 'classic' | 'modern';
  clinica_id: string;
  clinica: {
    nombre: string;
    slogan: string;
    telefono: string;
    email: string;
    direccion: string;
    horario: Array<{ dias: string; horas: string }>;
    whatsapp: {
      numero: string;
      display: string;
      mensajeDefault: string;
    };
  };
  identidadVisual: {
    colorPrincipal: string;
    colorSecundario: string;
    logoUrl: string;
  };
  servicios: Array<{ nombre: string; descripcionCorta: string }>;
  especialistas: Array<{ nombre: string; especialidad: string }>;
}

let configCache: ClinicaConfig | null = null;

async function loadClinicaConfig(): Promise<ClinicaConfig> {
  if (configCache) return configCache;

  try {
    const fs = await import('node:fs/promises');
    // When running from dist/, __dirname is backend/dist/services
    // When running with tsx, __dirname is backend/src/services
    // In both cases, we need to go up to project root then to frontend/public
    const possiblePaths = [
      resolve(__dirname, '../../../frontend/public/config.json'), // from dist/services
      resolve(__dirname, '../../frontend/public/config.json'),    // from src/services
    ];

    let fileContent: string | null = null;
    for (const configPath of possiblePaths) {
      try {
        fileContent = await fs.readFile(configPath, 'utf-8');
        break;
      } catch {
        continue;
      }
    }

    if (!fileContent) {
      throw new Error('No se encontró config.json en ninguna ruta conocida');
    }

    const config = JSON.parse(fileContent);
    configCache = config;
    return config;
  } catch (error) {
    console.error('Error cargando config.json para chat:', error);
    throw new Error('No se pudo cargar la configuración de la clínica');
  }
}

function buildSystemPrompt(clinicaConfig: ClinicaConfig): string {
  const { clinica, servicios, especialistas } = clinicaConfig;

  const serviciosText = servicios
    .map((s) => `- ${s.nombre}: ${s.descripcionCorta}`)
    .join('\n');

  const especialistasText = especialistas
    .map((e) => `- ${e.nombre} (${e.especialidad})`)
    .join('\n');

  const horariosText = clinica.horario
    .map((h) => `${h.dias}: ${h.horas}`)
    .join('\n');

  return `Eres la recepcionista virtual de ${clinica.nombre}.

INFORMACIÓN DE LA CLÍNICA:
- Nombre: ${clinica.nombre}
- Slogan: ${clinica.slogan}
- Teléfono: ${clinica.telefono}
- Email: ${clinica.email}
- Dirección: ${clinica.direccion}
- Horarios:
${horariosText}
- WhatsApp: ${clinica.whatsapp.display}

SERVICIOS DISPONIBLES:
${serviciosText}

ESPECIALISTAS:
${especialistasText}

INSTRUCCIONES ESTRICTAS:
1. Tu tono es profesional, cálido, empático y conciso (máximo 3 oraciones por respuesta).
2. Usa ÚNICAMENTE la información provista arriba. Si te preguntan por un tratamiento, precio o médico que no está en la lista, indica amablemente que no dispones de esa información y sugiere contactar por WhatsApp al ${clinica.whatsapp.display}.
3. Si el usuario muestra intención de agendar (ej. "quiero una cita", "tienen hora", "cuándo atiende el dr", "reservar", "agendar"), responde amablemente e incluye un llamado a agendar.
4. NO inventes información, precios ni disponibilidad.
5. Responde en español, de forma natural y útil.
6. Si la consulta es médica específica, deriva a consulta con el especialista.`;
}

function detectBookingIntent(message: string): boolean {
  const bookingKeywords = [
    'agendar',
    'reservar',
    'cita',
    'hora',
    'disponibilidad',
    'atender',
    'turno',
    'agenda',
    'reserva',
    'cupo',
    'libre',
    'ocupado',
  ];

  const lowerMessage = message.toLowerCase();
  return bookingKeywords.some((keyword) => lowerMessage.includes(keyword));
}

function mockChatResponse(message: string, clinicaConfig: ClinicaConfig): { reply: string; suggestBooking: boolean } {
  const lowerMessage = message.toLowerCase();
  const { clinica, servicios, especialistas } = clinicaConfig;

  // Saludos
  if (/\b(hola|buenos|buenas|buenas tardes|buenos días|saludos)\b/.test(lowerMessage)) {
    return {
      reply: `¡Hola! Soy la asistente virtual de ${clinica.nombre}. ¿En qué puedo ayudarte hoy?`,
      suggestBooking: false,
    };
  }

  // Horarios
  if (/\b(horarios?|abren|cierran|abierto|cerrado|atencion|atención)\b/.test(lowerMessage)) {
    const horariosText = clinica.horario.map((h) => `${h.dias} de ${h.horas}`).join(', ');
    return {
      reply: `Nuestros horarios de atención son: ${horariosText}. ¿Te gustaría agendar una cita en alguno de estos horarios?`,
      suggestBooking: true,
    };
  }

  // Ubicación/Dirección
  if (/\b(dónde|ubicación|dirección|direccion|ubican|localizado)\b/.test(lowerMessage)) {
    return {
      reply: `Nos encontramos en ${clinica.direccion}. ¿Necesitas indicaciones para llegar?`,
      suggestBooking: false,
    };
  }

  // Teléfono/Contacto
  if (/\b(teléfono|telefono|contacto|llamar|llamar)\b/.test(lowerMessage)) {
    return {
      reply: `Puedes contactarnos al ${clinica.telefono} o por WhatsApp al ${clinica.whatsapp.display}.`,
      suggestBooking: false,
    };
  }

  // Servicios/Tratamientos
  if (/\b(servicios?|tratamientos?|hacen|realizan|ofrecen|precio|costo|cuánto|cuanto)\b/.test(lowerMessage)) {
    // Buscar servicio específico mencionado
    for (const servicio of servicios) {
      const servicioKeywords = servicio.nombre.toLowerCase().split(' ');
      if (servicioKeywords.some((kw) => lowerMessage.includes(kw))) {
        return {
          reply: `${servicio.nombre}: ${servicio.descripcionCorta}. El precio y duración varían según el caso. ¿Te gustaría que te dé más detalles o agendar una evaluación?`,
          suggestBooking: true,
        };
      }
    }

    // Listar todos los servicios
    const listaServicios = servicios.map((s) => `• ${s.nombre}`).join('\n');
    return {
      reply: `Ofrecemos los siguientes tratamientos:\n${listaServicios}\n\n¿Te interesa alguno en particular? Puedo darte más detalles o ayudarte a agendar.`,
      suggestBooking: true,
    };
  }

  // Especialistas/Médicos
  if (/\b(médico|medico|doctor|dra|dr|especialista|odontólogo|odontologo|profesional)\b/.test(lowerMessage)) {
    for (const especialista of especialistas) {
      const nombrePartes = especialista.nombre.toLowerCase().split(' ');
      if (nombrePartes.some((parte) => lowerMessage.includes(parte))) {
        return {
          reply: `${especialista.nombre} es ${especialista.especialidad}. ¿Te gustaría agendar una cita con ${especialista.nombre.split(' ')[1] || especialista.nombre}?`,
          suggestBooking: true,
        };
      }
    }

    const listaEspecialistas = especialistas.map((e) => `• ${e.nombre} (${e.especialidad})`).join('\n');
    return {
      reply: `Nuestro equipo de especialistas:\n${listaEspecialistas}\n\n¿Con quién te gustaría atenderte?`,
      suggestBooking: true,
    };
  }

  // WhatsApp
  if (/\b(whatsapp|wasap|chat|mensaje)\b/.test(lowerMessage)) {
    return {
      reply: `Puedes escribirnos directamente por WhatsApp al ${clinica.whatsapp.display}. Te responderemos a la brevedad.`,
      suggestBooking: false,
    };
  }

  // Agradecimiento
  if (/\b(gracias|grax|thx|thank)\b/.test(lowerMessage)) {
    return {
      reply: `¡De nada! Estamos para ayudarte. ¿Hay algo más en lo que te pueda asistir?`,
      suggestBooking: false,
    };
  }

  // Despedida
  if (/\b(adiós|adios|chao|hasta luego|nos vemos)\b/.test(lowerMessage)) {
    return {
      reply: `¡Hasta pronto! Recuerda que puedes agendar tu cita online o escribirnos por WhatsApp al ${clinica.whatsapp.display}.`,
      suggestBooking: false,
    };
  }

  // Respuesta por defecto
  return {
    reply: `Gracias por tu consulta. Para darte una respuesta precisa, ¿podrías indicarme si buscas información sobre horarios, tratamientos, especialistas o deseas agendar una cita? También puedes contactarnos directamente por WhatsApp al ${clinica.whatsapp.display}.`,
    suggestBooking: false,
  };
}

export async function processChatMessage(
  message: string,
  history: Array<{ role: 'user' | 'assistant'; content: string }> = []
): Promise<{ reply: string; suggestBooking: boolean }> {
  const clinicaConfig = await loadClinicaConfig();
  const systemPrompt = buildSystemPrompt(clinicaConfig);

  const geminiKey = process.env.GEMINI_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (geminiKey) {
    try {
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const genAI = new GoogleGenerativeAI(geminiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const chat = model.startChat({
        history: history.map((msg) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        })),
        generationConfig: {
          maxOutputTokens: 300,
          temperature: 0.7,
        },
      });

      const result = await chat.sendMessage(`${systemPrompt}\n\nUsuario: ${message}`);
      const reply = result.response.text().trim();

      return {
        reply,
        suggestBooking: detectBookingIntent(message) || detectBookingIntent(reply),
      };
    } catch (error) {
      console.error('Error con Gemini, usando mock:', error);
    }
  }

  if (openaiKey) {
    try {
      const OpenAI = (await import('openai')).default;
      const openai = new OpenAI({ apiKey: openaiKey });

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...history.map((msg) => ({ role: msg.role, content: msg.content })),
          { role: 'user', content: message },
        ],
        max_tokens: 300,
        temperature: 0.7,
      });

      const reply = completion.choices[0]?.message?.content?.trim() || '';

      return {
        reply,
        suggestBooking: detectBookingIntent(message) || detectBookingIntent(reply),
      };
    } catch (error) {
      console.error('Error con OpenAI, usando mock:', error);
    }
  }

  // Fallback al mock inteligente
  return mockChatResponse(message, clinicaConfig);
}