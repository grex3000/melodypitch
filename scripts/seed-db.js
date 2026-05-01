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

const client = new Client({
  user: user,
  password: decodeURIComponent(password),
  host: host,
  port: parseInt(port),
  database: database,
  ssl: { rejectUnauthorized: false }
});

async function seed() {
  try {
    await client.connect();
    console.log('✓ Connected!\n');
    
    // Clear existing data (in correct order to respect foreign keys)
    console.log('Clearing existing data...\n');
    await client.query('DELETE FROM "ArtistComment"');
    await client.query('DELETE FROM "PitchItem"');
    await client.query('DELETE FROM "PitchPackage"');
    await client.query('DELETE FROM "LabelNote"');
    await client.query('DELETE FROM "Track"');
    await client.query('DELETE FROM "Submission"');
    await client.query('DELETE FROM "PortalInvite"');
    await client.query('DELETE FROM "Portal"');
    await client.query('DELETE FROM "ArtistMember"');
    await client.query('DELETE FROM "Artist"');
    await client.query('DELETE FROM "Songwriter"');
    await client.query('DELETE FROM "Label"');
    await client.query('DELETE FROM "User"');
    console.log('✓ Data cleared\n');
    
    console.log('Seeding example content...\n');
    
    // 1. Create Users
    console.log('[1] Creating users...');
    const labelUser = await client.query(`
      INSERT INTO "User" (email, name, role, "supabaseUserId") 
      VALUES ('label@melodypitch.test', 'Nocturne Records', 'LABEL', 'label-uid')
      RETURNING id
    `);
    const labelUserId = labelUser.rows[0].id;
    
    const writerUser = await client.query(`
      INSERT INTO "User" (email, name, role, "supabaseUserId") 
      VALUES ('writer@melodypitch.test', 'Maren Solberg', 'SONGWRITER', 'writer-uid')
      RETURNING id
    `);
    const writerUserId = writerUser.rows[0].id;
    
    const artistUser = await client.query(`
      INSERT INTO "User" (email, name, role, "supabaseUserId") 
      VALUES ('artist@melodypitch.test', 'Lena Rydell', 'ARTIST', 'artist-uid')
      RETURNING id
    `);
    const artistUserId = artistUser.rows[0].id;
    console.log('   ✓ Users created\n');
    
    // 2. Create Label
    console.log('[2] Creating label...');
    const label = await client.query(`
      INSERT INTO "Label" ("userId", name) 
      VALUES ($1, 'Nocturne Records')
      RETURNING id
    `, [labelUserId]);
    const labelId = label.rows[0].id;
    console.log('   ✓ Label created\n');
    
    // 3. Create Songwriter
    console.log('[3] Creating songwriter...');
    const songwriter = await client.query(`
      INSERT INTO "Songwriter" ("userId") 
      VALUES ($1)
      RETURNING id
    `, [writerUserId]);
    const songwriterId = songwriter.rows[0].id;
    console.log('   ✓ Songwriter created\n');
    
    // 4. Create Artist and ArtistMember
    console.log('[4] Creating artist...');
    const artist = await client.query(`
      INSERT INTO "Artist" (name) 
      VALUES ('Lena Rydell')
      RETURNING id
    `);
    const artistId = artist.rows[0].id;
    
    await client.query(`
      INSERT INTO "ArtistMember" ("userId", "artistId", role) 
      VALUES ($1, $2, 'Primary')
    `, [artistUserId, artistId]);
    console.log('   ✓ Artist created\n');
    
    // 5. Create Portals
    console.log('[5] Creating portals...');
    const portal1 = await client.query(`
      INSERT INTO "Portal" ("labelId", type, name, slug, brief, "isPublic") 
      VALUES ($1, 'GENERAL', 'Open Demo Submissions', 'nocturne-open', 'Send us your best tracks', true)
      RETURNING id
    `, [labelId]);
    
    const portal2 = await client.query(`
      INSERT INTO "Portal" ("labelId", type, name, slug, brief, deadline, "isPublic") 
      VALUES ($1, 'PROJECT', 'Summer EP Project', 'summer-ep-2026', 'Looking for upbeat tracks', '2026-07-31', true)
      RETURNING id
    `, [labelId]);
    const portal1Id = portal1.rows[0].id;
    console.log('   ✓ Portals created\n');
    
    // 6. Create Submission with Tracks
    console.log('[6] Creating submission with tracks...');
    const submission = await client.query(`
      INSERT INTO "Submission" ("portalId", "songwriterId", "noteToLabel", status) 
      VALUES ($1, $2, 'Here are my latest demos for your consideration.', 'SHORTLISTED')
      RETURNING id
    `, [portal1Id, songwriterId]);
    const submissionId = submission.rows[0].id;
    
    // Add tracks with royalty-free audio URLs
    const baseUrl = 'http://www.soundhelix.com/examples/mp3/SoundHelix-Song';
    const genres = [['Pop', 'Electronic'], ['Indie', 'Alternative'], ['Hip-Hop', 'R&B']];
    const moods = [['Upbeat', 'Energetic'], ['Chill', 'Dreamy'], ['Dark', 'Atmospheric']];
    
    for (let i = 0; i < 3; i++) {
      await client.query(`
        INSERT INTO "Track" ("submissionId", title, "fileUrl", "fileSizeBytes", "durationSecs", genres, moods) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [submissionId, `Demo Track ${i+1}`, `${baseUrl}-${i+1}.mp3`, 5000000, 180 + i*30, genres[i], moods[i]]);
    }
    console.log('   ✓ Submission with 3 tracks created\n');
    
    // 7. Add LabelNotes
    console.log('[7] Adding label notes...');
    const tracks = await client.query('SELECT id FROM "Track" WHERE "submissionId" = $1', [submissionId]);
    for (const track of tracks.rows) {
      await client.query(`
        INSERT INTO "LabelNote" ("trackId", "authorId", body, rating) 
        VALUES ($1, $2, 'Great track! Love the vibe.', 4)
      `, [track.id, labelUserId]);
    }
    console.log('   ✓ Label notes added\n');
    
    // 8. Create Pitch Package
    console.log('[8] Creating pitch package...');
    const pitchPackage = await client.query(`
      INSERT INTO "PitchPackage" ("labelId", "artistId", name, note) 
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `, [labelId, artistId, 'Summer Vibes Pitch', 'Tracks that would fit Lena\'s upcoming summer EP.']);
    const pitchPackageId = pitchPackage.rows[0].id;
    console.log('   ✓ Pitch package created\n');
    
    // 9. Add PitchItems with verdicts
    console.log('[9] Adding pitch items...');
    const tracks2 = await client.query('SELECT id FROM "Track" WHERE "submissionId" = $1 LIMIT 2', [submissionId]);
    for (const track of tracks2.rows) {
      const pitchItem = await client.query(`
        INSERT INTO "PitchItem" ("packageId", "trackId", verdict, "artistRating") 
        VALUES ($1, $2, $3, $4)
        RETURNING id
      `, [pitchPackageId, track.id, 'APPROVED', 5]);
      
      // Add artist comment
      await client.query(`
        INSERT INTO "ArtistComment" ("pitchItemId", "authorId", body, "timestampSec") 
        VALUES ($1, $2, $3, $4)
      `, [pitchItem.rows[0].id, artistUserId, 'This track is perfect for the EP. Let\'s use it!', 45]);
    }
    console.log('   ✓ Pitch items with comments added\n');
    
    console.log('✓ Seed completed successfully!');
    console.log('\nTest accounts:');
    console.log('  label@melodypitch.test     / password123  (LABEL)');
    console.log('  writer@melodypitch.test    / password123  (SONGWRITER)');
    console.log('  artist@melodypitch.test    / password123  (ARTIST)');
    console.log('\nExample portal: http://localhost:3000/p/nocturne-open');
    
  } catch (e) {
    console.error('✗ Seed error:', e.message);
  } finally {
    await client.end();
  }
}

seed();
