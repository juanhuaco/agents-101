---
theme: seriph
title: AI Agents & MCP para Devs
info: |
  Charla sobre AI agents, MCP y Mastra — 45 minutos.
  Folder IT · 2026
class: cover-slide
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
transition: fade
mdc: true
fonts:
  sans: Raleway
  mono: JetBrains Mono
---

<div class="cover-tag cover-tag-one-world">ONE WORLD</div>
<div class="cover-tag cover-tag-comment">/**</div>
<div class="cover-tag cover-tag-usa">USA</div>
<div class="cover-tag cover-tag-expand">EXPAND</div>
<div class="cover-tag cover-tag-welcome">WELCOME</div>

<div class="flex flex-col items-center justify-center h-full text-center">
  <div class="text-sm opacity-60 mb-4 tracking-[0.3em] uppercase">Folder IT · Software Development Team</div>
  <h1 class="!text-6xl !font-black !mb-2">"AI Agents & MCP"</h1>
  <div class="text-2xl font-light opacity-90 mt-2">De chatbot a agente, en código.</div>
  <div class="mt-12 text-sm opacity-70 font-mono">Mayo 2026 · Juan Huaco · 45 min</div>
</div>

<!--
Bienvenida. Confirmar: slides se ven, terminal lista, MCP cacheado y respondiendo.
Tres ventanas: slides (presenter mode con P), CLI del agente, browser en calendar.google.com.
-->

---
layout: section
class: divider-slide
---

<div class="absolute top-12 left-12 font-mono text-xs opacity-50 tracking-widest">/ 01</div>

# El problema

<div class="text-xl opacity-70 mt-4">Por qué un LLM solo no alcanza</div>

<div class="slide-footer">
  <span>folder it · agents & mcp</span>
  <span>5 min</span>
</div>

---

## Pedile esto a ChatGPT

<v-clicks>

> *"Agendame 30 min con María mañana sobre el deploy, después de que termine mi 1:1."*

- 🚫 No sabe qué tenés en el calendario
- 🚫 No conoce a María ni tiene su mail
- 🚫 No puede crear el evento
- 🚫 No se acuerda si lo charlaste ayer

</v-clicks>

<div class="slide-footer">
  <span>01 · el problema</span>
  <span>folder it</span>
</div>

<!--
El hook. Cualquiera entiende la frustración.
Resaltar: el LLM puede *redactar* la invitación, pero no puede *actuar*.
-->

---

## De responder a hacer

<div class="grid grid-cols-2 gap-8 pt-4">

<div>

### Chatbot

- Recibe texto
- Devuelve texto
- Sin memoria entre conversaciones
- Sin acceso a tus sistemas

</div>

<div>

### Agente

- Recibe **intent**
- Devuelve **acciones**
- Memoria persistente
- Tools que llaman a APIs reales

</div>

</div>

<div class="pt-8 text-sm opacity-60">
En el último AI Insight hablamos de n8n. Hoy bajamos un nivel: <strong>code-first</strong>.
</div>

<div class="slide-footer">
  <span>01 · el problema</span>
  <span>folder it</span>
</div>

---

## Por qué ahora

<v-clicks>

- Modelos lo suficientemente buenos para razonar sobre tools (Gemini 2.5, Claude 4.x, GPT-4.x)
- Frameworks maduros: **Mastra**, LangGraph, OpenAI Agents SDK
- **MCP** (nov 2024) está terminando de estandarizar las integraciones
- El costo por interacción bajó **10×–100×** en 18 meses

</v-clicks>

<div class="slide-footer">
  <span>01 · el problema</span>
  <span>folder it</span>
</div>

<!--
No es hype: en 2024 era difícil hacer un agente confiable. En 2026 es accesible.
-->

---
layout: section
class: divider-slide
---

<div class="absolute top-12 left-12 font-mono text-xs opacity-50 tracking-widest">/ 02</div>

# ¿Qué es un agente?

<div class="text-xl opacity-70 mt-4">Loop, tools, memoria</div>

<div class="slide-footer">
  <span>folder it · agents & mcp</span>
  <span>10 min</span>
</div>

---

## El loop

<div class="text-center pt-8 text-3xl font-bold tracking-tight">

Percibir <span class="text-orange-400">→</span> Razonar <span class="text-orange-400">→</span> Actuar <span class="text-orange-400">→</span> Observar <span class="text-orange-400">→</span> ...

</div>

<v-clicks>

<div class="pt-12 grid grid-cols-4 gap-4 text-sm">

<div class="border-l-2 border-orange-500 pl-3">
<strong class="text-orange-400">Percibir</strong><br>
<span class="opacity-70">Recibe input (texto, evento, schedule)</span>
</div>

<div class="border-l-2 border-orange-500 pl-3">
<strong class="text-orange-400">Razonar</strong><br>
<span class="opacity-70">LLM decide qué hacer</span>
</div>

<div class="border-l-2 border-orange-500 pl-3">
<strong class="text-orange-400">Actuar</strong><br>
<span class="opacity-70">Llama una tool</span>
</div>

<div class="border-l-2 border-orange-500 pl-3">
<strong class="text-orange-400">Observar</strong><br>
<span class="opacity-70">Lee el resultado y vuelve a razonar</span>
</div>

</div>

</v-clicks>

<div class="slide-footer">
  <span>02 · qué es un agente</span>
  <span>folder it</span>
</div>

<!--
El loop es la idea más importante del bloque.
Insistir: el agente no es magia, es un while que termina cuando el LLM dice "listo".
-->

---

## Los componentes

<div class="grid grid-cols-2 gap-6 pt-4">

<div>

### 🧠 LLM
El motor de razonamiento. Decide qué hacer.

### 🔧 Tools
Funciones que el agente puede invocar. Tu API, una DB, un servicio externo.

</div>

<div>

### 💾 Memory
Lo que el agente recuerda entre turnos y conversaciones.

### 📜 System Prompt
Las reglas, el rol, el tono. **El leak de Claude Code mostró que importa MUCHO.**

</div>

</div>

<div class="slide-footer">
  <span>02 · qué es un agente</span>
  <span>folder it</span>
</div>

<!--
Mención: Claude Code leak fue revelador. Buenas instrucciones > más parámetros.
-->

---

## Estrategias de memoria

<div class="grid grid-cols-3 gap-4 pt-6 text-sm">

<div class="border border-orange-500/30 rounded-lg p-4">

### Working
La conversación actual. Token window del LLM.

</div>

<div class="border border-orange-500/30 rounded-lg p-4">

### Semantic
Embeddings + vector DB. *"Recordá cosas parecidas a esto."*

</div>

<div class="border border-orange-500/30 rounded-lg p-4">

### Resource
Persistente, por usuario/thread. SQL/KV.

</div>

</div>

<div class="pt-12 text-center text-lg opacity-80">
En Mastra es una sola abstracción: <code>Memory({ storage })</code>.
</div>

<div class="slide-footer">
  <span>02 · qué es un agente</span>
  <span>folder it</span>
</div>

---

## Single-agent vs Multi-agent

<div class="grid grid-cols-2 gap-8 pt-4">

<div>

### Un solo agente
Una "persona", muchas tools.

<div class="opacity-70 mt-2">Simple, debuggable, suficiente para 80% de los casos.</div>

</div>

<div>

### Workflow multi-agente
Varios agentes especializados, coordinados.

<div class="opacity-70 mt-2"><strong>Handoff</strong> = un agente le pasa el control a otro.</div>

</div>

</div>

<div class="pt-12 text-center text-lg italic opacity-90">
🧑‍💼 El agente es el <strong>empleado</strong>. El workflow es el <strong>proceso de empresa</strong>.
</div>

<div class="slide-footer">
  <span>02 · qué es un agente</span>
  <span>folder it</span>
</div>

---
layout: section
class: divider-slide
---

<div class="absolute top-12 left-12 font-mono text-xs opacity-50 tracking-widest">/ 03</div>

# MCP

<div class="text-xl opacity-70 mt-4">Model Context Protocol — el USB-C de la AI</div>

<div class="slide-footer">
  <span>folder it · agents & mcp</span>
  <span>8 min</span>
</div>

---

## El problema: N × M

<div class="pt-6">

Sin estándar, cada **agente** integra a mano cada **tool**:

</div>

```
   Claude   ChatGPT   Cursor   Tu app
     |        |         |       |
   Slack    Gmail    GitHub   Notion   GCal   ...
```

<v-click>

<div class="pt-6 text-center text-xl font-bold">

N agentes × M tools = <span class="text-orange-400">N·M integraciones</span>

</div>

</v-click>

<v-click>

<div class="pt-4 text-center opacity-70">
Cada equipo reinventando el mismo wrapper.
</div>

</v-click>

<div class="slide-footer">
  <span>03 · mcp</span>
  <span>folder it</span>
</div>

---

## La idea: USB-C para AI

<div class="grid grid-cols-2 gap-8 pt-4">

<div>

Un **protocolo único** entre agentes y tools.

- Cualquier agente compatible con MCP
- Habla con cualquier MCP server
- Sin código pegamento por integración

</div>

<div class="text-center text-8xl pt-4">
🔌
</div>

</div>

<v-click>

<div class="pt-6 text-center text-sm opacity-80">

Anunciado por <strong>Anthropic</strong> en noviembre 2024. Hoy lo soportan Claude, ChatGPT, Cursor, Windsurf, Mastra, ...

</div>

</v-click>

<div class="slide-footer">
  <span>03 · mcp</span>
  <span>folder it</span>
</div>

---

## Arquitectura

<div class="pt-6 text-center font-mono text-sm">

```
┌─────────────┐      ┌──────────┐      ┌────────────┐
│    HOST     │      │  CLIENT  │      │   SERVER   │
│ (tu app)    │◄────►│ (Mastra) │◄────►│ (GCal,...) │
└─────────────┘      └──────────┘      └────────────┘
```

</div>

<div class="grid grid-cols-3 gap-4 pt-10 text-sm">

<div>
<strong class="text-orange-400">Host</strong><br>
<span class="opacity-80">La aplicación (Claude Desktop, tu CLI, Mastra).</span>
</div>

<div>
<strong class="text-orange-400">Client</strong><br>
<span class="opacity-80">La librería que habla MCP. Una por server.</span>
</div>

<div>
<strong class="text-orange-400">Server</strong><br>
<span class="opacity-80">Expone tools/resources/prompts.</span>
</div>

</div>

<div class="slide-footer">
  <span>03 · mcp</span>
  <span>folder it</span>
</div>

---

## Qué expone un MCP server

<div class="grid grid-cols-3 gap-4 pt-6">

<div class="border border-orange-500/30 rounded-lg p-4">

### 🔧 Tools
Funciones invocables.

<div class="text-xs opacity-70 mt-2 font-mono">list-events, create-event, ...</div>

</div>

<div class="border border-orange-500/30 rounded-lg p-4">

### 📄 Resources
Datos que el agente puede leer.

<div class="text-xs opacity-70 mt-2">Archivos, docs, configs.</div>

</div>

<div class="border border-orange-500/30 rounded-lg p-4">

### 💬 Prompts
Plantillas reutilizables.

<div class="text-xs opacity-70 mt-2">Como slash commands.</div>

</div>

</div>

<div class="pt-10 text-sm opacity-80 text-center">
Servers reales: filesystem, GitHub, Slack, Postgres, Google Drive, <strong>Google Calendar</strong>, ...
</div>

<div class="slide-footer">
  <span>03 · mcp</span>
  <span>folder it</span>
</div>

<!--
Mencionar: A2A protocol (Agent-to-Agent, Google) es complementario.
MCP conecta agente↔tool; A2A conecta agente↔agente.
-->

---
layout: section
class: divider-slide
---

<div class="absolute top-12 left-12 font-mono text-xs opacity-50 tracking-widest">/ 04</div>

# Mastra

<div class="text-xl opacity-70 mt-4">Agentes y workflows, en TypeScript</div>

<div class="slide-footer">
  <span>folder it · agents & mcp</span>
  <span>7 min</span>
</div>

---

## Qué es Mastra

<v-clicks>

- Framework **TypeScript-first** para agentes y workflows
- Pensado para **producción**: telemetría, deploys, evals
- MCP **nativo**: cliente y servidor en una sola dep
- Open source (Apache 2.0)

</v-clicks>

<div class="pt-8 grid grid-cols-2 gap-6">

<div class="opacity-80">

### vs n8n
Visual, low-code, ideal para no-devs.

</div>

<div>

### Mastra
**Código**, types, git, tests. Como cualquier librería seria.

</div>

</div>

<div class="slide-footer">
  <span>04 · mastra</span>
  <span>folder it</span>
</div>

---

## Los primitivos

<div class="grid grid-cols-2 gap-6 pt-4">

<div class="border-l-2 border-orange-500 pl-4">

### `Agent`
Un LLM + instrucciones + tools + memoria.

</div>

<div class="border-l-2 border-orange-500 pl-4">

### `Tool`
Función tipada con `zod`. Lo que el agente puede invocar.

</div>

<div class="border-l-2 border-orange-500 pl-4">

### `Workflow`
Steps tipados, con condiciones y handoffs.

</div>

<div class="border-l-2 border-orange-500 pl-4">

### `Memory`
Persistencia configurable (LibSQL, Postgres).

</div>

</div>

<div class="slide-footer">
  <span>04 · mastra</span>
  <span>folder it</span>
</div>

---

## Cómo se ve un agente

```ts {all|1-3|5-11|13|all}
import { Agent } from '@mastra/core/agent';
import { google } from '@ai-sdk/google';
import { findFreeSlot } from './tools/find-free-slot';

export const briefingAgent = new Agent({
  id: 'briefing',
  name: 'briefing-agent',
  instructions: 'Sos un asistente personal de calendario...',
  model: google('gemini-2.5-flash'),
  tools: { findFreeSlot },
});

// ...y se usa así:
const result = await briefingAgent.stream('qué tengo hoy?');
```

<div class="slide-footer">
  <span>04 · mastra</span>
  <span>folder it</span>
</div>

<!--
Notar: el modelo es un provider tipado. Cambiar a opus o gpt-4 es trivial.
-->

---
layout: section
class: divider-slide
---

<div class="absolute top-12 left-12 font-mono text-xs opacity-50 tracking-widest">/ 05</div>

# Demo en vivo

<div class="text-xl opacity-70 mt-4">Asistente de Google Calendar de cero a creando reuniones</div>

<div class="mt-12 text-sm opacity-60 font-mono">
agente que lista, sugiere huecos y agenda en lenguaje natural
</div>

<div class="slide-footer">
  <span>folder it · agents & mcp</span>
  <span>12 min</span>
</div>

<!--
PRE-CHECK antes de avanzar:
1. terminal en /agent (clean)
2. editor abierto en briefing-agent.ts (vacío)
3. clipboard manager con los 3 snippets
4. browser con calendar.google.com en pestaña aparte
5. timer en presenter mode

PLAN B: video grabado de 4 min disponible.
-->

---

## Paso 1 — Agente + tool custom (2 min)

<div class="grid grid-cols-2 gap-4 text-xs">

<div>

```ts
// agents/briefing-agent.ts
import { Agent } from '@mastra/core/agent';
import { google } from '@ai-sdk/google';
import { findFreeSlot } from '../tools/find-free-slot';

export const briefingAgent = new Agent({
  id: 'briefing',
  name: 'briefing-agent',
  instructions: 'Asistente de calendario...',
  model: google('gemini-2.5-flash'),
  tools: { findFreeSlot },
});
```

</div>

<div>

```ts
// tools/find-free-slot.ts
export const findFreeSlot = createTool({
  id: 'find-free-slot',
  description: 'Encuentra hueco de N min...',
  inputSchema: z.object({
    durationMinutes: z.number(),
    rangeStart: z.string(),
    rangeEnd: z.string(),
    busy: z.array(busyInterval).default([]),
  }),
  execute: async ({ durationMinutes, ... }) => {
    /* lógica de gap finding */
  },
});
```

</div>

</div>

<div class="pt-2 text-xs opacity-70">

▸ <code>npm run agent</code> → prompt: <em>"hola, qué podés hacer?"</em>

</div>

<div class="slide-footer">
  <span>05 · demo · paso 1</span>
  <span>folder it</span>
</div>

<!--
2 min. Pegar los dos snippets. Correr. El LLM responde pero todavía no sabe nada del calendario.
Output esperado: "Soy un asistente de calendario, puedo ayudarte con X, Y..."
-->

---

## Paso 2 — Conectar el MCP de Google Calendar (3 min)

```ts {all|1-12|14-21|all}
// mcp/google-calendar.ts
import { MCPClient } from '@mastra/mcp';

