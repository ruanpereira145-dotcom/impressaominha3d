import {supabase,bucket} from '../../../lib/supabase';
import {getAdmin} from '../../../lib/auth';
export async function GET(req:Request,{params}:{params:Promise<{key:string}>}){try{
 const {key}=await params;if(!/^[a-f0-9-]{36}$/.test(key))return new Response(null,{status:404});
 const path='/storage/v1/object/'+bucket+'/'+key;
 // Public catalog photos do not need two additional admin-auth calls.
 let r=await supabase(path),restricted=false;
 if(!r.ok){const admin=await getAdmin();if(!admin)return new Response(null,{status:[400,403,404].includes(r.status)?404:503});restricted=true;r=await supabase(path,{},admin.token);}
 if(!r.ok)return new Response(null,{status:[400,403,404].includes(r.status)?404:503});
 const headers=new Headers({'Content-Type':r.headers.get('Content-Type')||'image/jpeg','Cache-Control':restricted?'private, no-store':'private, max-age=3600','X-Content-Type-Options':'nosniff'});
 const etag=r.headers.get('etag');if(etag)headers.set('ETag',etag);
 if(!restricted&&etag&&req.headers.get('if-none-match')===etag){await r.body?.cancel();return new Response(null,{status:304,headers});}
 return new Response(r.body,{headers});
 }catch{return new Response(null,{status:503});}}
