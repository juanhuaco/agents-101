import { config } from 'dotenv';
import { dirname, resolve } from 'node:path';
import { existsSync } from 'node:fs';

// Carga el .env explícitamente con búsqueda upward. Necesario porque bajo
// `mastra dev` el cwd cambia y dotenv/config no encuentra el .env desde el
// directorio del proyecto.
function findEnvFile(): string | undefined {
  let dir = process.cwd();
  while (true) {
    const candidate = resolve(dir, '.env');
    if (existsSync(candidate)) return candidate;
    const insideAgent = resolve(dir, 'agent', '.env');
    if (existsSync(insideAgent)) return insideAgent;
    const parent = dirname(dir);
    if (parent === dir) return undefined;
    dir = parent;
  }
}

let loaded = false;
export function loadEnv(): void {
  if (loaded) return;
  const envPath = findEnvFile();
  if (envPath) config({ path: envPath });
  loaded = true;
}

loadEnv();
