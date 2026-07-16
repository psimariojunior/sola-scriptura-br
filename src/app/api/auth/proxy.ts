const BACKEND_URL = 'https://api.solascripturabr.com.br/api/v1';

export async function proxyToBackend(
  path: string,
  method: string,
  body?: string,
  extraHeaders?: Record<string, string>,
) {
  try {
    const res = await fetch(`${BACKEND_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...extraHeaders,
      },
      body,
      signal: AbortSignal.timeout(10000),
    });

    const data = await res.text();

    return new Response(data, {
      status: res.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch {
    return new Response(
      JSON.stringify({ message: 'Backend indisponível' }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
