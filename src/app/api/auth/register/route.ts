import { createClient } from '@supabase/supabase-js';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import type { Role } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, role } = body;

    // Validation
    if (!email || !password || !name || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    console.log(`[REGISTER] Config check:`);
    console.log(`[REGISTER] URL exists: ${!!supabaseUrl}`);
    console.log(`[REGISTER] Anon key exists: ${!!supabaseAnonKey}`);
    console.log(`[REGISTER] URL: ${supabaseUrl}`);
    console.log(`[REGISTER] Anon key starts with: ${supabaseAnonKey?.substring(0, 20)}`);

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: 'Missing Supabase configuration' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    console.log(`[REGISTER] Attempting to sign up: ${email}`);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
        },
      },
    });

    console.log(`[REGISTER] SignUp response - error: ${!!error}, user: ${!!data?.user}`);

    if (error) {
      console.error(`[REGISTER] Auth error:`, error.message, error.status);
      return NextResponse.json(
        { error: error.message || 'Failed to create account' },
        { status: 400 }
      );
    }

    if (!data.user) {
      console.error(`[REGISTER] No user returned`);
      return NextResponse.json(
        { error: 'Failed to create account' },
        { status: 400 }
      );
    }

    // Create Prisma user record
    try {
      console.log(`[REGISTER] Creating Prisma user: ${data.user.id}`);
      await db.user.create({
        data: {
          supabaseUserId: data.user.id,
          email,
          name,
          role: role as Role,
        },
      });
    } catch (dbErr) {
      console.error(`[REGISTER] DB error:`, dbErr);
    }

    return NextResponse.json(
      { success: true, userId: data.user.id },
      { status: 201 }
    );
  } catch (err) {
    console.error(`[REGISTER] Exception:`, err);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
