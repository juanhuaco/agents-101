# /agent

Asistente personal de Google Calendar construido con [Mastra](https://mastra.ai), [Gemini](https://ai.google.dev/) (vía Google AI Studio) y el MCP server de [@cocal/google-calendar-mcp](https://github.com/nspady/google-calendar-mcp).

Hace tres cosas:

1. **Lista** tu agenda ("qué tengo hoy/esta semana") con resumen de focus time y conflictos.
2. **Encuentra huecos libres** con la tool custom `findFreeSlot`.
3. **Crea reuniones** en lenguaje natural, con confirmación explícita antes de tocar el calendario.

Internamente son **dos agentes** colaborando vía workflow con handoff:

- `briefingAgent` — lee y razona, no escribe.
- `schedulerAgent` — crea eventos, pide confirmación.

---

## Setup rápido

```bash
npm install
cp .env.example .env
# editar .env → GOOGLE_AI_API_KEY=AIzaSy...
# poner gcp-oauth.keys.json (ver README raíz)
npm run agent
```

Ver el [README raíz](../README.md) para el detalle de cómo conseguir la API key de Google AI Studio y el OAuth de Calendar.

---

## Scripts

| Script | Qué hace |
|---|---|
| `npm run agent` | CLI interactiva (stdin → agente). **Default para la demo.** |
| `npm run dev`   | Mastra playground en web (puerto 4111 por default). |
| `npm run build` | Build de producción. |
| `npm run typecheck` | `tsc --noEmit`. |

---

## Estructura

```
src/
├── cli.ts                       # entrypoint con readline
└── mastra/
    ├── index.ts                 # registro de agents y workflows
    ├── agents/
    │   ├── briefing-agent.ts    # lee, resume, sugiere huecos
    │   └── scheduler-agent.ts   # crea eventos con confirmación
    ├── tools/
    │   └── find-free-slot.ts    # tool custom: gap-finding
    ├── mcp/
    │   └── google-calendar.ts   # MCPClient → @cocal/google-calendar-mcp
    └── workflows/
        └── daily-briefing.ts    # briefing → (handoff) → scheduler
```

---

## Modelo

Por default usa `gemini-2.5-flash` (rápido y económico). Para overridear:

```bash
MODEL_ID=gemini-2.5-pro npm run agent
```

Opciones recomendadas:
- `gemini-2.5-flash` (default) — rápido, ideal para demo en vivo
- `gemini-2.5-pro` — más capaz, más lento
- `gemini-2.0-flash` — alternativa con límites de rate más altos

---

## Probar sin Google Calendar

Si no querés configurar OAuth todavía, podés correr el agente sin el MCP — va a responder pero sin acceso al calendario:

```bash
# comentá temporalmente el spread de calendarMcp.getTools() en briefing-agent.ts
npm run agent
```

(O usar la branch `demo-fallback` cuando esté lista, con tools mockeadas.)
