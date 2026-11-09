import test from 'node:test';
import assert from 'node:assert/strict';
import {readSession,sameOrigin,verifiedAdmin,validEmail} from '../lib/session.mjs';
const good={id:'verified-id',email:'ruanpereira145@gmail.com',email_confirmed_at:'2026-10-05'};
function api(user=good,policy=true){return async(path)=>Response.json(path==='/auth/v1/user'?user:policy);}
test('no token cannot authorize',async()=>{assert.equal(await verifiedAdmin(null,()=>{throw Error('should not fetch');}),null);});
test('identity headers cannot replace verified session',()=>{assert.equal(readSession('email=ruanpereira145@gmail.com'),null);assert.equal(readSession('jlc_session=bad token'),null);assert.equal(readSession('other=a; jlc_session=abc.def.ghi'),'abc.def.ghi');});
test('only confirmed user listed as admin in the database can authorize',async()=>{assert.ok(await verifiedAdmin('token',api()));assert.ok(await verifiedAdmin('token',api({...good,email:'novo.admin@example.com'})));assert.equal(await verifiedAdmin('token',api({...good,email:'visitor@example.com'},false)),null);assert.equal(await verifiedAdmin('token',api({...good,email_confirmed_at:null})),null);assert.equal(await verifiedAdmin('token',api(good,false)),null);});
test('forged or revoked token is rejected',async()=>{assert.equal(await verifiedAdmin('forged',async()=>new Response(null,{status:401})),null);});
test('network failure denies access',async()=>{assert.equal(await verifiedAdmin('token',async()=>{throw Error('offline');}),null);});
test('cross-site writes rejected',()=>{assert.equal(sameOrigin(new Request('https://catalog.example/admin/api/session',{method:'POST',headers:{origin:'https://evil.example'}})),false);assert.equal(sameOrigin(new Request('https://catalog.example/admin/api/session',{method:'POST'})),false);assert.equal(sameOrigin(new Request('https://catalog.example/admin/api/session',{method:'POST',headers:{origin:'https://catalog.example'}})),true);});
test('email format is checked before login',()=>{assert.equal(validEmail('jefferson.lazaro.correia@gmail.com'),true);assert.equal(validEmail(' ruanpereira145@gmail.com '),true);for(const v of ['','semarroba','a@b',null,123,'x'.repeat(330)+'@a.com'])assert.equal(validEmail(v),false);});
