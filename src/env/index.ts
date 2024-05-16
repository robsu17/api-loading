import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  DATABASE_URL: z.string().url(),
  JWT_KEY: z.string(),
  PORT: z.coerce.number().optional().default(3333),
})

export const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid enviroment variable', _env.error.format())

  throw new Error('Invalid enviroment variables')
}

export const env = _env.data
