import {getAdmin} from '../../lib/auth';
import Admin from './panel';
import Login from './login';
export const dynamic='force-dynamic';
export default async function Page(){return await getAdmin()?<Admin/>:<Login/>;}
