# Impressão Minha Curitiba — site no modelo Bugou + catálogo (Cloudflare Workers + Supabase)

Página inicial no mesmo modelo do site da Bugou, com os dados da Impressão Minha Curitiba. Catálogo, pedido pelo WhatsApp e painel `/admin` funcionando como na JLC.

## Dados da loja
Tudo fica em `lib/loja.ts`: nome, WhatsApp (41) 98498-8821, Instagram @impressaominhacuritiba, Curitiba-PR, endereço, textos, números, depoimento, crédito (@next_sites014) e logo. Campos vazios escondem o bloco.

## Imagens (pasta public/bonecos)
| Arquivo | Onde aparece |
|---|---|
| hero-bugou.png | arte do topo (paisagem, ~1300 x 800) |
| anime-float-blonde-cutout.png | "Nada de prateleira pronta", à esquerda |
| anime-float-purple-cutout.png | mesma seção, à direita (já incluída) |
| anime-float-hero-cutout.png | abaixo dos três passos, menor |
| printing-desk-organizer-cutout.png | cartão "Por que criar" (já incluída) |
| mikey-figure-cutout.png, zoro-figure-cutout.png, sukuna-yuji-figure-cutout.png | "Quem já criou com a gente" |

Todas em PNG (fundo transparente, exceto a do topo), até ~500 KB cada. Os nomes e caminhos ficam em `lib/loja.ts`.

## Fontes (pasta public/fonts)
Copie `bugou-display.ttf` e `bugou-tech.ttf` (as mesmas do modelo) para `public/fonts`.

## Cloudflare (Workers > impressaominha3d > Settings > Builds)
Build command: `npm run build` · Deploy command: `npm run deploy` · Root directory: `/`

## Banco
`wrangler.jsonc` aponta para o banco de demonstração. Para a Impressão Minha Curitiba ter o próprio banco, troque `SUPABASE_URL` e `SUPABASE_PUBLISHABLE_KEY`, rode `supabase/01-jlc-estrutura.sql` e cadastre os administradores na tabela `jlc_admins` (o acesso é validado só pelo banco).

---
