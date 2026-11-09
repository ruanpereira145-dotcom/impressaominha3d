import {headers} from 'next/headers';
import {supabase} from './supabase';
import {readSession,verifiedAdmin} from './session.mjs';
export async function getAdmin(){const h=await headers();return verifiedAdmin(readSession(h.get('cookie')),supabase);}
