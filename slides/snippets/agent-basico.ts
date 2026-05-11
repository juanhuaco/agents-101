// @ts-nocheck — snippet pedagógico para slides (no se compila acá)
// PASO 1 — Agente básico con una tool custom
import { Agent } from '@mastra/core/agent';
import { google } from '@ai-sdk/google';
import { findFreeSlot } from '../tools/find-free-slot';

export const briefingAgent = new Agent({
  id: 'briefing',
  name: 'briefing-agent',
  instructions: `
    Sos un asistente personal de calendario. Hablás en español rioplatense.
    Resumí la agenda, detectá conflictos y sugerí slots libres.
  `.trim(),
  // El SDK lee GOOGLE_GENERATIVE_AI_API_KEY del env automáticamente.
  model: google('gemini-2.5-flash'),
  tools: { findFreeSlot },
});