export const calendarMcp = new MCPClient({
  id: 'google-calendar',
  servers: {
    googleCalendar: {
      command: 'npx',
      args: ['-y', '@cocal/google-calendar-mcp'],
      env: { GOOGLE_OAUTH_CREDENTIALS: '/path/to/gcp-oauth.keys.json' },
    },
  },
});

// agents/briefing-agent.ts (update)
export const briefingAgent = new Agent({
  // ...
  tools: async () => ({
    ...(await calendarMcp.listTools()),
    findFreeSlot,
  }),
});
```

<div class="pt-2 text-xs opacity-70">

▸ Re-run → <em>"qué tengo hoy?"</em> → 🎉 listado real del calendar

</div>

<div class="slide-footer">
  <span>05 · demo · paso 2</span>
  <span>folder it</span>
</div>

<!--
3 min. Este es el momento "wow". Spread de tools del MCP + tool custom.
Mostrar que el OAuth ya está hecho (tokens cacheados). NO hacer login en vivo.
-->

---

## Paso 3 — Memoria persistente (4 min)

```ts {all|1-2|4-7|10|all}
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';

const memory = new Memory({
  storage: new LibSQLStore({
    id: 'briefing-memory',
    url: 'file:./storage.db',
  }),
});

export const briefingAgent = new Agent({
  // ...
  memory,
});
```

<div class="pt-4 text-xs opacity-80">

▸ Conversación multi-turno: el agente recuerda lo que charlamos.

</div>

<div class="pt-2 text-xs opacity-70">

```
> qué tengo mañana?
> [agenda]
> agendá una reunión a las 10am
> ¿cómo se llama?       ← se acuerda del contexto previo
```

</div>

<div class="slide-footer">
  <span>05 · demo · paso 3</span>
  <span>folder it</span>
</div>

<!--
4 min. Mostrar que con memoria el flow conversacional fluye natural.
Reemplazá esto en .stream() pasándole `memory: { thread, resource }`.
-->

---

## Paso 4 — Correrlo (3 min)

<div class="pt-4 text-sm">

**Prompt en vivo:**

</div>

<div class="text-lg italic mt-2 border-l-2 border-orange-500 pl-4">

*"Qué tengo mañana? Si tengo un hueco antes de las 11, agendame 30 min llamada 'demo charla'."*

</div>

<v-clicks>

<div class="pt-4 text-xs opacity-80 space-y-1">

1. 🧠 Lee la agenda → ve eventos hasta 10:30 → identifica hueco 10:30–11:00
2. 🔧 Llama a `find-free-slot` con los busy intervals
3. 📝 Resume el evento que va a crear → pide confirmación
4. ✅ Confirmamos → MCP crea el evento → 🔗 link

</div>

</v-clicks>

<v-click>

<div class="pt-8 text-center text-orange-400 text-lg">
👉 Abrir <strong>calendar.google.com</strong> y mostrar el evento creado en vivo.
</div>

</v-click>

<div class="slide-footer">
  <span>05 · demo · paso 4</span>
  <span>folder it</span>
</div>

<!--
3 min. CIERRA fuerte: el evento aparece en GCal en vivo.
Si algo se rompe: video pre-grabado en backup.
-->

---
layout: section
class: divider-slide
---

<div class="absolute top-12 left-12 font-mono text-xs opacity-50 tracking-widest">/ 06</div>

# Cierre

<div class="text-xl opacity-70 mt-4">Resumen + recursos + Q&A</div>

<div class="slide-footer">
  <span>folder it · agents & mcp</span>
  <span>3 min</span>
</div>

---

## Lo que vimos

<v-clicks>

- Un **agente** = LLM + tools + memory + loop
- **MCP** estandariza la conexión agente ↔ tool
- **Mastra** te da los primitivos en TypeScript
- Memoria persistente convierte un chat en una **relación** con tu agente
- El código está en el repo: clonalo y corré la demo con tu propia API key

</v-clicks>

<div class="slide-footer">
  <span>06 · cierre</span>
  <span>folder it</span>
</div>

---

## Recursos

<div class="text-sm pt-4 space-y-2">

- 📦 **Repo de la charla** — `github.com/folder-it/agents-101`
- 📘 **Mastra docs** — [mastra.ai/docs](https://mastra.ai/docs)
- 🔌 **MCP spec** — [modelcontextprotocol.io](https://modelcontextprotocol.io)
- 🗓 **MCP de Google Calendar** — [github.com/nspady/google-calendar-mcp](https://github.com/nspady/google-calendar-mcp)
- 🤖 **Google AI Studio** — [aistudio.google.com/apikey](https://aistudio.google.com/apikey)

</div>

<div class="pt-12 text-center">
  <div class="inline-block border-2 border-orange-500/50 p-6 opacity-90 font-mono text-xs">
    [ QR al repo ]
  </div>
</div>

<div class="slide-footer">
  <span>06 · cierre</span>
  <span>folder it</span>
</div>

---
class: cover-slide
layout: cover
---

<div class="cover-tag cover-tag-comment">/* end */</div>
<div class="cover-tag cover-tag-welcome">THANKS</div>

<div class="flex flex-col items-center justify-center h-full text-center">
  <h1 class="!text-7xl !font-black">Gracias</h1>
  <div class="text-2xl font-light opacity-90 mt-4">¿Preguntas?</div>
  <div class="mt-16 text-sm opacity-70 font-mono">
    Juan Huaco · Folder IT · Software Development Team
  </div>
</div>
