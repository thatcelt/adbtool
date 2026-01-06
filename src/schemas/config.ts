import z from 'zod';

export const AdbToolConfigSchema = z.object({
  adb: z.string().optional(),
  sdcard: z.string().optional(),
  enableLogging: z.boolean().optional(),
});

export type AdbToolConfig = z.infer<typeof AdbToolConfigSchema>;
