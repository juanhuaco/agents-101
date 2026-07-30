# 🎤 Guión de slides — "Agentes en Acción: Fundamentos, MCP y Código"

> Documento de trabajo para validar **antes** de tocar el PPTX.
> Basado en `idea_charla.md`. Tema de marca Folder (rosa/violeta).

---

## ⏱️ Estimación de tiempo (parte teórica, sin demos)

**Supuestos:** charla de 60 min total, estilo "improviso bastante" (~1.5–2.5 min por slide según densidad), público mixto (técnicos + no técnicos).

| Bloque | Slides | Estimación |
|---|---|---|
| Intro + objetivos | 1–3 | 4–6 min |
| LLM vs Agente (hook + juego) | 4–6 | 4–5 min |
| Qué es un LLM (tokens, dimensiones, ejemplos) | 7–10 | 6–8 min |
| Qué es un Agente (problemas 0→3) | 11–17 | 9–12 min |
| MCP (bonus) | 18–22 | 6–8 min |
| Detalles técnicos + transición | 23–24 | 3–4 min |
| **TOTAL TEORÍA** | **~24 slides** | **~32–43 min** |

### 🚨 Lo más importante de la estimación
Como improvisás bastante y el contenido es **denso**, lo más probable es que la teoría se vaya a **~38–40 min**. Con 60 min totales eso te deja:

- Teoría: ~35 min (hay que ser disciplinado)
- 2 demos: ~16 min (≈8 c/u)
- Cierre + Q&A + buffer: ~9 min

**Recomendación fuerte:** apuntá a **30–33 min de teoría** ensayando. Si en el ensayo te vas a 40, ya sabés que tenés que recortar (los candidatos a recortar están marcados con ✂️ abajo).

---

## 🗂️ Puntos slide por slide

> Formato: **[N] Título** → bullets que van en la slide · 🎙️ lo que decís (no va escrito) · ⏱️ tiempo

### [1] Portada
- Título: **Agentes en Acción**
- Subtítulo: *Fundamentos, MCP y Código*
- Tu nombre / Folder / fecha
- 🎙️ Bienvenida, presentación personal corta.
- ⏱️ 1 min

### [2] El momento que estamos viviendo
- "Revolución tecnológica sin precedentes"
- Cambió: forma de trabajar · cultura · cómo se hace ciencia
- …y trajo **vocabulario nuevo**: agente, LLM, workflow, MCP, GPT…
- 🎙️ El gancho: usamos estas palabras sin tiempo de profundizar. Normal como profesionales.
- ⏱️ 2 min

### [3] Objetivo de la charla
- Charla **para todo público** (técnicos y creativos de Folder)
- 🎯 Objetivo 1 (teórico): entender las ideas base y **cómo se relacionan** → criterio para elegir herramientas
- 🎯 Objetivo 2 (práctico): verlo en acción → **2 demos** (una técnica, una no técnica)
- 🎙️ "2 demos = 2 puntos de fallo" (chiste, baja la tensión).
- ⏱️ 2 min

### [4] Hook: ¿Qué IA usás? / ¿Qué LLM usás?
- Pregunta a la audiencia: *"¿Qué IA/LLM usás?"*
- 🎙️ Mostrar que la pregunta está mal planteada → mezcla dos cosas. Mano alzada opcional.
- ⏱️ 1–2 min

### [5] LLM ≠ Agente — el juego
- Lista para asociar (¿LLM o Agente?):
  `sonnet · gpt · gh copilot · claude code · opus · gemini · cursor · CodeConnect · chatGPT`
- "Hay algunas trampa" 😏
- 🎙️ Interacción con la sala. Dejar la respuesta para después (o revelar acá).
- ⏱️ 2 min · **(slide clave de engagement)**

### [6] Dos conceptos distintos pero muy conectados
- LLM ⟷ Agente: separados, pero uno potencia al otro
- 🎙️ Transición hacia definir cada uno.
- ⏱️ 1 min

### [7] ¿Qué es un LLM?
- "A lo criollo: un **predictor de palabras**"
- Sin desmerecerlo: ingeniería bestial detrás
- ⚠️ La magia de hoy **NO es solo el LLM** → hay algo más que lo potencia
- 🎙️ "Si fuera tan simple, no tendríamos laburo 😄"
- ⏱️ 2 min

### [8] El token
- Token = unidad de información que entra/sale del LLM
- Aprox: **1 token ≈ 1 palabra**
- "Me comió todos los tokens con 1 prompt"
- 🎙️ No profundizar, solo dejar el concepto.
- ⏱️ 1–2 min

