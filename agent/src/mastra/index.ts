import './env';
import { Mastra } from '@mastra/core';
import { LibSQLStore } from '@mastra/libsql';
import { briefingAgent } from './agents/briefing-agent';

export const mastra = new Mastra({
  agents: {
    briefing: briefingAgent,
  },
  storage: new LibSQLStore({ id: 'mastra-storage', url: 'file:./storage.db' }),
});
