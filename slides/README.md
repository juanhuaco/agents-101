# /slides

Presentación [Slidev](https://sli.dev) de la charla **AI Agents & MCP** (45 min, español).

## Correr en modo presentación

```bash
npm install
npm run dev          # abre http://localhost:3030
```

Atajos útiles:

- **`P`** — presenter mode con notas + timer (perfecto para charla cronometrada)
- **`F`** — fullscreen
- **`O`** — overview de todas las slides
- **`←`/`→`** — navegar

## Exportar

```bash
npm run export       # → charla-ai-agents.pdf (incluye los reveals como pages)
npm run build        # → dist/ sitio estático
```

## Estructura

```
slides/
├── slides.md           # archivo único con las 6 secciones de la charla
└── snippets/           # snippets .ts referenciados desde slides.md
    ├── agent-basico.ts
    ├── tool-custom.ts
    ├── mcp-client.ts
    └── workflow.ts
```

Cada snippet se referencia desde `slides.md` con bloques de código directos (los snippets están duplicados textualmente en el `.md` para máxima portabilidad en presenter mode).

## Mapeo bloques → tiempo

| Bloque | Slides | Tiempo |
|---|---|---|
| Cover | 1 | — |
| 1. Problema | 3 | 5 min |
| 2. Qué es un agente | 5 | 10 min |
| 3. MCP | 5 | 8 min |
| 4. Mastra | 3 | 7 min |
| 5. Demo en vivo | 1 divisor + 4 técnicos | 12 min |
| 6. Cierre + Q&A | 3 | 3 min |

## Theme

`@slidev/theme-seriph` — serif moderno, contraste alto, queda bien proyectado y en PDF.
