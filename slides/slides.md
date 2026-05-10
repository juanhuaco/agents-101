---
theme: seriph
title: AI Agents & MCP para Devs
info: |
  Charla de 45 minutos sobre AI agents, MCP y Mastra.
  Repo: https://github.com/tu-usuario/agents-101
class: text-center
highlighter: shiki
lineNumbers: false
drawings:
  persist: false
transition: slide-left
mdc: true
---

# AI Agents & MCP

### De chatbot a agente, en código

<div class="pt-12">
  <span class="text-sm opacity-70">45 minutos · TypeScript · Mastra</span>
</div>

<!--
Bienvenida, presentación rápida.
Setup: confirmar que las slides se ven, internet funciona, terminal abierta.
-->

---
layout: center
---

# Bloque 1 — El problema

<div class="text-sm opacity-60">5 min</div>

---

## Pedile esto a ChatGPT

<v-clicks>

> *"Agendame 30 min con María mañana sobre el deploy, después de que termine mi 1:1."*

- 🚫 No sabe qué tenés en el calendario
- 🚫 No conoce a María ni tiene su mail
- 🚫 No puede crear el evento
- 🚫 No se acuerda si lo charlaste ayer

</v-clicks>

<!--
5 min total para el bloque. Esta es la slide del "hook": cualquiera entiende la frustración.
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

<div class="pt-8 text-sm opacity-70">
El último AI Insight charlamos n8n. Hoy bajamos un nivel: code-first.
</div>

<!--
n8n = visual, low-code. Hoy: misma idea, pero con TypeScript en la mano.
-->

---

## Por qué ahora

<v-clicks>

- Modelos lo suficientemente buenos para razonar sobre tools (Claude 4.x, GPT-4.x)
- Frameworks maduros: Mastra, LangGraph, OpenAI Agents SDK
- **MCP** (nov 2024) está terminando de estandarizar las integraciones
- El costo por interacción bajó 10×–100× en 18 meses

</v-clicks>

<!--
No es hype: en 2024 era difícil hacer un agente confiable. En 2026 es accesible.
-->

---
layout: center
---

# Bloque 2 — ¿Qué es un agente?

<div class="text-sm opacity-60">10 min</div>

---

## El loop

<div class="text-center pt-8 text-2xl">

**Percibir → Razonar → Actuar → Observar → ...**

</div>

<v-clicks>

<div class="pt-12 grid grid-cols-4 gap-4 text-sm">

<div>
<strong>Percibir</strong><br>
Recibe input (texto, evento, schedule)
</div>

<div>
<strong>Razonar</strong><br>
LLM decide qué hacer
</div>

<div>
<strong>Actuar</strong><br>
Llama una tool
</div>

<div>
<strong>Observar</strong><br>
Lee el resultado y vuelve a razonar
</div>

</div>

</v-clicks>

<!--
Animado con clicks. El loop es la idea más importante del bloque.
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

<!--
Mención: Claude Code leak fue revelador. Buenas instrucciones > más parámetros.
-->

---

## Estrategias de memoria

<div class="grid grid-cols-3 gap-4 pt-4 text-sm">

<div>

### Working memory
La conversación actual. Token window del LLM.

</div>

<div>

### Semantic memory
Embeddings + vector DB. "Recordá cosas parecidas a esto."

</div>

<div>

### Resource memory
Persistente, por usuario/thread. SQL/KV.

</div>

</div>

<div class="pt-8 text-center text-lg">

En Mastra es una sola abstracción: `Memory({ storage })`.

</div>

---

## Single-agent vs Multi-agent

<div class="grid grid-cols-2 gap-8 pt-4">

<div>

### Un solo agente
Una "persona", muchas tools.

Simple, debuggable, suficiente para 80% de los casos.

</div>

<div>

### Workflow multi-agente
Varios agentes especializados, coordinados.

**Handoff** = un agente le pasa el control a otro.

</div>

</div>

<div class="pt-8 text-center opacity-80">
🧑‍💼 El agente es el <strong>empleado</strong>. El workflow es el <strong>proceso de empresa</strong>.
</div>

<!--
Analogía: en una empresa tenés roles (agentes) y procesos (workflows).
Un proceso conecta varios roles para llegar al resultado.
-->

---
layout: center
---

# Bloque 3 — MCP

### Model Context Protocol

<div class="text-sm opacity-60 pt-4">8 min</div>

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

<div class="pt-6 text-center text-lg">

**N agentes × M tools = N·M integraciones**

</div>

</v-click>

<v-click>

<div class="pt-4 text-center opacity-80">
Cada equipo reinventando el mismo wrapper.
</div>

</v-click>

---

## La idea: USB-C para AI

<div class="grid grid-cols-2 gap-8 pt-4">

<div>

Un **protocolo único** entre agentes y tools.

- Cualquier agente compatible con MCP
- Habla con cualquier MCP server
- Sin código pegamento por integración

</div>

<div class="text-center text-7xl pt-8">
🔌
</div>

</div>

<v-click>

<div class="pt-6 text-center">

