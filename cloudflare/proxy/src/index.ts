const UPSTREAM = "https://sola-scriptura-br.vercel.app";

function rewriteLocation(location: string | null, original: URL): string | null {
  if (!location) return null;
  try {
    const l = new URL(location);
    if (l.host === new URL(UPSTREAM).host) {
      l.host = original.host;
      l.protocol = original.protocol;
      return l.toString();
    }
  } catch {
    return location;
  }
  return location;
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const target = new URL(url.pathname + url.search, UPSTREAM);

    const headers = new Headers(request.headers);
    headers.delete("host");

    const init: RequestInit = {
      method: request.method,
      headers,
      redirect: "follow",
    };

    if (request.method !== "GET" && request.method !== "HEAD") {
      init.body = request.body;
    }

    const upstream = await fetch(target.toString(), init);

    const respHeaders = new Headers(upstream.headers);
    const rewritten = rewriteLocation(respHeaders.get("location"), url);
    if (rewritten) respHeaders.set("location", rewritten);
    respHeaders.delete("content-security-policy-report-only");

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: respHeaders,
    });
  },
};
