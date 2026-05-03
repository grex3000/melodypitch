import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { db } from './db';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('sb-access-token')?.value;

    if (!accessToken) {
      return null;
    }

    // Create a client with the user's session
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get user from Supabase
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return null;
    }

    // Get user from database
    const dbUser = await db.user.findUnique({
      where: { supabaseUserId: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        supabaseUserId: true,
      },
    });

    return dbUser;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
}
