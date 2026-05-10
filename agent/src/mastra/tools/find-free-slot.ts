import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

const busyInterval = z.object({
  start: z.string().describe('ISO 8601, ej: 2026-05-10T14:00:00-03:00'),
  end: z.string().describe('ISO 8601'),
});

export const findFreeSlot = createTool({
  id: 'find-free-slot',
  description:
    'Dado un rango y una lista de intervalos ocupados, encuentra el primer hueco libre de N minutos respetando working hours.',
  inputSchema: z.object({
    durationMinutes: z.number().int().positive(),
    rangeStart: z.string().describe('ISO 8601'),
    rangeEnd: z.string().describe('ISO 8601'),
    busy: z.array(busyInterval).default([]),
    workingHours: z
      .object({
        startHour: z.number().int().min(0).max(23).default(9),
        endHour: z.number().int().min(1).max(24).default(18),
      })
      .default({ startHour: 9, endHour: 18 }),
  }),
  outputSchema: z.object({
    found: z.boolean(),
    start: z.string().optional(),
    end: z.string().optional(),
    reason: z.string().optional(),
  }),
  execute: async ({ durationMinutes, rangeStart, rangeEnd, busy, workingHours }) => {
    const busyList = busy ?? [];
    const wh = { startHour: workingHours?.startHour ?? 9, endHour: workingHours?.endHour ?? 18 };

    const durationMs = durationMinutes * 60_000;
    const rangeStartMs = new Date(rangeStart).getTime();
    const rangeEndMs = new Date(rangeEnd).getTime();

    if (rangeEndMs - rangeStartMs < durationMs) {
      return { found: false, reason: 'El rango es más corto que la duración pedida.' };
    }

    const sortedBusy = [...busyList]
      .map(b => ({ start: new Date(b.start).getTime(), end: new Date(b.end).getTime() }))
      .sort((a, b) => a.start - b.start);

    const isWithinWorkingHours = (ms: number) => {
      const d = new Date(ms);
      const hour = d.getHours() + d.getMinutes() / 60;
      return hour >= wh.startHour && hour + durationMinutes / 60 <= wh.endHour;
    };

    let cursor = rangeStartMs;
    for (const b of sortedBusy) {
      if (b.start - cursor >= durationMs && isWithinWorkingHours(cursor)) {
        return {
          found: true,
          start: new Date(cursor).toISOString(),
          end: new Date(cursor + durationMs).toISOString(),
        };
      }
      cursor = Math.max(cursor, b.end);
    }

    if (rangeEndMs - cursor >= durationMs && isWithinWorkingHours(cursor)) {
      return {
        found: true,
        start: new Date(cursor).toISOString(),
        end: new Date(cursor + durationMs).toISOString(),
      };
    }

    return { found: false, reason: 'No hay huecos libres en el rango dentro de working hours.' };
  },
});
