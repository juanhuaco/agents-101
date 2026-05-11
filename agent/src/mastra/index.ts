import './env';
import { Mastra } from '@mastra/core';
import { LibSQLStore } from '@mastra/libsql';
import { briefingAgent } from './agents/briefing-agent';
import { schedulerAgent } from './agents/scheduler-agent';
import { dailyBriefingWorkflow } from './workflows/daily-briefing';

export const mastra = new Mastra({
  agents: {
    briefing: briefingAgent,
    scheduler: schedulerAgent,
  },
  workflows: {
    dailyBriefing: dailyBriefingWorkflow,
  },
  storage: new LibSQLStore({ id: 'mastra-storage', url: 'file:./storage.db' }),
});
