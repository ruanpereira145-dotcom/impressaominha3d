-- Execute no SQL Editor do novo projeto Supabase da JLC.
-- Cria apenas recursos prefixados jlc_; não altera tabelas da Dallas.
begin;
create table if not exists public.jlc_admins (
 user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.jlc_admins enable row level security;
revoke all on public.jlc_admins from anon, authenticated;
grant select on public.jlc_admins to authenticated;
drop policy if exists jlc_admin_self on public.jlc_admins;
create policy jlc_admin_self on public.jlc_admins for select to authenticated using(user_id=(select auth.uid()));
create or replace function public.jlc_is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
 select exists(select 1 from public.jlc_admins where user_id=(select auth.uid()));
$$;
revoke all on function public.jlc_is_admin() from public;
grant execute on function public.jlc_is_admin() to anon,authenticated;
create table if not exists public.jlc_collections (
 id uuid primary key default gen_random_uuid(),
 name text not null check(length(name) between 1 and 100),
 description text not null default '',active boolean not null default true,
 cover text,created_at timestamptz not null default now(),
 constraint jlc_collection_cover check(cover is null or cover ~ '^/media/[a-f0-9-]{36}$')
);
create table if not exists public.jlc_products (
 id uuid primary key default gen_random_uuid(),
 collection_id uuid not null references public.jlc_collections(id) on delete restrict,
 name text not null check(length(name) between 1 and 150),
 description text not null default '',price integer not null check(price>=0 and price<=100000000),
 available boolean not null default true,personalizable boolean not null default false,
 starts timestamptz,ends timestamptz,images jsonb not null default '[]'::jsonb,
 created_at timestamptz not null default now(),
 constraint jlc_product_period check(starts is null or ends is null or starts<=ends),
 constraint jlc_product_images check(jsonb_typeof(images)='array' and jsonb_array_length(images)<=8)
);
create index if not exists jlc_products_collection_idx on public.jlc_products(collection_id);
alter table public.jlc_collections enable row level security;
alter table public.jlc_products enable row level security;
grant select on public.jlc_collections,public.jlc_products to anon,authenticated;
grant insert,update,delete on public.jlc_collections,public.jlc_products to authenticated;
drop policy if exists jlc_collections_read on public.jlc_collections;
create policy jlc_collections_read on public.jlc_collections for select to anon,authenticated using(active or (select public.jlc_is_admin()));
drop policy if exists jlc_collections_write on public.jlc_collections;
create policy jlc_collections_write on public.jlc_collections for all to authenticated using((select public.jlc_is_admin())) with check((select public.jlc_is_admin()));
drop policy if exists jlc_products_read on public.jlc_products;
create policy jlc_products_read on public.jlc_products for select to anon,authenticated using((select public.jlc_is_admin()) or exists(select 1 from public.jlc_collections c where c.id=collection_id and c.active));
drop policy if exists jlc_products_write on public.jlc_products;
create policy jlc_products_write on public.jlc_products for all to authenticated using((select public.jlc_is_admin())) with check((select public.jlc_is_admin()));
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('jlc-fotos','jlc-fotos',false,5242880,array['image/jpeg','image/png','image/webp'])
on conflict(id) do nothing;
drop policy if exists jlc_media_read on storage.objects;
create policy jlc_media_read on storage.objects for select to anon,authenticated using (
 bucket_id='jlc-fotos' and (
 (select public.jlc_is_admin()) or
 exists(select 1 from public.jlc_collections c where c.active and c.cover='/media/'||storage.objects.name) or
 exists(select 1 from public.jlc_products p join public.jlc_collections c on c.id=p.collection_id where c.active and p.images ? ('/media/'||storage.objects.name))
 ));
drop policy if exists jlc_media_insert on storage.objects;
create policy jlc_media_insert on storage.objects for insert to authenticated with check(bucket_id='jlc-fotos' and (select public.jlc_is_admin()));
-- Autoriza somente as contas abaixo se já existirem em Authentication > Users.
-- Nenhuma senha é criada ou alterada por este SQL.
insert into public.jlc_admins(user_id)
 select id from auth.users where lower(email) in ('ruanpereira145@gmail.com') and email_confirmed_at is not null
on conflict do nothing;
commit;
-- Confirme se retornam usuários; se não, crie/confirme a conta e execute novamente:
select u.email from public.jlc_admins a join auth.users u on u.id=a.user_id;
