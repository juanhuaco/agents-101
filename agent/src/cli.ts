import 'dotenv/config';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { mastra } from './mastra';

const RESET = '\x1b[0m';
const DIM = '\x1b[2m';
const BOLD = '\x1b[1m';
const CYAN = '\x1b[36m';
const GREEN = '\x1b[32m';

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error(
      'Falta ANTHROPIC_API_KEY. Copiá .env.example a .env y pegá tu key de https://console.anthropic.com/',
    );
    process.exit(1);
  }

  const agent = mastra.getAgent('briefing');
  const rl = readline.createInterface({ input, output });

  console.log(`${BOLD}${CYAN}🗓  Asistente de Google Calendar — Mastra demo${RESET}`);
  console.log(`${DIM}Probá: "qué tengo hoy", "buscame un hueco de 30min mañana", "agendá 1:1 con Juan el viernes 10am"${RESET}`);
  console.log(`${DIM}Ctrl+C o "salir" para terminar.${RESET}\n`);

  const threadId = `cli-${Date.now()}`;
  const resourceId = 'cli-user';

  while (true) {
    const line = (await rl.question(`${BOLD}> ${RESET}`)).trim();
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
      console.error(`\n${DIM}Error:${RESET}`, err instanceof Error ? err.message : err, '\n');
    }
  }

  rl.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
