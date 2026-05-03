const { Client } = require('pg');
const fs = require('fs');

// Read .env
const envContent = fs.readFileSync('.env', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [key, ...values] = line.split('=');
  if (key && values.length) env[key.trim()] = values.join('=').trim();
});

// Parse DATABASE_URL (direct connection, no pooler)
const dbUrl = env.DATABASE_URL;
const match = dbUrl.match(/postgresql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(\w+)/);

if (!match) {
  console.error('Failed to parse DATABASE_URL');
  process.exit(1);
}

const [_, user, password, host, port, database] = match;

console.log('Connecting to database...');

const client = new Client({
  user: user,
  password: decodeURIComponent(password),
  host: host,
  port: parseInt(port),
  database: database,
  ssl: { rejectUnauthorized: false }
});

async function disableEmailConfirmation() {
  try {
    await client.connect();
    console.log('✓ Connected!');
    
    // Check current setting
    const checkResult = await client.query('SELECT confirm_offic FROM auth.config LIMIT 1');
    console.log('Current confirm_offic:', checkResult.rows[0].confirm_offic);
    
    // Disable email confirmation (auth schema)
    console.log('\nDisabling email confirmation...');
    await client.query(`
      UPDATE auth.config 
      SET confirm_offic = '{"email":false}'
      WHERE id = (SELECT id FROM auth.config LIMIT 1)
    `);
    
    // Verify
    const verifyResult = await client.query('SELECT confirm_offic FROM auth.config LIMIT 1');
    console.log('Updated confirm_offic:', verifyResult.rows[0].confirm_offic);
    console.log('✓ Email confirmation disabled!');
    
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await client.end();
  }
}

disableEmailConfirmation();
