import z from 'zod';

export const ShellArgsSchema = z.record(
  z.string(),
  z.union([z.string(), z.number()]),
);

export type ShellArgs = z.infer<typeof ShellArgsSchema>;