### [9] Las 3 dimensiones de un LLM
- ⚡ **Velocidad** — más rápido / más lento al predecir
- 📦 **Contexto** — cuánta info le entra (ventana de contexto)
- 🧠 **Potencia** — modelos de frontera o no
- 🎙️ Estos son los pros/cons al elegir.
- ⏱️ 2 min

### [10] Ejemplos de LLMs por empresa
- Anthropic: Haiku · Sonnet · Opus
- Google: Flash · Pro
- OpenAI: GPT-5 mini · GPT-5.5 · o4
- Meta: Llama 4 · xAI: Grok 4 · DeepSeek: R1 · Nvidia: Nemotron
- 🎙️ Tabla rápida. Conectar con las 3 dimensiones (ej: Haiku=rápido, Opus=potente).
- ⏱️ 2 min

### [11] "Pero me codificó media app…" → hay algo más
- Si es solo un predictor de palabras… ¿cómo hizo *esto*?
- 🎙️ Transición fuerte hacia "agente". Crear intriga.
- ⏱️ 1 min

### [12] ¿Qué es un Agente? (lo construimos por problemas)
- No hay definición 100% formal → la armamos resolviendo problemas
- Idea visual: ir **acumulando** las piezas slide a slide
- 🎙️ Setear el método: vamos de lo simple a lo completo.
- ⏱️ 1 min

### [13] Problema 0 — El orquestador (el loop básico)
- El agente = director de orquesta (mueve la batuta) · es **un algoritmo simple**
- ```
  loop:
    - llamo al LLM con una pregunta
    - me responde
  ```
- ⏱️ 1–2 min

### [14] Problema 1 — Que actúe como yo quiero → System Prompt
- Si al LLM le decís *cómo* actuar, predice de esa forma
- Eso es **prompt engineering**
- ```
  loop:
    - system prompt + mi prompt
    - respuesta
  ```
- 🎙️ Ej: "respondé como experto en IA".
- ⏱️ 2 min

### [15] Problema 2 — Que se acuerde → Memory
- El LLM **no se acuerda** → es una ilusión
- Le pasamos el historial cada vez
- ```
  loop:
    - system prompt + historial(memory) + mi prompt
    - respuesta
  ```
- 🎙️ "El ChatGPT olvidadizo de antes." Anécdota relatable.
- ⏱️ 2 min

### [16] Problema 3 — Que ejecute acciones → Tools
- Tools = acciones que el agente ejecuta (leer archivo, correr comando, crear un Word…)
- Gana contexto **o** ejecuta una acción
- ```
  loop:
    - contexto + prompt
      loop:
        - ¿necesito una herramienta?
        - uso herramienta
    - respuesta
  ```
- 🎙️ "Del chat encajonado al asistente que hace cosas reales. Otro nivel."
- ⏱️ 2–3 min

### [17] ✅ Definición final de Agente
- Un agente es un sistema de IA que:
  - usa uno o más **LLMs** (0)
  - gestiona **contexto** (1, 2)
  - usa **herramientas** internas (3) y externas
  - para llegar a una **meta**
- 🎙️ Momento "ajá". Releer la lista de palabras del slide 5 con la respuesta.
- ⏱️ 2 min · **(slide clave)**

### [18] Ejemplos de Agentes
- Microsoft: Copilot · GitHub Copilot
- Anthropic: Claude Desktop / Claude Code
- OpenAI: ChatGPT
- Google: Gemini (agent)
- 🎙️ Ahora sí se entiende la diferencia con el slide 5.
- ⏱️ 1–2 min

### [19] 🌐 BONUS — ¿Cómo interactúa con el mundo? (Problema 4)
- Antes: el agente vivía **encerrado** en tu máquina
- Fines de 2024 → **MCP (Model Context Protocol)**
- Tools que conectan al agente con algo **externo**
- ```
  loop:
    - contexto + prompt
      loop:
        - ¿herramienta interna o MCP?
        - uso herramienta
    - respuesta
  ```
- 🎙️ "Tu parte favorita, venís laburando meses en esto."
- ⏱️ 2 min

### [20] El poder (y el peligro) de MCP
- Conectá tu agente con: calendario, mail… o una casa, un avión, una central nuclear 😅
- Límites inimaginables · menos de 2 años de vida
- 🎙️ Bueno y peligroso. Setear el tema de poder real.
- ⏱️ 1–2 min · ✂️ *(comprimible si vas con el tiempo justo)*

