import { NextResponse } from 'next/server';
import { fetchPrintifyProducts } from '@/lib/printify';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const data = await fetchPrintifyProducts();
    return NextResponse.json(data);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json(
      { error: errorMsg },
      { status: 500 }
    );
  }
}
