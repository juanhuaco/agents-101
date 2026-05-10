// PASO 1 — Agente básico con una tool custom
import { Agent } from '@mastra/core/agent';
import { anthropic } from '@ai-sdk/anthropic';
import { findFreeSlot } from '../tools/find-free-slot';

export const briefingAgent = new Agent({
  id: 'briefing',
  name: 'briefing-agent',
  instructions: `
    Sos un asistente personal de calendario. Hablás en español rioplatense.
    Resumí la agenda, detectá conflictos y sugerí slots libres.
  `.trim(),
  model: anthropic('claude-sonnet-4-6'),
  tools: { findFreeSlot },
});
