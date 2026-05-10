import { MCPClient } from '@mastra/mcp';

// Cliente MCP que se conecta al server de la comunidad nspady/google-calendar-mcp.
// Se publica en npm como @cocal/google-calendar-mcp y se ejecuta vía npx (stdio).
//
// Auth: requiere un gcp-oauth.keys.json en la raíz del proyecto (ver README).
// La primera corrida abre el browser para autorizar; después los tokens se cachean.
export const calendarMcp = new MCPClient({
  id: 'google-calendar',
  servers: {
    googleCalendar: {
      command: 'npx',
      args: ['-y', '@cocal/google-calendar-mcp'],
      env: {
        GOOGLE_OAUTH_CREDENTIALS:
          process.env.GOOGLE_OAUTH_CREDENTIALS ?? './gcp-oauth.keys.json',
      },
    },
  },
});
