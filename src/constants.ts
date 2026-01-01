import { AdbToolException } from './utils/exceptions';

export const ABSOLUTE_ADB_PATH = 'adb';

export const DEFAULT_LISTENERS = {
  stderr: (data: Buffer) => {
    if (!data.toString().includes('daemon'))
      throw new AdbToolException(data.toString());
  },
};
