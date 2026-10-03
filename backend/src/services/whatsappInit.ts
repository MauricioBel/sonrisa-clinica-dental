import { whatsappService } from './whatsappService.js';

async function main() {
  console.log('╔═══════════════════════════════════════════════╗');
  console.log('║     Sonrisa Clínica - Bot de WhatsApp        ║');
  console.log('╚═══════════════════════════════════════════════╝\n');

  try {
    await whatsappService.initialize();
    
    // Keep the process alive
    console.log('🔄 Bot en ejecución. Presiona Ctrl+C para salir.\n');
    
    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\n🛑 Cerrando bot de WhatsApp...');
      process.exit(0);
    });
    
    process.on('SIGTERM', async () => {
      console.log('\n🛑 Cerrando bot de WhatsApp...');
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  }
}

main();