import { MCPClient } from '@mastra/mcp';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';

// Resolver el path al gcp-oauth.keys.json a path ABSOLUTO en tiempo de import.
// Importante: el child process del MCP server hereda un cwd distinto bajo `mastra dev`
// (apunta a algo como src/mastra/public/), así que un path relativo no resuelve.
function resolveOauthPath(): string {
  const fromEnv = process.env.GOOGLE_OAUTH_CREDENTIALS;
  if (fromEnv) return resolve(fromEnv);

  // Buscar en ubicaciones comunes desde el cwd actual.
  const candidates = [
    resolve(process.cwd(), 'gcp-oauth.keys.json'),
    resolve(process.cwd(), 'agent/gcp-oauth.keys.json'),
    resolve(process.cwd(), '../gcp-oauth.keys.json'),
  ];

  for (const path of candidates) {
    if (existsSync(path)) return path;
  }
  return candidates[0];
}

const oauthPath = resolveOauthPath();

// Cliente MCP que se conecta al server de la comunidad nspady/google-calendar-mcp
// (publicado como @cocal/google-calendar-mcp). Se ejecuta vía npx en stdio.
//
// Auth: requiere un gcp-oauth.keys.json. La primera corrida abre el browser para
// autorizar; los tokens se cachean en ~/.config/google-calendar-mcp/tokens.json.
export const calendarMcp = new MCPClient({
  id: 'google-calendar',
  servers: {
    googleCalendar: {
      command: 'npx',
      args: ['-y', '@cocal/google-calendar-mcp'],
      env: {
        GOOGLE_OAUTH_CREDENTIALS: oauthPath,
      },
    },
  },
});
