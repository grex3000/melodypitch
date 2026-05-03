import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: 'Missing Supabase configuration' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const callbackUrl = body.callbackUrl || '/';
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    console.log('[GOOGLE AUTH] Initiating OAuth with redirect to:', `${baseUrl}/auth/callback?next=${callbackUrl}`);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${baseUrl}/auth/callback?next=${callbackUrl}`,
        skipBrowserRedirect: false,
      },
    });

    if (error) {
      console.error('[GOOGLE AUTH] OAuth error:', error);
      return NextResponse.json(
        { error: error.message || 'OAuth initiation failed' },
        { status: 400 }
      );
    }

    if (!data.url) {
      console.error('[GOOGLE AUTH] No OAuth URL returned');
      return NextResponse.json(
        { error: 'No OAuth URL generated' },
        { status: 500 }
      );
    }

    console.log('[GOOGLE AUTH] OAuth URL:', data.url);
    return NextResponse.json({ url: data.url });
  } catch (error) {
    console.error('[GOOGLE AUTH] Exception:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
