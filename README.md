# agents-101

Repo de la charla **"Agentes en Acción: Fundamentos, MCP y Código"** (español, code-first).

El código de la demo: un asistente de Google Calendar hecho con **Mastra**, MCP y Gemini.

- 🤖 [`/agent`](./agent) — asistente de Google Calendar.
  Lista tus reuniones, detecta huecos libres y agenda en lenguaje natural.

> El agente usa la API de **Google AI Studio** (Gemini) y se conecta a tu Google Calendar vía un MCP server de la comunidad. Cada quien trae sus propias credenciales.

---

## Prerequisites

- **Node 20+** (mirá `.nvmrc`)
- **npm** o pnpm
- Una **API key de Google AI Studio** (gratis) → [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
- Una **cuenta de Google con Calendar** + credenciales OAuth (5 min de setup, ver abajo)

---

## Quick start (5 min)

```bash
# 1. cloná el repo
git clone https://github.com/tu-usuario/agents-101.git
cd agents-101

# 2. instalá deps del agente
cd agent
npm install
cp .env.example .env
# editá .env y pegá tu GOOGLE_GENERATIVE_AI_API_KEY
```

Para correr el agente necesitás además configurar OAuth de Google Calendar — ver siguiente sección.

---

## API key de Google AI Studio

1. Entrá a [aistudio.google.com/apikey](https://aistudio.google.com/apikey) (necesitás una cuenta de Google).
2. Click en **"Create API key"** → elegí o creá un proyecto de Google Cloud → copiá la key.
3. Google AI Studio tiene un **free tier generoso** para Gemini 2.5 Flash — perfecto para la demo.
4. Pegá la key en `agent/.env`:

   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=AIzaSy...
   ```

> 💡 Si vas a usar también el OAuth de Google Calendar (sección siguiente), podés reutilizar el mismo proyecto de Google Cloud para ambas cosas.

---

## Configurar Google Calendar OAuth

Esta es la parte más fricciosa, pero es **una sola vez**.

1. Entrá a [console.cloud.google.com](https://console.cloud.google.com/) y creá un proyecto (o usá uno existente).
2. **Habilitá Google Calendar API**: APIs y servicios → Biblioteca → buscar "Google Calendar API" → Habilitar.
3. **Pantalla de consentimiento OAuth**: configurala como "External" en modo *Testing*, completá los campos básicos. Agregá tu email en *Test users*. Scopes: `.../auth/calendar` y `.../auth/calendar.events`.
4. **Crear credenciales OAuth**: APIs y servicios → Credenciales → Crear credenciales → **OAuth client ID** → tipo **"Desktop app"**.
5. Bajá el JSON, renombralo a `gcp-oauth.keys.json` y dejalo en la raíz de `/agent/`.
6. La primera vez que corras `npm run agent`, se abrirá el browser para autorizar. Los tokens quedan cacheados localmente.

> ⚠️ La app en modo *Testing* expira los tokens cada 7 días. Si vas a usar esto seguido, pasala a *Production* en la pantalla de consentimiento.

---

## Correr el agente

**Modo terminal (recomendado, único soportado):**

```bash
cd agent
npm run agent
```

CLI interactiva con streaming, memoria persistente y mensajes de error legibles. Probá:

- `qué tengo hoy?`
- `cuándo tengo un hueco de 30 min mañana?`
- `agendame 1:1 con Juan el viernes a las 10am`

> El script `npm run dev` (Mastra Studio web en `localhost:4111`) está incluido pero **no se mantiene activamente** — el Studio tiene bugs conocidos con MCP servers en stdio que pueden colgar la UI. Si lo querés probar como bonus, adelante; para uso real (incluida la demo de la charla) usá `npm run agent`.

---

## Estructura del repo

```
agents-101/
└── agent/                             # proyecto Mastra
    └── src/
        ├── cli.ts                     # entrypoint interactivo
        └── mastra/
            ├── index.ts               # registro del agent
            ├── env.ts                 # carga .env con búsqueda upward
            ├── model.ts               # provider Gemini
            ├── agents/                # briefingAgent (único)
            ├── tools/                 # findFreeSlot (tool custom)
            └── mcp/                   # config del MCP de Google Calendar
```

---

## Troubleshooting

| Síntoma | Causa probable | Solución |
|---|---|---|
| `GOOGLE_GENERATIVE_AI_API_KEY missing` | falta `.env` | `cp .env.example .env` y pegá tu key |
| MCP server no arranca / cuelga | `npx` descargando paquete | esperá 30s la primera vez; o `npm i -g @cocal/google-calendar-mcp` |
| `invalid_grant` o `token expired` | OAuth expiró | borrá `.gcp-saved-tokens.json` y re-autorizá; pasá la app a *Production* |
| El agente "alucina" eventos | no encontró el MCP | revisá que `gcp-oauth.keys.json` exista y sea válido |
| Rate limit de Google AI | free tier saturado | bajá la frecuencia de prompts o pasá a `gemini-2.0-flash` (límites más altos) |

---

## Recursos

- 📘 [Mastra docs](https://mastra.ai/docs)
- 🔌 [MCP spec](https://modelcontextprotocol.io)
- 🗓 [google-calendar-mcp (nspady)](https://github.com/nspady/google-calendar-mcp)
- 🤖 [Google AI Studio](https://aistudio.google.com/apikey)

---

## Licencia

MIT. Hacé lo que quieras con el código.
