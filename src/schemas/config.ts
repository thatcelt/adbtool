import z from 'zod';

export const AdbToolConfigSchema = z.object({
  path: z.string().optional(),
  enableLogging: z.boolean().optional(),
});

export type AdbToolConfig = z.infer<typeof AdbToolConfigSchema>;