Anunciado por Anthropic en **noviembre 2024**. Hoy lo soportan Claude, ChatGPT, Cursor, Windsurf, Mastra...

</div>

</v-click>

---

## Arquitectura

<div class="pt-4 text-center font-mono text-sm">

```
┌─────────────┐      ┌──────────┐      ┌────────────┐
│    HOST     │      │  CLIENT  │      │   SERVER   │
│ (tu app)    │◄────►│ (Mastra) │◄────►│ (GCal,...) │
└─────────────┘      └──────────┘      └────────────┘
```

</div>

<div class="grid grid-cols-3 gap-4 pt-8 text-sm">

<div>
<strong>Host</strong><br>
La aplicación (Claude Desktop, tu CLI, Mastra).
</div>

<div>
<strong>Client</strong><br>
La librería que habla MCP. Una por server.
</div>

<div>
<strong>Server</strong><br>
Expone tools/resources/prompts.
</div>

</div>

---

## Qué expone un MCP server

<div class="grid grid-cols-3 gap-4 pt-6">

<div>

### 🔧 Tools
Funciones que el agente puede invocar.

`list-events`, `create-event`, ...

</div>

<div>

### 📄 Resources
Datos que el agente puede leer.

Archivos, snippets de doc, configs.

</div>

<div>

### 💬 Prompts
Plantillas reutilizables que el host puede ofrecer.

Como `slash commands`.

</div>

</div>

<div class="pt-8 text-sm opacity-70 text-center">
Servers reales: filesystem, GitHub, Slack, Postgres, Google Drive, **Google Calendar**, ...
</div>

<!--
Mencionar: A2A protocol (Agent-to-Agent, Google) es complementario. MCP conecta agente↔tool; A2A conecta agente↔agente.
-->

---
layout: center
---

# Bloque 4 — Mastra

### Agentes y workflows, en TypeScript

<div class="text-sm opacity-60 pt-4">7 min</div>

---

## Qué es Mastra

<v-clicks>

- Framework TypeScript-first para agentes y workflows
- Pensado para producción: telemetría, deploys, evals
- MCP nativo: cliente y servidor en una sola dep
- Open source (Apache 2.0)

</v-clicks>

<div class="pt-8 grid grid-cols-2 gap-6">

<div>

### vs n8n
Visual, low-code, ideal para no-devs.

</div>

<div>

### Mastra
Código, types, git, tests. Como cualquier librería seria.

</div>

</div>

---

## Los primitivos

<div class="grid grid-cols-2 gap-6 pt-2">

<div>

### `Agent`
Un LLM + instrucciones + tools + memoria.

### `Tool`
Una función tipada con `zod`. Lo que el agente puede invocar.

</div>

<div>

### `Workflow`
Steps tipados, con condiciones y handoffs.

### `Memory`
Persistencia configurable (LibSQL, Postgres).

</div>

</div>

---

## Cómo se ve un agente

```ts {all|1-2|4-9|11|all}
import { Agent } from '@mastra/core/agent';
import { findFreeSlot } from './tools/find-free-slot';

export const briefingAgent = new Agent({
  name: 'briefing-agent',
  instructions: 'Sos un asistente personal de calendario...',
  model: 'anthropic/claude-sonnet-4-6',
  tools: { findFreeSlot },
});

// ...y se usa así:
const result = await briefingAgent.stream('qué tengo hoy?');
```

<!--
Notar: el modelo es un string. Mastra resuelve provider y modelo. Cambiar a opus o gpt-4 es trivial.
-->

---
layout: center
class: text-center
---

# Bloque 5 — Demo

### Asistente de Google Calendar en vivo

<div class="text-sm opacity-60 pt-4">12 min</div>

<div class="pt-8 opacity-70">

`agente que lista, sugiere huecos y agenda en lenguaje natural`

</div>

<!--
PRE-CHECK:
1. terminal abierta en /agent
2. editor abierto en briefing-agent.ts (vacío)
3. clipboard manager listo con los 4 snippets
4. browser con calendar.google.com en pestaña aparte
5. timer en presenter mode arrancado

PLAN B: branch demo-fallback con mocks; video 4min embebido.
-->

---

## Paso 1 — Agente con tool custom

<div class="grid grid-cols-2 gap-4 text-xs">

<div>

```ts
// agents/briefing-agent.ts
import { Agent } from '@mastra/core/agent';
import { findFreeSlot } from '../tools/find-free-slot';

export const briefingAgent = new Agent({
  name: 'briefing-agent',
  instructions: 'Asistente de calendario...',
  model: 'anthropic/claude-sonnet-4-6',
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
  execute: async ({ context }) => {
    /* lógica de gap finding */
  },
});
```

</div>

</div>

<div class="pt-2 text-xs opacity-70">

▸ `npm run agent` → prompt: *"hola, qué podés hacer?"*

</div>

<!--
2 min. Pegar los dos snippets. Correr. El LLM responde pero todavía no sabe nada del calendario.
Output esperado: "Soy un asistente de calendario, puedo ayudarte con X, Y..."
-->

