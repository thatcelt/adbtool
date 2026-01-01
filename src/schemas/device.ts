import z from 'zod';

export const DeviceSchema = z.object({
  hash: z.string(),
  deviceProduct: z.string(),
  model: z.string(),
  device: z.string(),
  transportId: z.number(),
});

export type Device = z.infer<typeof DeviceSchema>;
