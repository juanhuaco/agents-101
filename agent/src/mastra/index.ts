import './env';
import { Mastra } from '@mastra/core';
import { LibSQLStore } from '@mastra/libsql';
import { briefingAgent } from './agents/briefing-agent';
import { getCalendarTools } from './mcp/google-calendar';

// Disparar el handshake del MCP en background (fire-and-forget). NO usar await:
// bloquearía el módulo hasta que listTools() resuelva y dejaría al CLI y al
// playground sin output por varios segundos. Como `getCalendarTools()` cachea
// la promesa, el primer uso real reusa este handshake en curso.
void getCalendarTools().catch(() => { /* el error real saldrá en el primer uso */ });

export const mastra = new Mastra({
  agents: {
    briefing: briefingAgent,
  },
  storage: new LibSQLStore({ id: 'mastra-storage', url: 'file:./storage.db' }),
});
