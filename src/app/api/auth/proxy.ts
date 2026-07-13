const BACKEND_URL = process.env.BACKEND_URL || 'https://api-production-bb96.up.railway.app/api/v1';

export async function proxyToBackend(
  path: string,
  method: string,
  body?: string,
  headers?: Record<string, string>,
) {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body,
    signal: AbortSignal.timeout(30000),
  });

  const data = await res.text();

  return new Response(data, {
    status: res.status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
