import 'dotenv/config';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { mastra } from './mastra';
import { calendarMcp } from './mastra/mcp/google-calendar';

const RESET = '\x1b[0m';
const DIM = '\x1b[2m';
const BOLD = '\x1b[1m';
const CYAN = '\x1b[36m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';

// Mapea errores de la SDK / providers a un mensaje humano.
function formatError(err: unknown): string {
  if (!(err instanceof Error)) return `${RED}⚠  ${String(err)}${RESET}`;

  const e = err as Error & { statusCode?: number; provider?: string; cause?: unknown };
  const status = e.statusCode;
  const provider = e.provider ? ` (${e.provider})` : '';

  if (status === 503) {
    return `${YELLOW}⚠  El modelo está sobrecargado${provider}. Esperá unos segundos y probá de nuevo.${RESET}`;
  }
  if (status === 429) {
    return `${YELLOW}⚠  Rate limit alcanzado${provider}. Esperá un momento o cambiá el modelo (MODEL_ID).${RESET}`;
  }
  if (status === 401 || status === 403) {
    return `${RED}⚠  API key inválida o sin permisos${provider}. Revisá tu .env.${RESET}`;
  }
  if (status === 400) {
    return `${YELLOW}⚠  Pedido inválido${provider}: ${e.message}${RESET}`;
  }
  if (status && status >= 500) {
    return `${YELLOW}⚠  Error del servidor${provider} (${status}). Probá de nuevo en un rato.${RESET}`;
  }
  // MCP / tool / network errors no traen statusCode
  if (e.message.includes('MCP') || e.message.includes('not connected')) {
    return `${YELLOW}⚠  Problema con el MCP de Google Calendar. ¿El gcp-oauth.keys.json es válido?${RESET}`;
  }
  return `${RED}⚠  ${e.message}${RESET}`;
}

async function main() {
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    console.error(
      'Falta GOOGLE_GENERATIVE_AI_API_KEY. Copiá .env.example a .env y pegá tu key de https://aistudio.google.com/apikey',
    );
    process.exit(1);
  }

  const agent = mastra.getAgent('briefing');
  const rl = readline.createInterface({ input, output });

  console.log(`${BOLD}${CYAN}🗓  Asistente de Google Calendar — Mastra demo${RESET}`);
  console.log(`${DIM}Probá: "qué tengo hoy", "buscame un hueco de 30min mañana", "agendá 1:1 con Juan el viernes 10am"${RESET}`);
  console.log(`${DIM}Ctrl+C o "salir" para terminar.${RESET}\n`);

  // Pre-cargar el MCP server con feedback visible. Sin esto, el primer prompt
  // queda colgado mientras npx descarga el paquete + hace OAuth handshake.
  process.stdout.write(`${DIM}Conectando con Google Calendar...${RESET}`);
  try {
    await calendarMcp.listTools();
    process.stdout.write(`${GREEN} ✓${RESET}\n\n`);
  } catch (err) {
    process.stdout.write(`${RED} ✗${RESET}\n${formatError(err)}\n\n`);
    rl.close();
    process.exit(1);
  }

  const threadId = `cli-${Date.now()}`;
  const resourceId = 'cli-user';

  while (true) {
    let line: string;
    try {
      line = (await rl.question(`${BOLD}> ${RESET}`)).trim();
    } catch {
      break;
    }
    if (!line) continue;
    if (line === 'salir' || line === 'exit') break;

    try {
      const stream = await agent.stream(line, {
        memory: { thread: threadId, resource: resourceId },
      });

      process.stdout.write(`${GREEN}`);
      for await (const chunk of stream.textStream) {
        process.stdout.write(chunk);
      }
      process.stdout.write(`${RESET}\n\n`);
    } catch (err) {
      console.error(`\n${formatError(err)}\n`);
    }
  }

  rl.close();
}

main().catch(err => {
  console.error(formatError(err));
  process.exit(1);
});
