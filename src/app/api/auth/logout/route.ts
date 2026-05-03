import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();
  
  // Remove session cookies
  cookieStore.delete('sb-access-token');
  cookieStore.delete('sb-refresh-token');
  
  // Redirect to login
  return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'), {
    status: 302,
  });
}
