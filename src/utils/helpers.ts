import { Device, DeviceSchema } from '../schemas/device';

export const parseDevice = (stdout: string): Device => {
  const deviceDetails = stdout.split('       ');
  const parsedMeta = deviceDetails[1]
    .split(' ')
    .filter((line) => line.includes(':'))
    .map((line) => line.split(':')[1]);

  return DeviceSchema.parse({
    hash: deviceDetails[0],
    deviceProduct: parsedMeta[0],
    model: parsedMeta[1],
    device: parsedMeta[2],
    transportId: Number(parsedMeta[3]),
  });
};
