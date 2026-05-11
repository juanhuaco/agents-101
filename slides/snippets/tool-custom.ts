// @ts-nocheck — snippet pedagógico para slides (no se compila acá)
// PASO 1 (bis) — Tool custom: lógica de negocio propia
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const findFreeSlot = createTool({
  id: 'find-free-slot',
  description:
    'Encuentra el primer hueco libre de N minutos en un rango, respetando working hours.',
  inputSchema: z.object({
    durationMinutes: z.number().int().positive(),
    rangeStart: z.string(),
    rangeEnd: z.string(),
    busy: z.array(z.object({ start: z.string(), end: z.string() })).default([]),
    workingHours: z
      .object({ startHour: z.number(), endHour: z.number() })
      .default({ startHour: 9, endHour: 18 }),
  }),
  execute: async ({ durationMinutes, rangeStart, rangeEnd, busy, workingHours }) => {
    // lógica que recorre los busy intervals y encuentra el primer gap
    return { found: true, start: '...', end: '...' };
  },
});
