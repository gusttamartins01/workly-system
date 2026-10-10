# Workly

## Chat Workly AI no Vercel

O projeto publica o chat como uma Vercel Function em `api/chat.ts`. A chave da
Groq é lida no servidor por `server/chat.ts` e não deve ser exposta ao navegador.

No projeto da Vercel:

1. Abra **Settings → Environment Variables**.
2. Adicione `GROQ_API_KEY` com a chave da Groq, nos ambientes em que fará deploy.
3. Opcionalmente, configure `GROQ_MODEL` com um modelo habilitado na sua conta.
4. Faça um novo deploy para aplicar as variáveis.

Não use o prefixo `VITE_` na chave. Variáveis `VITE_` são incorporadas ao
frontend e podem ficar visíveis aos usuários.

O frontend chama `/api/chat`. No Vercel, essa rota é atendida automaticamente
pela função em `api/chat.ts`; em desenvolvimento local, o Vite encaminha a rota
ao servidor `server/index.ts`.

Para desenvolver localmente, configure `GROQ_API_KEY` em `.env` e execute
`npm run server` e `npm run dev` em terminais separados.
