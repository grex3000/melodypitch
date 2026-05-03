import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  console.log('[OAUTH CALLBACK] URL:', request.url);
  console.log('[OAUTH CALLBACK] Code:', code);
  console.log('[OAUTH CALLBACK] Next:', next);

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    console.log('[OAUTH CALLBACK] Exchange result - error:', error, 'data:', data);

    if (!error && data?.session && data?.user) {
      // Create or update user in database
      const user = data.user;
      
      try {
        // Check if user exists
        const existingUser = await db.user.findUnique({
          where: { supabaseUserId: user.id },
        });

        if (!existingUser) {
          // For OAuth users, we need to determine their role
          // For now, default to SONGWRITER (they can change it in settings later)
          await db.user.create({
            data: {
              supabaseUserId: user.id,
              email: user.email || '',
              name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
              role: 'SONGWRITER', // Default role for OAuth users
            },
          });
          console.log(`Created new user via OAuth: ${user.email}`);
        }
      } catch (dbError) {
        console.error('Database error creating OAuth user:', dbError);
        // Continue anyway - user can be created later
      }

      const cookieStore = await cookies();
      
      cookieStore.set('sb-access-token', data.session.access_token, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: data.session.expires_in,
      });

      cookieStore.set('sb-refresh-token', data.session.refresh_token, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30,
      });

      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  // Return to login if there's an error
  return NextResponse.redirect(new URL('/login?error=auth_failed', request.url));
}
