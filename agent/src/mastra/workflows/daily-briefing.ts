import { createWorkflow, createStep } from '@mastra/core/workflows';
import { z } from 'zod';
import { briefingAgent } from '../agents/briefing-agent';
import { schedulerAgent } from '../agents/scheduler-agent';

// Schema del handoff: lo que el agente de briefing puede pasarle al de scheduling.
const briefingOutputSchema = z.object({
  summary: z.string().describe('Resumen de la agenda en español, en bullets cortos.'),
  handoff: z.boolean().describe('true si el usuario quiere crear un evento.'),
  suggestedSlot: z
    .object({ start: z.string(), end: z.string() })
    .optional()
    .describe('Slot libre encontrado, si hay.'),
  schedulingIntent: z
    .string()
    .optional()
    .describe('Descripción NL del evento a crear, con título/duración/participantes/hora.'),
});

const briefingStep = createStep({
  id: 'briefing',
  description:
    'Resume la agenda y, si corresponde, propone un slot libre para una reunión nueva.',
  inputSchema: z.object({ userMessage: z.string() }),
  outputSchema: briefingOutputSchema,
  execute: async ({ inputData }) => {
    const result = await briefingAgent.generate(inputData.userMessage, {
      structuredOutput: { schema: briefingOutputSchema },
    });
    return result.object;
  },
});

const scheduleStep = createStep({
  id: 'schedule',
  description:
    'Crea el evento en el calendario si el briefing identificó intent de scheduling.',
  inputSchema: briefingOutputSchema,
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
