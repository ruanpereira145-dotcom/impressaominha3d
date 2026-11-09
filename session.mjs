export const SESSION_COOKIE='jlc_session';
// Administradores são definidos só no banco (tabela jlc_admins). Não há lista fixa no código.
export function validEmail(email){return typeof email==='string'&&email.length<=320&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());}
export function readSession(cookie){const match=(cookie||'').split(';').map(s=>s.trim()).find(s=>s.startsWith(SESSION_COOKIE+'='));const token=match?.slice(SESSION_COOKIE.length+1);return token&&/^[A-Za-z0-9._-]+$/.test(token)?token:null;}
export function sameOrigin(req){return req.headers.get('origin')===new URL(req.url).origin;}
export async function verifiedAdmin(token,request){if(!token)return null;try{const r=await request('/auth/v1/user',{},token);if(!r.ok)return null;const user=await r.json();if(!user.id||!user.email_confirmed_at)return null;const policy=await request('/rest/v1/rpc/jlc_is_admin',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'},token);if(!policy.ok||await policy.json()!==true)return null;return {email:user.email,token};}catch{return null;}}
