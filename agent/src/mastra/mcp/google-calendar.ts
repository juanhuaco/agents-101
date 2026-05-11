import { MCPClient } from '@mastra/mcp';
import { dirname, resolve } from 'node:path';
import { existsSync } from 'node:fs';

// --- Resolución del path al gcp-oauth.keys.json ---------------------------
// Bajo `mastra dev` el cwd del child process termina apuntando a algo como
// agent/src/mastra/public/, así que un path relativo no resuelve. Estrategia:
// usar GOOGLE_OAUTH_CREDENTIALS si está seteado; si no, escalar el árbol de
// directorios desde cwd buscando el archivo.
function resolveOauthPath(): string {
  const fromEnv = process.env.GOOGLE_OAUTH_CREDENTIALS;
  if (fromEnv) return resolve(fromEnv);

  let dir = process.cwd();
  while (true) {
    const candidate = resolve(dir, 'gcp-oauth.keys.json');
    if (existsSync(candidate)) return candidate;
    const insideAgent = resolve(dir, 'agent', 'gcp-oauth.keys.json');
    if (existsSync(insideAgent)) return insideAgent;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return resolve(process.cwd(), 'gcp-oauth.keys.json');
}

const oauthPath = resolveOauthPath();

// Cliente MCP que se conecta al server de la comunidad nspady/google-calendar-mcp
// (publicado como @cocal/google-calendar-mcp). Se ejecuta vía npx en stdio.
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

// --- Memoización de las tools --------------------------------------------
// Importante: bajo `mastra dev` el playground dispara múltiples requests en
// paralelo y la función `tools` del Agent se invoca cada vez. Sin caché,
// múltiples `listTools()` simultáneos causan race conditions en el MCP client
// ("Already connected to a transport" / "Not connected") y la UI queda en
// "waiting...". Cacheamos la promesa para que el handshake corra UNA sola vez.
let toolsPromise: Promise<Awaited<ReturnType<typeof calendarMcp.listTools>>> | null = null;
export function getCalendarTools() {
  if (!toolsPromise) {
    toolsPromise = calendarMcp.listTools();
  }
  return toolsPromise;
}
