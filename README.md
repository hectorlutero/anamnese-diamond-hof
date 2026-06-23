# Anamnese Diamond HOF

Formulário de anamnese digital para **Diamond HOF — Estética Integrada Premium**.

## Stack

- Next.js 16 (App Router)
- Tailwind CSS 4
- Nodemailer (Gmail SMTP)

## Desenvolvimento

```bash
npm install
cp .env.example .env.local
# Configure SMTP_USER e SMTP_PASS em .env.local
npm run dev
```

## Variáveis de ambiente

| Variável    | Descrição                          |
|-------------|------------------------------------|
| `SMTP_USER` | Conta Gmail de envio               |
| `SMTP_PASS` | Senha de app do Gmail              |
| `EMAIL_TO`  | E-mail destino (padrão: dras.diamondhof@gmail.com) |

## Deploy

Hospedado em [anamnese-diamond-hof.vercel.app](https://anamnese-diamond-hof.vercel.app)
