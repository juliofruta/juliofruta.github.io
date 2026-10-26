// POST /api/subscribe  { email }  -> saves the email in D1 (binding: DB)
const ALLOWED_ORIGINS = [
  /^https:\/\/((www|dev)\.)?juliofruta\.com$/,
  /^https:\/\/([a-z0-9-]+\.)?juliofruta\.pages\.dev$/,
  /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/,
];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cors(request) {
  const origin = request.headers.get('Origin') || '';
  if (!ALLOWED_ORIGINS.some(re => re.test(origin))) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };
}

function json(request, status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors(request) },
  });
}

export const onRequestOptions = ({ request }) =>
  new Response(null, { status: 204, headers: cors(request) });

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json(request, 400, { error: 'Invalid request.' });
  }

  // Honeypot: real people never fill the hidden "company" field.
  if (body.company) return json(request, 200, { ok: true });

  const email = String(body.email || '').trim().toLowerCase();
  if (email.length > 254 || !EMAIL.test(email)) {
    return json(request, 400, { error: 'That email doesn’t look right.' });
  }

  const source = new URL(request.headers.get('Origin') || request.url).hostname;
  const result = await env.DB.prepare(
    'INSERT OR IGNORE INTO subscribers (email, source, user_agent, country) VALUES (?, ?, ?, ?)'
  )
    .bind(email, source, (request.headers.get('User-Agent') || '').slice(0, 300), request.cf?.country || null)
    .run();

  return json(request, 200, { ok: true, already: result.meta.changes === 0, env: env.ENVIRONMENT });
}
