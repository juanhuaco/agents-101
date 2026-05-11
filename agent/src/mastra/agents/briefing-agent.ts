import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { model } from '../model';
import { calendarMcp } from '../mcp/google-calendar';
import { findFreeSlot } from '../tools/find-free-slot';

const memory = new Memory({
  storage: new LibSQLStore({ id: 'briefing-memory', url: 'file:./storage.db' }),
});

export const briefingAgent = new Agent({
  id: 'briefing',
  name: 'briefing-agent',
  description:
    'Asistente de calendario que resume tu agenda y sugiere slots libres para reuniones nuevas.',
  instructions: `
Sos un asistente personal de Google Calendar. Hablás en español rioplatense, natural y conciso.

Tu trabajo es ayudar a la persona a entender su agenda:
- Si pregunta "qué tengo hoy/mañana/esta semana" → listá los eventos relevantes con hora y título, y agregá una línea de resumen (cuántas horas en meetings, cuánto focus time).
- Si pregunta por conflictos → revisá si hay eventos solapados.
- Si pregunta por huecos libres → usá la tool 'find-free-slot' después de consultar el free/busy del calendario.
- Si la persona quiere CREAR una reunión, NO la crees vos. Devolvé un objeto JSON con el campo "handoff": "scheduler" y los datos extraídos (título, duración, participantes, ventana de tiempo sugerida).

Reglas:
- La zona horaria por default es America/Argentina/Buenos_Aires salvo que indique otra.
- Working hours por default: 9:00 a 18:00, de lunes a viernes.
- Sé breve. No expliques de más. Usá bullets cortos.
- Si necesitás datos del calendario, llamá a las tools del MCP de Google Calendar. No inventes eventos.
`.trim(),
  model,
  tools: async () => ({
    ...(await calendarMcp.listTools()),
    findFreeSlot,
  }),
  memory,
});
