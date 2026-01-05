import z from 'zod';

export const PropsTypeMapSchema = z.object({
  model: z.string(),
  manufacturer: z.string(),
  brand: z.string(),
  productName: z.string(),
  device: z.string(),
  board: z.string(),
  serialno: z.string(),
  bootSerialno: z.string(),
  gsmSerial: z.string(),
  sdkVersion: z.string().transform((val) => parseInt(val, 10)),
  androidVersion: z.string().transform((val) => parseInt(val, 10)),
  codename: z.string(),
  securityPatch: z.string(),
  cpuAbi: z.string(),
  hardware: z.string(),
  boardPlatform: z.string(),
  arch: z.string(),
  wifiCountryCode: z.string(),
  btMacAddress: z.string(),
  wifiMacAddress: z.string(),
  flashLocked: z.string().transform(Boolean),
  locale: z.string(),
  localeRegion: z.string(),
  localeLanguage: z.string(),
  timezone: z.string(),
});

export const PropsMapKeySchema = PropsTypeMapSchema.keyof();

export type PropsTypeMap = z.infer<typeof PropsTypeMapSchema>;
export type PropsMapKey = z.infer<typeof PropsMapKeySchema>;
