# avia

App de organização de tarefas criado para me aprofundar com desenvolvimento front-end.

[⁜ Demo ⁜](https://avia.rayzaranza.com.br)

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
