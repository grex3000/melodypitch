import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { jwtDecode } from 'jwt-decode';

interface JWTPayload {
  sub: string;
  email: string;
  user_metadata?: {
    full_name?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accessToken, refreshToken } = body;

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { error: 'Missing tokens' },
        { status: 400 }
      );
    }

    console.log('[STORE SESSION] Storing OAuth tokens');

    // Decode JWT to get user info
    let userId: string;
    let email: string;
    let userName: string;

    try {
      const decoded = jwtDecode<JWTPayload>(accessToken);
      userId = decoded.sub;
      email = decoded.email;
      userName = decoded.user_metadata?.full_name || email.split('@')[0];
      console.log('[STORE SESSION] Decoded user:', { userId, email, userName });
    } catch (err) {
      console.error('[STORE SESSION] Failed to decode JWT:', err);
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 400 }
      );
    }

    // Store session cookies
    const cookieStore = await cookies();
    cookieStore.set('sb-access-token', accessToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600, // 1 hour
    });

    cookieStore.set('sb-refresh-token', refreshToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    console.log('[STORE SESSION] Cookies set');

    // Create or update user in database
    try {
      const existingUser = await db.user.findUnique({
        where: { supabaseUserId: userId },
      });

      if (!existingUser) {
        await db.user.create({
          data: {
            supabaseUserId: userId,
            email,
            name: userName,
            role: 'SONGWRITER', // Default role for OAuth users
          },
        });
        console.log('[STORE SESSION] Created new user:', email);
      } else {
        console.log('[STORE SESSION] User already exists:', email);
      }
    } catch (dbErr) {
      console.error('[STORE SESSION] Database error:', dbErr);
      // Continue anyway
    }

    // Determine redirect URL based on user role
    let redirectUrl = '/songwriter/dashboard';
    try {
      const user = await db.user.findUnique({
        where: { supabaseUserId: userId },
      });

      if (user) {
        const dashboardMap: Record<string, string> = {
          LABEL: '/label/dashboard',
          SONGWRITER: '/songwriter/dashboard',
          ARTIST: '/artist/dashboard',
        };
        redirectUrl = dashboardMap[user.role] || '/songwriter/dashboard';
        console.log('[STORE SESSION] Redirecting to:', redirectUrl);
      }
    } catch (err) {
      console.error('[STORE SESSION] Error determining redirect:', err);
    }

    return NextResponse.json({
      success: true,
      redirectUrl,
    });
  } catch (error) {
    console.error('[STORE SESSION] Exception:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
