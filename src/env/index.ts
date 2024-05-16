import { z } from 'zod'

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_KEY: z.string(),
  PORT: z.coerce.number().optional().default(3333),
})

export const _Env = envSchema.safeParse(process.env)

if (!_Env.success) {
  throw new Error('Erro validation env')
}

export const env = _Env.data
