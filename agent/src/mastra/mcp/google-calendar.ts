import { MCPClient } from '@mastra/mcp';

// Cliente MCP que se conecta al server de la comunidad nspady/google-calendar-mcp
// (publicado como @cocal/google-calendar-mcp). Se ejecuta vía npx en stdio.
//
// Auth: requiere un gcp-oauth.keys.json en la raíz del proyecto.
// La primera corrida abre el browser para autorizar; los tokens se cachean
// en ~/.config/google-calendar-mcp/tokens.json.
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
