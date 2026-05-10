// PASO 3 — Workflow multi-agente con handoff
import { createWorkflow, createStep } from '@mastra/core/workflows';
import { z } from 'zod';
import { briefingAgent } from './agents/briefing-agent';
import { schedulerAgent } from './agents/scheduler-agent';

const briefingStep = createStep({
  id: 'briefing',
  inputSchema: z.object({ userMessage: z.string() }),
  outputSchema: z.object({
    summary: z.string(),
    handoff: z.boolean(),
    suggestedSlot: z.object({ start: z.string(), end: z.string() }).optional(),
    schedulingIntent: z.string().optional(),
  }),
  execute: async ({ inputData }) => {
    const r = await briefingAgent.generate(inputData.userMessage, {
      output: /* schema */,
    });
    return r.object;
  },
});

const scheduleStep = createStep({
  id: 'schedule',
  inputSchema: /* output del paso anterior */,
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