---

## Paso 2 — Conectar el MCP de Google Calendar

```ts {all|1-12|14-21|all}
// mcp/google-calendar.ts
import { MCPClient } from '@mastra/mcp';

export const calendarMcp = new MCPClient({
  id: 'google-calendar',
  servers: {
    googleCalendar: {
      command: 'npx',
      args: ['-y', '@cocal/google-calendar-mcp'],
      env: { GOOGLE_OAUTH_CREDENTIALS: './gcp-oauth.keys.json' },
    },
  },
});

// agents/briefing-agent.ts (update)
export const briefingAgent = new Agent({
  // ...
  tools: async () => ({
    ...(await calendarMcp.getTools()),
    findFreeSlot,
  }),
});
```

<div class="pt-2 text-xs opacity-70">

▸ Re-run → *"qué tengo hoy?"* → 🎉 listado real del calendar

</div>

<!--
3 min. Este es el momento "wow". Spread de tools del MCP + tool custom.
Mostrar que el OAuth ya está hecho (tokens cacheados). NO hacer login en vivo.
-->

---

## Paso 3 — Workflow multi-agente

```ts {all|1-13|15-25|27-37|all}
// workflows/daily-briefing.ts
const briefingStep = createStep({
  id: 'briefing',
  inputSchema: z.object({ userMessage: z.string() }),
  outputSchema: z.object({
    summary: z.string(),
    handoff: z.boolean(),
    schedulingIntent: z.string().optional(),
  }),
  execute: async ({ inputData }) =>
    (await briefingAgent.generate(inputData.userMessage, { output: /*...*/ })).object,
});

const scheduleStep = createStep({
  id: 'schedule',
  inputSchema: /* output del paso 1 */,
  outputSchema: z.object({ briefing: z.string(), schedulingResult: z.string().optional() }),
  execute: async ({ inputData }) => {
    if (!inputData.handoff) return { briefing: inputData.summary };
    const r = await schedulerAgent.generate(inputData.schedulingIntent!);
    return { briefing: inputData.summary, schedulingResult: r.text };
  },
});

export const dailyBriefingWorkflow = createWorkflow({
  id: 'daily-briefing',
  inputSchema: z.object({ userMessage: z.string() }),
  outputSchema: z.object({ briefing: z.string(), schedulingResult: z.string().optional() }),
})
  .then(briefingStep)
  .then(scheduleStep)
  .commit();
```

<!--
4 min. Mostrar el handoff: briefing identifica intent, scheduler ejecuta.
Pegar también scheduler-agent.ts (solo show, no detallar).
-->

---

## Paso 4 — Correrlo

<div class="pt-4 text-sm">

**Prompt en vivo:**

> *"Qué tengo mañana? Si tengo un hueco antes de las 11, agendame 30 min con María sobre el deploy."*

</div>

<v-clicks>

<div class="pt-4 text-xs opacity-80">

1. 🧠 `briefingAgent` lee mañana → ve eventos hasta 10:30 → encuentra hueco 10:30–11:00
2. 🤝 Handoff: `handoff: true, schedulingIntent: "30min María, mañana 10:30, sobre deploy"`
3. 📝 `schedulerAgent` extrae datos → muestra resumen → pide confirmación
4. ✅ Confirmamos → MCP crea el evento → 🔗 link al evento

</div>

</v-clicks>

<v-click>

<div class="pt-6 text-center">
👉 Abrir <strong>calendar.google.com</strong> y mostrar el evento creado.
</div>

</v-click>

<!--
3 min. CIERRA fuerte: el evento aparece en GCal en vivo.
Si algo se rompe: branch demo-fallback OR video pre-grabado.
-->

---
layout: center
---

# Bloque 6 — Cierre

<div class="text-sm opacity-60">3 min</div>

---

## Lo que vimos

<v-clicks>

- Un **agente** = LLM + tools + memory + loop
- **MCP** estandariza la conexión agente ↔ tool
- **Mastra** te da los primitivos en TypeScript
- Un workflow con **handoff** es solo dos agentes colaborando
- El código está en el repo: clonalo y corré la demo con tu propia API key

</v-clicks>

---

## Recursos

<div class="text-sm pt-4">

- 📦 **Repo de la charla**: `github.com/tu-usuario/agents-101`
- 📘 **Mastra docs**: [mastra.ai/docs](https://mastra.ai/docs)
- 🔌 **MCP spec**: [modelcontextprotocol.io](https://modelcontextprotocol.io)
- 🗓 **MCP de Google Calendar**: [github.com/nspady/google-calendar-mcp](https://github.com/nspady/google-calendar-mcp)
- 🤖 **Claude API**: [console.anthropic.com](https://console.anthropic.com)

</div>

<div class="pt-8 text-center">
<div class="inline-block border border-gray-500 p-4 opacity-80">
QR al repo
</div>
</div>

---
layout: center
class: text-center
---

# Gracias

### Preguntas?

<div class="pt-8 text-sm opacity-70">

@tu-handle · github.com/tu-usuario/agents-101

</div>
