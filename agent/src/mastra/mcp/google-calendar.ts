import { MCPClient } from '@mastra/mcp';
import { dirname, resolve } from 'node:path';
import { existsSync } from 'node:fs';

// Resolver el path al gcp-oauth.keys.json a path ABSOLUTO.
// Importante: bajo `mastra dev` el cwd del child process termina apuntando a
// algo como agent/src/mastra/public/, así que un path relativo no resuelve.
// Estrategia: usar GOOGLE_OAUTH_CREDENTIALS si está seteado; si no, escalar
// el árbol de directorios desde cwd buscando el archivo.
function resolveOauthPath(): string {
  const fromEnv = process.env.GOOGLE_OAUTH_CREDENTIALS;
  if (fromEnv) return resolve(fromEnv);

  let dir = process.cwd();
  // Escalar hasta la raíz buscando el archivo. Cubre tanto cwd=/agent como
  // cwd=/agent/src/mastra/public bajo mastra dev.
  while (true) {
    const candidate = resolve(dir, 'gcp-oauth.keys.json');
    if (existsSync(candidate)) return candidate;

    const insideAgent = resolve(dir, 'agent', 'gcp-oauth.keys.json');
    if (existsSync(insideAgent)) return insideAgent;

    const parent = dirname(dir);
    if (parent === dir) break; // llegamos a la raíz
    dir = parent;
  }

  // No encontrado — devolver un default razonable para mejor mensaje de error.
  return resolve(process.cwd(), 'gcp-oauth.keys.json');
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
