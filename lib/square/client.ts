import "server-only";

import { SquareClient, SquareEnvironment } from "square";

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function isSquareConfigured(): boolean {
  return Boolean(
    process.env.SQUARE_ACCESS_TOKEN?.trim() &&
      process.env.SQUARE_LOCATION_ID?.trim(),
  );
}

export function getSquareLocationId(): string {
  return requireEnv("SQUARE_LOCATION_ID");
}

export function getSquareEnvironment(): string {
  const env = (process.env.SQUARE_ENVIRONMENT ?? "sandbox").toLowerCase();
  return env === "production"
    ? SquareEnvironment.Production
    : SquareEnvironment.Sandbox;
}

let cachedClient: SquareClient | null = null;

export function getSquareClient(): SquareClient {
  if (cachedClient) return cachedClient;

  cachedClient = new SquareClient({
    token: requireEnv("SQUARE_ACCESS_TOKEN"),
    environment: getSquareEnvironment(),
  });

  return cachedClient;
}

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;
  return "http://localhost:3000";
}
