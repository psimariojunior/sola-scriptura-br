import { NextResponse } from 'next/server';
import { getLLMConfig } from '@/lib/llm-config';

export const runtime = 'nodejs';

export async function GET() {
  const config = getLLMConfig();
  return NextResponse.json({
    hasKey: !!config.apiKey,
    keyLen: config.apiKey.length,
    keyPrefix: config.apiKey.substring(0, 8),
    baseUrl: config.baseUrl,
    model: config.model,
  });
}
