const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const users = [
  { email: 'label@melodypitch.test', password: 'password123', name: 'Nocturne Records', role: 'LABEL' },
  { email: 'writer@melodypitch.test', password: 'password123', name: 'Maren Solberg', role: 'SONGWRITER' },
  { email: 'artist@melodypitch.test', password: 'password123', name: 'Lena Rydell', role: 'ARTIST' },
];

async function createUsers() {
  for (const u of users) {
    console.log(`Creating user: ${u.email}...`);
    
    // Try to create user via Admin API
    try {
      const { data, error } = await supabase.auth.admin.createUser({
        email: u.email,
        password: u.password,
        email_confirm: true,
        user_metadata: { name: u.name, role: u.role }
      });
      
      if (error) {
        console.log(`  ✗ Error: ${error.message}`);
      } else {
        console.log(`  ✓ Created: ${data.user.id}`);
      }
    } catch (e) {
      console.log(`  ✗ Exception: ${e.message}`);
    }
  }
}

createUsers();
