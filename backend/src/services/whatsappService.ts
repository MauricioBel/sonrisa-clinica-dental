import pkg from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import 'dotenv/config';
import OpenAI from 'openai';

const { Client, LocalAuth } = pkg;
type Message = pkg.Message;
type ClientType = pkg.Client;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
Eres el asistente virtual de Sonrisa Clínica Dental. 
Eres amable, profesional y conciso. 
Tu objetivo actual es saludar, preguntar en qué puedes ayudar (ej. agendar cita, consultar precios de blanqueamiento o limpieza) y responder preguntas breves. 
Aún no tienes acceso a la base de datos de horas, así que si te piden agendar, diles que estás revisando la disponibilidad.
`;

class WhatsAppService {
  private client: ClientType;
  private isReady: boolean = false;

  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth({
        clientId: 'sonrisa-clinica-bot',
        dataPath: './.wwebjs_auth',
      }),
      puppeteer: {
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor',
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding',
          '--disable-extensions',
          '--disable-default-apps',
          '--disable-sync',
          '--disable-translate',
          '--hide-scrollbars',
          '--mute-audio',
          '--no-default-browser-check',
          '--no-pings',
        ],
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
        ignoreDefaultArgs: ['--enable-automation'],
      },
    });

    this.initializeEvents();
  }

  private initializeEvents(): void {
    this.client.on('qr', (qr: string) => {
      console.log('\n📱 Escanea el código QR con tu WhatsApp:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      qrcode.generate(qr, { small: true });
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('⏳ Esperando autenticación...\n');
    });

    this.client.on('ready', () => {
      this.isReady = true;
      console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('✅ Bot de WhatsApp autenticado y listo para operar.');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    });

    this.client.on('authenticated', () => {
      console.log('🔐 Sesión autenticada correctamente');
    });

    this.client.on('auth_failure', (msg: string) => {
      console.error('❌ Error de autenticación:', msg);
      this.isReady = false;
    });

    this.client.on('logout', (reason: string) => {
      console.warn('⚠️ Sesión cerrada (LOGOUT):', reason);
      console.log('🔄 El bot intentará reconectar automáticamente...');
      this.isReady = false;
    });

    this.client.on('disconnected', (reason: string) => {
      console.log('🔌 Cliente desconectado:', reason);
      this.isReady = false;
    });

    this.client.on('change_state', (state: string) => {
      console.log('🔄 Cambio de estado:', state);
      if (state === 'CONNECTED') {
        this.isReady = true;
      } else if (state === 'UNPAIRED' || state === 'UNLAUNCHED') {
        this.isReady = false;
      }
    });

    this.client.on('message', async (message: Message) => {
      // Ignore messages from ourselves
      if (message.fromMe) return;

      // 🔒 Filtro de seguridad: Ignorar mensajes de broadcast/status y grupos
      if (message.from === 'status@broadcast') {
        console.log('🚫 Ignorando mensaje de estado (broadcast)');
        return;
      }
      // Detectar grupos: los IDs de grupo en WhatsApp terminan en -g.us
      if (message.from.endsWith('@g.us')) {
        console.log('🚫 Ignorando mensaje de grupo (solo chats privados por ahora)');
        return;
      }

      const contact = await message.getContact();
      const senderId = message.from;
      
      console.log(`📨 Mensaje recibido de ${contact.name || contact.number}: "${message.body}"`);

      // Process with OpenAI
      const response = await this.handleIncomingMessage(message.body, senderId);
      
      // 🔒 Envío robusto: try/catch para evitar crash por cambios internos de WhatsApp
      try {
        await message.reply(response);
      } catch (replyError) {
        console.error('❌ Error al responder mensaje (WhatsApp internal):', replyError);
        // Intentar fallback: enviar como mensaje nuevo
        try {
          await this.client.sendMessage(senderId, response);
          console.log('✅ Respuesta enviada vía sendMessage fallback');
        } catch (fallbackError) {
          console.error('❌ Fallback también falló:', fallbackError);
        }
      }
    });
  }

  private async handleIncomingMessage(userMessage: string, senderId: string): Promise<string> {
    if (!process.env.OPENAI_API_KEY) {
      console.warn('⚠️ OPENAI_API_KEY no configurada, usando respuesta por defecto');
      return 'Hola, soy el asistente de Sonrisa Clínica Dental. ¿En qué puedo ayudarte hoy?';
    }

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage },
        ],
        max_tokens: 200,
        temperature: 0.7,
      });

      const aiResponse = completion.choices[0]?.message?.content?.trim();
      
      if (aiResponse) {
        console.log(`🤖 Respuesta IA a ${senderId}: "${aiResponse}"`);
        return aiResponse;
      }

      return 'Hola, soy el asistente de Sonrisa Clínica Dental. ¿En qué puedo ayudarte hoy?';
    } catch (error) {
      console.error('❌ Error en OpenAI:', error);
      return 'Hola, soy el asistente de Sonrisa Clínica Dental. ¿En qué puedo ayudarte hoy?';
    }
  }

  public async initialize(): Promise<void> {
    try {
      console.log('🚀 Iniciando cliente de WhatsApp...');
      await this.client.initialize();
    } catch (error) {
      console.error('❌ Error al inicializar el cliente:', error);
      throw error;
    }
  }

  public async sendMessage(to: string, message: string): Promise<boolean> {
    if (!this.isReady) {
      console.warn('⚠️ El bot no está listo para enviar mensajes');
      return false;
    }

    try {
      await this.client.sendMessage(to, message);
      return true;
    } catch (error) {
      console.error('❌ Error al enviar mensaje:', error);
      return false;
    }
  }

  public getClient(): ClientType {
    return this.client;
  }

  public getReadyStatus(): boolean {
    return this.isReady;
  }
}

export const whatsappService = new WhatsAppService();
export default whatsappService;
