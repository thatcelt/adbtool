import { ABSOLUTE_ADB_PATH } from '../constants';
import { AdbToolConfig } from '../schemas/config';
import { Device } from '../schemas/device';
import { AdbToolException } from '../utils/exceptions';
import { parseDevice } from '../utils/helpers';
import initLogger from '../utils/logger';
import { ProcessCatcher } from './process-catcher';

export class AdbTool {
  private __config: AdbToolConfig;
  private __processCatcher: ProcessCatcher;

  constructor(config: AdbToolConfig = {}) {
    this.__config = config;
    this.__processCatcher = new ProcessCatcher(
      config.path || ABSOLUTE_ADB_PATH,
    );

    initLogger(!!this.__config.enableLogging);
  }

  get path(): string {
    return this.__processCatcher.path;
  }

  public connect = async () => {
    await this.__processCatcher.shell(['start-server']);
  };

  public shell = async (command: string[]): Promise<string> => {
    return await this.__processCatcher.shell(command);
  };

  public device = async (): Promise<Device> => {
    const shellResult = await this.__processCatcher.shell(['devices', '-l']);

    if (shellResult.includes('unauthorized')) {
      throw new AdbToolException('Device unauthorized');
    }

    const deviceRaw = shellResult.slice(26);

    if (!deviceRaw.slice(2)) {
      throw new AdbToolException('Devices not found');
    }

    return parseDevice(deviceRaw);
  };
}
