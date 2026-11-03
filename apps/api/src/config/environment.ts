import { z } from 'zod';

const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  DATABASE_URL: z.string().url().optional(),
});

export type RuntimeEnvironment = z.infer<typeof environmentSchema>;

export function parseEnvironment(environment: NodeJS.ProcessEnv): RuntimeEnvironment {
  return environmentSchema.parse(environment);
}
