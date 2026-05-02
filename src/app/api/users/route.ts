import { NextResponse } from 'next/server';
import { mockUsers } from '@/features/users/mock-data';

export async function GET() {
  return NextResponse.json(mockUsers);
}
