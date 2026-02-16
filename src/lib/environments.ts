import "server-only"
import { VERCEL_ENV } from '@/lib/constants';

export function isDevelopmentEnv(): boolean {
  return process.env.VERCEL_ENV === VERCEL_ENV.DEVELOPMENT
}

export function isPreviewEnv(): boolean {
  return process.env.VERCEL_ENV === VERCEL_ENV.PREVIEW
}

export function isProductionEnv(): boolean {
  return process.env.VERCEL_ENV === VERCEL_ENV.PRODUCTION
}
