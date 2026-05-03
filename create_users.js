const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres.lzanwxebqypekmeedwrw:melodypitch2026%21@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true';
const adapter = new PrismaPg({ connectionString });
const db = new PrismaClient({ adapter });

async function createUsers() {
  try {
    console.log('Creating test User records in database...\n');

    // Create Label user
    const labelUser = await db.user.create({
      data: {
        supabaseUserId: '5d446970-788e-4c15-9ca7-9d04503e5d8b',
        email: 'label-test@melodypitch.test',
        name: 'Test Label',
        role: 'LABEL',
      }
    });
    console.log('✅ Label user created');
    console.log('   ID:', labelUser.id);
    console.log('   Email:', labelUser.email);
    console.log('   Role:', labelUser.role);
    console.log('');

    // Create Songwriter user
    const songwriterUser = await db.user.create({
      data: {
        supabaseUserId: 'f81cf584-9a73-49ce-ace9-c3ae87febab3',
        email: 'songwriter-test@melodypitch.test',
        name: 'Test Songwriter',
        role: 'SONGWRITER',
      }
    });
    console.log('✅ Songwriter user created');
    console.log('   ID:', songwriterUser.id);
    console.log('   Email:', songwriterUser.email);
    console.log('   Role:', songwriterUser.role);
    console.log('');

    // Create Artist user
    const artistUser = await db.user.create({
      data: {
        supabaseUserId: '6d292bce-0b0c-4287-9802-ea2d31021b02',
        email: 'artist-test@melodypitch.test',
        name: 'Test Artist',
        role: 'ARTIST',
      }
    });
    console.log('✅ Artist user created');
    console.log('   ID:', artistUser.id);
    console.log('   Email:', artistUser.email);
    console.log('   Role:', artistUser.role);
    console.log('');

    console.log('✅ All test accounts created successfully!');
    
    // Verify by listing all test users
    console.log('\nVerifying created users:');
    const allUsers = await db.user.findMany({
      where: {
        email: {
          contains: 'melodypitch.test'
        }
      }
    });
    
    console.log(`Found ${allUsers.length} test users:`);
    allUsers.forEach(u => {
      console.log(`  - ${u.email} (${u.role})`);
    });

    await db.$disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating users:');
    console.error(err.message);
    if (err.code) console.error('Code:', err.code);
    await db.$disconnect();
    process.exit(1);
  }
}

createUsers();
