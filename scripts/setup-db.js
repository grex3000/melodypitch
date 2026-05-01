const { Client } = require('pg');
const fs = require('fs');

// Read .env
const envContent = fs.readFileSync('.env', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...values] = line.split('=');
  if (key && values.length) env[key.trim()] = values.join('=').trim();
});

// Parse DATABASE_URL
const dbUrl = env.DATABASE_URL;
const match = dbUrl.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(\w+)/);

if (!match) {
  console.error('Failed to parse DATABASE_URL');
  process.exit(1);
}

const [_, user, password, host, port, database] = match;

console.log('Connecting to database...');
console.log('Host:', host);
console.log('Port:', port);
console.log('User:', user);

const client = new Client({
  user: user,
  password: decodeURIComponent(password),
  host: host,
  port: parseInt(port),
  database: database,
  ssl: { rejectUnauthorized: false }
});

async function runSQL() {
  try {
    await client.connect();
    console.log('✓ Connected!\n');
    
    // Enable pgcrypto
    console.log('Enabling pgcrypto...');
    try {
      await client.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');
      console.log('✓ Extension enabled\n');
    } catch(e) {
      console.log('✗ Extension error:', e.message, '\n');
    }
    
    // Read SQL file
    const sql = fs.readFileSync('prisma/setup.sql', 'utf8');
    
    // Extract CREATE TABLE statements using regex
    const createTableRegex = /CREATE TABLE IF NOT EXISTS ["\w]+[\s\S]*?^\);/gm;
    let statements = [];
    let m;
    
    while ((m = createTableRegex.exec(sql)) !== null) {
      statements.push(m[0]);
    }
    
    // Add ALTER TABLE statements
    const alterTableRegex = /ALTER TABLE ["\w]+ ADD COLUMN IF NOT EXISTS [\s\S]*?;/gm;
    while ((m = alterTableRegex.exec(sql)) !== null) {
      statements.push(m[0]);
    }
    
    console.log(`Found ${statements.length} statements to execute...\n`);
    
    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i].trim();
      if (!stmt) continue;
      
      try {
        console.log(`[${i+1}] ${stmt.substring(0, 60)}...`);
        await client.query(stmt);
        console.log('   ✓ Success\n');
      } catch (e) {
        console.log(`   ✗ ${e.message}\n`);
      }
    }
    
    console.log('Done! Check your Supabase dashboard to verify tables.');
  } catch (e) {
    console.error('Connection error:', e.message);
  } finally {
    await client.end();
  }
}

runSQL();
