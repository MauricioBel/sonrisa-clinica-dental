#!/usr/bin/env node

import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

const DATABASE_URL = process.env.DATABASE_URL;
const DIRECT_URL = process.env.DIRECT_URL;

if (!DATABASE_URL || !DIRECT_URL) {
  console.error('❌ Faltan DATABASE_URL o DIRECT_URL en .env');
  process.exit(1);
}

function parseConnectionString(url) {
  const regex = /postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/;
  const match = url.match(regex);
  if (!match) return null;
  return {
    user: match[1],
    password: match[2],
    host: match[3],
    port: parseInt(match[4]),
    database: match[5].split('?')[0],
  };
}

async function testConnection(name, config) {
  console.log(`\n🔌 Probando ${name} (${config.host}:${config.port})...`);
  
  const pool = new Pool({
    ...config,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
    max: 1,
  });

  try {
    const start = Date.now();
    const result = await pool.query('SELECT NOW() as time, version() as version');
    const latency = Date.now() - start;
    
    console.log(`✅ ${name} - Conexión exitosa (${latency}ms)`);
    console.log(`   Host: ${config.host}:${config.port}`);
    console.log(`   DB: ${config.database}`);
    console.log(`   Server time: ${result.rows[0].time}`);
    console.log(`   Version: ${result.rows[0].version.split(' ')[0]}`);
    
    await pool.end();
    return true;
  } catch (error) {
    console.log(`❌ ${name} - Error: ${error.message}`);
    if (error.code === 'ETIMEDOUT' || error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      console.log(`   ⚠️  Problema de red/firewall al puerto ${config.port}`);
    }
    await pool.end();
    return false;
  }
}

async function main() {
  console.log('========================================');
  console.log('  Test de conectividad Supabase');
  console.log('========================================');
  
  const pooledConfig = parseConnectionString(DATABASE_URL);
  const directConfig = parseConnectionString(DIRECT_URL);
  
  if (!pooledConfig || !directConfig) {
    console.error('❌ Error parseando URLs de conexión');
    process.exit(1);
  }
  
  console.log('\n📋 Configuración detectada:');
  console.log(`   Pooled (DATABASE_URL):  ${pooledConfig.host}:${pooledConfig.port}`);
  console.log(`   Direct (DIRECT_URL):    ${directConfig.host}:${directConfig.port}`);
  
  const results = await Promise.all([
    testConnection('Pooled (puerto 6543)', pooledConfig),
    testConnection('Direct (puerto 5432)', directConfig),
  ]);
  
  console.log('\n========================================');
  console.log('  Resumen');
  console.log('========================================');
  console.log(`   Pooled (6543):  ${results[0] ? '✅ OK' : '❌ FALLO'}`);
  console.log(`   Direct (5432):  ${results[1] ? '✅ OK' : '❌ FALLO'}`);
  
  if (results[0] && results[1]) {
    console.log('\n🎉 Ambas conexiones funcionan correctamente');
    process.exit(0);
  } else if (results[0]) {
    console.log('\n⚠️  Solo pooled funciona. Usa DATABASE_URL para la app, DIRECT_URL solo para migraciones si es posible.');
    process.exit(0);
  } else if (results[1]) {
    console.log('\n⚠️  Solo direct funciona. Verifica configuración de pooling en Supabase.');
    process.exit(0);
  } else {
    console.log('\n💥 Ninguna conexión funciona. Revisa:');
    console.log('   - Credenciales en .env');
    console.log('   - Firewall/antivirus bloqueando puertos 5432/6543');
    console.log('   - IPv6 deshabilitado en router/ISP');
    console.log('   - Supabase project status (pausado?)');
    process.exit(1);
  }
}

main().catch(console.error);