import { createClient } from '@supabase/supabase-js';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import type { Role } from '@prisma/client';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

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

    // Create user in Supabase
    console.log(`[REGISTER] Creating user: ${email}`);
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        name,
        role,
      },
    });

    if (error) {
      console.error(`[REGISTER] Supabase error:`, error);
      console.error(`[REGISTER] Error message:`, error.message);
      console.error(`[REGISTER] Error status:`, error.status);
      console.error(`[REGISTER] Full error:`, JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: error.message || 'Failed to create account', details: error },
        { status: 400 }
      );
    }

    if (!data.user) {
      console.error(`[REGISTER] No user returned from Supabase`);
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
      console.log(`[REGISTER] Success: ${email}`);
    } catch (dbErr) {
      console.error(`[REGISTER] Database error:`, dbErr);
      // User was created in Supabase, so we can still return success
      // but log the database error for debugging
      console.warn(`[REGISTER] Supabase user created but Prisma failed. User ${data.user.id} may have limited functionality.`);
    }

    return NextResponse.json(
      { success: true, userId: data.user.id },
      { status: 201 }
    );
  } catch (err) {
    console.error(`[REGISTER] Unexpected error:`, err);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
