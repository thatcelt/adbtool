import z from 'zod';

export const PackageEnum = z.enum(['all', 'system', 'third-party']);

export type PackageType = z.infer<typeof PackageEnum>;
