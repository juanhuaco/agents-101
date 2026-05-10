import { createWorkflow, createStep } from '@mastra/core/workflows';
import { z } from 'zod';
import { briefingAgent } from '../agents/briefing-agent';
import { schedulerAgent } from '../agents/scheduler-agent';

const briefingStep = createStep({
  id: 'briefing',
  description: 'Resume la agenda y, si corresponde, propone un slot libre para una reunión nueva.',
  inputSchema: z.object({
    userMessage: z.string(),
  }),
  outputSchema: z.object({
    summary: z.string(),
    handoff: z.boolean(),
    suggestedSlot: z
      .object({ start: z.string(), end: z.string() })
      .optional(),
    schedulingIntent: z.string().optional(),
  }),
  execute: async ({ inputData }) => {
    const result = await briefingAgent.generate(inputData.userMessage, {
      output: z.object({
        summary: z.string(),
        handoff: z.boolean(),
        suggestedSlot: z
          .object({ start: z.string(), end: z.string() })
          .optional(),
        schedulingIntent: z.string().optional(),
      }),
    });
    return result.object;
  },
});

const scheduleStep = createStep({
  id: 'schedule',
  description: 'Crea el evento en el calendario si el briefing identificó intent de scheduling.',
  inputSchema: z.object({
    summary: z.string(),
    handoff: z.boolean(),
    suggestedSlot: z
      .object({ start: z.string(), end: z.string() })
      .optional(),
    schedulingIntent: z.string().optional(),
  }),
  outputSchema: z.object({
    briefing: z.string(),
    schedulingResult: z.string().optional(),
  }),
  execute: async ({ inputData }) => {
    if (!inputData.handoff || !inputData.schedulingIntent) {
      return { briefing: inputData.summary };
    }
    const prompt = [
      `Intent: ${inputData.schedulingIntent}`,
      inputData.suggestedSlot
        ? `Slot sugerido: ${inputData.suggestedSlot.start} → ${inputData.suggestedSlot.end}`
        : '',
    ]
      .filter(Boolean)
      .join('\n');
    const result = await schedulerAgent.generate(prompt);
    return {
      briefing: inputData.summary,
      schedulingResult: result.text,
    };
  },
});

export const dailyBriefingWorkflow = createWorkflow({
  id: 'daily-briefing',
  description:
    'Workflow de dos pasos: el agente de briefing resume y, si detecta intent de scheduling, hace handoff al agente que crea el evento.',
  inputSchema: z.object({ userMessage: z.string() }),
  outputSchema: z.object({
    briefing: z.string(),
    schedulingResult: z.string().optional(),
  }),
})
  .then(briefingStep)
  .then(scheduleStep)
  .commit();
