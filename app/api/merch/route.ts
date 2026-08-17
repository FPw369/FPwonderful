import { NextResponse } from 'next/server';
import { fetchPrintifyProducts } from '@/lib/printify';

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
