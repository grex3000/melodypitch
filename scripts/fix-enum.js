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

const client = new Client({
  user: user,
  password: decodeURIComponent(password),
  host: host,
  port: parseInt(port),
  database: database,
  ssl: { rejectUnauthorized: false }
});

async function fixEnum() {
  try {
    await client.connect();
    console.log('✓ Connected!\n');
    
    // Check if enum exists
    const checkResult = await client.query(`
      SELECT EXISTS (
        SELECT 1 FROM pg_type 
        WHERE typname = 'Role'
      );
    `);
    
    if (checkResult.rows[0].exists) {
      console.log('Enum "Role" already exists.\n');
    } else {
      console.log('Creating enum "Role"...');
      await client.query(`
        CREATE TYPE "Role" AS ENUM ('LABEL', 'SONGWRITER', 'ARTIST');
      `);
      console.log('✓ Enum created!\n');
    }
    
    // Check User table's role column type
    const columnResult = await client.query(`
      SELECT data_type 
      FROM information_schema.columns 
      WHERE table_name = 'User' AND column_name = 'role';
    `);
    
    console.log('Current role column type:', columnResult.rows[0].data_type);
    
    if (columnResult.rows[0].data_type !== 'Role') {
      console.log('Changing role column to use Role enum...');
      await client.query(`
        ALTER TABLE "User" 
        ALTER COLUMN role TYPE "Role" USING role::text::"Role";
      `);
      console.log('✓ Column updated!\n');
    } else {
      console.log('Role column already uses Role enum.\n');
    }
    
    console.log('Done!');
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await client.end();
  }
}

fixEnum();
