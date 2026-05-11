import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { model } from '../model';
import { calendarMcp } from '../mcp/google-calendar';
import { findFreeSlot } from '../tools/find-free-slot';
import { briefingInstructions } from './briefing-instructions';

const memory = new Memory({
  storage: new LibSQLStore({ id: 'briefing-memory', url: 'file:./storage.db' }),
});

export const briefingAgent = new Agent({
  id: 'briefing',
  name: 'briefing-agent',
  description:
    'Asistente de calendario que resume tu agenda y sugiere slots libres para reuniones nuevas.',
  instructions: briefingInstructions,
  model,
  tools: async () => ({
    ...(await calendarMcp.listTools()),
    findFreeSlot,
  }),
  memory,
});
