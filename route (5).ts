import {publicCatalog,invalidatePublicCatalog} from '../../../lib/public-catalog';
import {getAdmin} from '../../../lib/auth';
import {supabase} from '../../../lib/supabase';
import {sameOrigin} from '../../../lib/session.mjs';
export async function GET(){try{return Response.json(await publicCatalog(),{headers:{'Cache-Control':'no-store'}});}catch{return Response.json({error:'Não foi possível carregar o catálogo. Tente novamente.'},{status:503});}}
export async function POST(req:Request){const admin=await getAdmin();if(!admin||!sameOrigin(req))return Response.json({error:'Sessão encerrada ou acesso restrito. Entre novamente no painel.'},{status:403});try{
 const b:any=await req.json();const id=b.id||crypto.randomUUID();if(typeof id!=='string'||!/^[a-f0-9-]{36}$/.test(id))throw Error();let table:string,payload:any;
 if(b.type==='collection'){if(typeof b.name!=='string'||!b.name.trim()||b.name.length>100||typeof b.active!=='boolean')throw Error();table='jlc_collections';if(b.cover&&!(typeof b.cover==='string'&&/^\/media\/[a-f0-9-]{36}$/.test(b.cover)))throw Error();payload={id,cover:b.cover||null,name:b.name.trim(),description:String(b.description||'').slice(0,1000),active:b.active};}
 else if(b.type==='product'){
 if(typeof b.name!=='string'||!b.name.trim()||b.name.length>150||!Number.isSafeInteger(b.price)||b.price<0||b.price>100000000||typeof b.available!=='boolean'||!Array.isArray(b.images)||b.images.length>8||b.images.some((x:any)=>typeof x!=='string'||!/^\/media\/[a-f0-9-]{36}$/.test(x)))throw Error();
 for(const t of [b.starts,b.ends])if(t&&(typeof t!=='string'||!Number.isFinite(Date.parse(t))))throw Error();if(b.starts&&b.ends&&Date.parse(b.starts)>Date.parse(b.ends))throw Error();
 table='jlc_products';if(typeof b.personalizable!=='undefined'&&typeof b.personalizable!=='boolean')throw Error();payload={id,personalizable:!!b.personalizable,collection_id:b.collection_id,name:b.name.trim(),description:String(b.description||'').slice(0,3000),price:b.price,available:b.available,starts:b.starts||null,ends:b.ends||null,images:b.images};
 }else throw Error();
 const r=await supabase('/rest/v1/'+table+'?on_conflict=id',{method:'POST',headers:{'Content-Type':'application/json',Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify(payload)},admin.token);if(!r.ok)throw Error();invalidatePublicCatalog();return Response.json({id});
 }catch{return Response.json({error:'Não foi possível guardar. Verifique os campos e tente novamente.'},{status:400});}}

export async function DELETE(req:Request){
 const admin=await getAdmin();if(!admin||!sameOrigin(req))return Response.json({error:'Acesso restrito. Entre novamente no painel.'},{status:403});
 try{const b:any=await req.json();if(!['product','collection'].includes(b.type)||typeof b.id!=='string'||!/^[a-f0-9-]{36}$/.test(b.id))return Response.json({error:'Pedido de exclusão inválido.'},{status:400});
 if(b.type==='collection'){const check=await supabase('/rest/v1/jlc_products?select=id&collection_id=eq.'+encodeURIComponent(b.id)+'&limit=1',{},admin.token);if(!check.ok)throw Error();const children=await check.json() as any[];if(children.length)return Response.json({error:'Mova ou exclua os produtos deste catálogo antes de excluí-lo.'},{status:409});}
 const table=b.type==='product'?'jlc_products':'jlc_collections';const r=await supabase('/rest/v1/'+table+'?id=eq.'+encodeURIComponent(b.id),{method:'DELETE',headers:{Prefer:'return=representation'}},admin.token);
 if(!r.ok){if(r.status===409)return Response.json({error:'Este catálogo ainda contém produtos. Atualize o painel e tente novamente.'},{status:409});throw Error();}const deleted=await r.json() as any[];if(!deleted.length)return Response.json({error:'Este item já não existe. Atualize o painel.'},{status:404});invalidatePublicCatalog();return Response.json({deleted:b.id});
 }catch{return Response.json({error:'Não foi possível excluir. Tente novamente.'},{status:503});}
}