### [21] ¿Cómo funciona un MCP? (para técnicos)
- Arquitectura **cliente–servidor**
- Servidor = backend desplegado (incluso local) que **expone acciones** de forma programática
- Analogía: "endpoints para IAs"
- El cliente = nuestro agente
- ⏱️ 2 min

### [22] Ejemplo en vivo: el MCP de Calendario
- Tool: "ver reuniones entre fecha A y B" → de fondo pega a la API de Google Calendar
- Caso: agendar entrevista con restricciones (mañana, dejar tiempo para desayunar, no quedar cansado…)
- El agente: analiza huecos → propone martes 10:30 → confirmás → ejecuta la acción vía MCP
- 🎙️ **Esto es exactamente lo que muestra la demo.** Sembrar expectativa.
- ⏱️ 2–3 min · **(puente a la demo)**

### [23] MCP en tu empresa
- Cada empresa puede crear su MCP para sus servicios
- 💡 Idea: un **MCP de GALA** → crear eventos desde un chat ("la dejo picando")
- 🎙️ Hacerlo cercano a Folder.
- ⏱️ 1 min

### [24] Detalles para los técnicos (rapidísimo)
- 🔌 ¿REST usa JSON? MCP usa **JSON-RPC** (orientado a ejecutar acciones)
- 🔁 **Workflow**: paso a paso con varios agentes (ej: n8n en el CDP de David) → *otra charla*
- 📚 **RAG**: forma sofisticada de inyectar contexto → *otra charla*
- 🎙️ "Lo dejo picando para profundizar después."
- ⏱️ 2–3 min · ✂️ *(se puede dejar como slide de referencia y no leerlo todo)*

### [25] → Y ahora, las demos
- "Demo 1 (no técnica) · Demo 2 (técnica)"
- 🎙️ Transición. Recordá el fallback (video/capturas) por las dudas.
- ⏱️ 30 seg

---

## 🧩 Qué te puede estar faltando (recomendaciones)

Ordenadas por impacto:

1. **Slide de cierre / resumen** ⭐ — Hoy la charla termina en las demos. Te falta una slide final que recapitule los 4 conceptos (LLM → contexto → tools → MCP) en una imagen, + recursos (docs MCP, repo de la demo) + tu contacto. Cierra el círculo y es lo que la gente fotografía.

2. **Alucinaciones y límites del LLM** ⭐ — Decís "predictor de palabras" pero no mencionás que **puede equivocarse con total seguridad**. Para un público profesional que va a *confiar* tareas en estos sistemas, es casi obligatorio. Va bien después del slide 7.

3. **Costo real (tokens = $$)** — Mencionás el token pero no que **cuesta plata** y que por eso elegís modelos distintos (Haiku barato vs Opus caro). Conecta con las "3 dimensiones" y es muy relevante para decisiones de negocio en Folder.

4. **Seguridad/permisos de MCP** ⭐ — El "peligro" lo contás como chiste, pero falta lo serio: un MCP con acceso a tu mail/calendario/datos es **superficie de ataque y de fuga de datos**. Un bullet sobre permisos/confianza eleva mucho la charla para un público IT.

5. **Agenda / índice al inicio** — Para "todo público" ayuda mucho una slide de ruta (Teoría → MCP → Demos) así nadie se pierde.

6. **Analogía de MCP = USB-C** — Estaba en tu outline viejo y es la mejor analogía para no-técnicos: "un estándar para enchufar cualquier herramienta a cualquier agente". Va perfecto en el slide 19 o 21.

7. **Setear cada demo antes de correrla** — Un bullet de "qué van a ver y por qué" antes de cada demo (sobre todo aclarar cuál es para no-técnicos). Baja la ansiedad y enfoca a la audiencia.

8. **"Qué NO es un agente"** (opcional) — Un contraste rápido (un script automatizado ≠ agente; un chatbot sin tools ≠ agente) refuerza la definición del slide 17.

9. **Revelar las respuestas del juego (slide 5)** — Definí si revelás en el momento o al final (slide 18). Hoy queda ambiguo en el guión.

10. **Pregunta de apertura a mano alzada** — "¿Quién usó ChatGPT esta semana? ¿Quién sabe qué es un MCP?" Termómetro de la sala y engagement inmediato.

---

## ✅ Próximo paso
Validá:
- ¿La estimación de tiempo te cierra (apuntar a ~32 min de teoría)?
- ¿Qué recomendaciones querés que **incorpore como slides** y cuáles descartás?
- ¿Agrego/saco/reordeno algún slide?

Cuando me confirmes, modifico el `PPTX Desktop Folder IT.pptx` respetando el tema de marca.
