/**
 * Cloudflare Pages Function: /cal-api/*
 * Proxies requests to api.cal.com with proper v2 auth headers.
 * CAL_API_KEY must be set in Cloudflare Pages dashboard env vars.
 */
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const calPath = url.pathname.replace("/cal-api", "");

  // In production, the API key comes from server env.
  // The client passes it as a query param during dev (Vite proxy handles CORS).
  const apiKey = env.CAL_API_KEY || url.searchParams.get("apiKey");

  // Strip apiKey from the forwarded URL (don't leak it to Cal.com as a query param)
  url.searchParams.delete("apiKey");
  const calUrl = `https://api.cal.com${calPath}${url.search}`;

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
  };

  // Determine the correct cal-api-version based on the endpoint
  if (calPath.startsWith("/v2/bookings")) {
    headers["cal-api-version"] = "2026-02-25";
  } else if (calPath.startsWith("/v2/slots")) {
    headers["cal-api-version"] = "2024-09-04";
  }

  const init = { method: request.method, headers };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.text();
  }

  const response = await fetch(calUrl, init);
  const body = await response.text();

  return new Response(body, {
    status: response.status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
