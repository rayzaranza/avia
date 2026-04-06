![banner](.github/assets/banner.svg)

# fazfaz

App de organização de tarefas criado para me aprofundar com desenvolvimento front-end.

[⁜ Demo ⁜](https://fazfaz.rayzaranza-cloudflare-0ba.workers.dev)

## Stack

- React 19
- TanStack Router
- Supabase
- Tailwind + tokens próprios
- Vitest e Testing Library
- Cloudflare

## Rodando localmente

Precisa de um projeto Supabase com GitHub OAuth configurado.

Crie o arquivo `.env.local` com:

```env
VITE_SUPABASE_URL=seu_url
VITE_SUPABASE_KEY=sua_chave
```

```bash
pnpm install
pnpm dev
```
