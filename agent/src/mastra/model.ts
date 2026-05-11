import 'dotenv/config';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

// Google AI Studio API. Sacá tu key gratis en https://aistudio.google.com/apikey
// El SDK por default mira GOOGLE_GENERATIVE_AI_API_KEY, pero acá usamos el nombre
// más corto y memorable GOOGLE_AI_API_KEY.
const apiKey = process.env.GOOGLE_AI_API_KEY;

if (!apiKey) {
  throw new Error(
    'Falta GOOGLE_AI_API_KEY. Copiá agent/.env.example a agent/.env y pegá tu key de https://aistudio.google.com/apikey',
  );
}

const google = createGoogleGenerativeAI({ apiKey });

// Modelo por default: gemini-2.5-flash (rápido y económico, ideal para demo en vivo).
// Override con MODEL_ID para usar otro (gemini-2.5-pro, etc).
export const model = google(process.env.MODEL_ID ?? 'gemini-2.5-flash');
