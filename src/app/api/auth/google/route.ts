import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'https://sola-scriptura-backend.onrender.com/api/v1';

export async function GET() {
  return NextResponse.redirect(`${BACKEND_URL}/auth/google`, { status: 307 });
}
