# 🎯 Outline: AI, Agents & MCP para Desarrolladores (45 min)

---

## Bloque 1 — El problema que venimos a resolver *(5 min)*

El objetivo acá es enganchar a todos desde el arranque, junior y senior por igual.

- ¿Qué limitaciones tiene un LLM "solo"? (no tiene memoria, no puede actuar, no conoce tu sistema)
- El salto de *chatbot* a *agente*: de responder a **hacer**
- Por qué esto importa ahora y no en 2 años
- Mención rápida a n8n como punto de referencia conocido (last AI Insight) → "hoy vamos un nivel más code"

---

## Bloque 2 — ¿Qué es un agente de AI? *(10 min)*

Acá va la teoría core, explicada para que un junior entienda y un senior no se aburra.

- El loop de un agente: **Percibir → Razonar → Actuar → Observar**
- Los componentes clave: LLM + Tools + Memory, etc
- Estrategias de memoria — explicado simple
- ¿Qué es un "tool"? Ejemplos concretos (buscar en la web, leer un archivo, llamar una API)
- Agentes simples vs multi-agente (workflows con varios agentes coordinados)
- **Analogía útil:** el agente es el "empleado", el workflow es el "proceso de empresa"
- Quizá contar un poco del leak de Claude Code

---

## Bloque 3 — MCP: el protocolo que lo conecta todo *(8 min)*

Este bloque es el diferenciador de la charla — MCP es reciente y pocos lo explican bien.

- ¿Qué es MCP y por qué existe? El problema de la integración ad-hoc
- La analogía de USB-C: un estándar para conectar cualquier tool a cualquier agente
- Arquitectura básica: **Host / Client / Server**
- Qué puede exponer un MCP Server: *tools*, *resources*, *prompts*
- Ejemplos reales: MCP de filesystem, GitHub, bases de datos, tu propia API
- Por qué MCP cambia la forma en que pensamos las integraciones
- Capaz dar una aproximación a A2A Protocol

---

## Bloque 4 — Mastra: agentes y workflows en código *(7 min)*

Transición de conceptos a la herramienta concreta antes de la demo.

- ¿Qué es Mastra y dónde vive en el stack? (TypeScript-first, pensado para producción)
- Comparación rápida con n8n: visual vs código, flexibilidad, control
- Los primitivos de Mastra: `Agent`, `Tool`, `Workflow`, `Memory`
- Cómo Mastra implementa MCP nativamente
- Mostrar la estructura de un proyecto (carpetas, archivos clave) — puede ser un slide de código

---

## Bloque 5 — Demo en vivo *(12 min)*

La parte más importante. Tiene que contar una historia, no solo mostrar código.

**Escenario posible:** *"Un agente que recibe un issue de GitHub, lo analiza, busca contexto en tu codebase y genera un plan de acción"*

O algo más simple pero igual de efectivo: *"Un agente con memoria que puede leer archivos y responder preguntas sobre tu proyecto"*

### Estructura de la demo

1. Crear el agente básico con un tool custom *(2 min)*
2. Conectar un MCP Server (filesystem o GitHub) *(3 min)*
3. Armar un workflow de dos pasos con handoff entre agentes *(4 min)*
4. Correrlo y ver el resultado *(3 min)*

> ⚠️ **Tené siempre un fallback**: video grabado o capturas en caso de que algo falle en vivo

---

## Bloque 6 — Cierre y preguntas *(3 min)*

- Resumen de los conceptos clave en una sola slide
- Recursos para seguir: docs de Mastra, spec de MCP, repositorio de la demo
- Q&A

---

## ⏱ Distribución de tiempo

| Bloque | Tiempo |
|---|---|
| El problema | 5 min |
| ¿Qué es un agente? | 10 min |
| MCP | 8 min |
| Mastra (intro) | 7 min |
| Demo en vivo | 12 min |
| Cierre + Q&A | 3 min |
| **Total** | **45 min** |
