import {getAdmin} from './auth';
import {rows} from './supabase';
export async function isAdmin(){return !!(await getAdmin());}
export async function data(token?:string){const [collections,products]=await Promise.all([rows('jlc_collections',token),rows('jlc_products',token,'created_at.desc')]);return {collections,products:products.map(p=>({...p,starts:p.starts?new Date(p.starts).toISOString():null,ends:p.ends?new Date(p.ends).toISOString():null}))};}
