import './env';
import { google } from '@ai-sdk/google';

// Google AI Studio. El SDK lee GOOGLE_GENERATIVE_AI_API_KEY automáticamente del env.
// Sacá tu key gratis en https://aistudio.google.com/apikey
export const model = google(process.env.MODEL_ID ?? 'gemini-2.5-flash');
