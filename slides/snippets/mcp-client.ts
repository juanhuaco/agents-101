// PASO 2 — Conectar un MCP server externo (Google Calendar)
import { MCPClient } from '@mastra/mcp';

export const calendarMcp = new MCPClient({
  id: 'google-calendar',
  servers: {
    googleCalendar: {
      command: 'npx',
      args: ['-y', '@cocal/google-calendar-mcp'],
      env: { GOOGLE_OAUTH_CREDENTIALS: './gcp-oauth.keys.json' },
    },
  },
});

// En el agente, mezclamos tools del MCP con nuestras tools custom:
export const briefingAgent = new Agent({
  id: 'briefing',
  name: 'briefing-agent',
  instructions: '...',
  model: anthropic('claude-sonnet-4-6'),
  tools: async () => ({
    ...(await calendarMcp.listTools()), // list-events, create-event, freebusy, ...
    findFreeSlot,                        // nuestra tool custom
  }),
});
