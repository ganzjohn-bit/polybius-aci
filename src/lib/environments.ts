import "server-only"
import { VERCEL_ENV } from '@/lib/constants';

export function isDevelopmentEnv(): Boolean {
  return process.env.VERCEL_ENV === VERCEL_ENV.DEVELOPMENT
}

export function isPreviewEnv(): Boolean {
  return process.env.VERCEL_ENV === VERCEL_ENV.PREVIEW
}

export function isProductionEnv(): Boolean {
  return process.env.VERCEL_ENV === VERCEL_ENV.PRODUCTION
}
