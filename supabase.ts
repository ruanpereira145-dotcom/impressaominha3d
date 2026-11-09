import {env} from 'cloudflare:workers';
export const bucket='jlc-fotos';
export async function supabase(path:string, init:RequestInit={}, token?:string){
 const url=env.SUPABASE_URL, key=env.SUPABASE_PUBLISHABLE_KEY;
 if(!url||!key)throw Error('Supabase não configurado.');
 const h=new Headers(init.headers);h.set('apikey',key);if(token)h.set('Authorization','Bearer '+token);
 return fetch(url+path,{...init,headers:h,cache:'no-store',signal:init.signal||AbortSignal.timeout(20000)});
}
export async function rows(table:string,token?:string,order='created_at.asc'){
 const all:any[]=[];
 for(let offset=0;;offset+=1000){const r=await supabase(`/rest/v1/${table}?select=*&order=${order},id.asc&limit=1000&offset=${offset}`,{},token);if(!r.ok)throw Error('Falha ao carregar dados.');const page=await r.json() as any[];all.push(...page);if(page.length<1000)return all;}
}
