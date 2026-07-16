const UPSTREAM = "https://sola-scriptura-br.vercel.app";
const API_BASE = "https://api.solascripturabr.com.br/api/v1";

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

    if (url.pathname === "/api/auth/google" || url.pathname === "/api/auth/google/callback") {
      const backendPath = url.pathname.replace("/api", "");
      return Response.redirect(`${API_BASE}${backendPath}${url.search}`, 302);
    }

    if (url.pathname === "/api/auth/apple") {
      return Response.redirect(`${API_BASE}/auth/apple${url.search}`, 302);
    }

    const target = new URL(url.pathname + url.search, UPSTREAM);

    const headers = new Headers(request.headers);
    headers.delete("host");

    const init: RequestInit = {
      method: request.method,
      headers,
      redirect: "manual",
    };

    if (request.method !== "GET" && request.method !== "HEAD") {
      init.body = request.body;
    }

    const upstream = await fetch(target.toString(), init);

    const respHeaders = new Headers(upstream.headers);
    respHeaders.delete("content-security-policy");
    respHeaders.delete("content-security-policy-report-only");
    respHeaders.delete("x-content-security-policy");
    respHeaders.delete("x-frame-options");
    respHeaders.delete("x-xss-protection");

    respHeaders.set("cache-control", "no-store, no-cache, must-revalidate, max-age=0");
    respHeaders.set("pragma", "no-cache");
    respHeaders.delete("etag");
    respHeaders.delete("cf-cache-status");

    if (upstream.status >= 300 && upstream.status < 400) {
      const location = respHeaders.get("location");
      const rewritten = rewriteLocation(location, url);
      if (rewritten) respHeaders.set("location", rewritten);
    }

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: respHeaders,
    });
  },
};
