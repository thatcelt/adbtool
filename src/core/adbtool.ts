import { ABSOLUTE_ADB_PATH, PROPS_COMMANDS, SDCARD_PATH } from '../constants';
import { InterController } from '../controllers/inter-controller';
import { NetController } from '../controllers/net-controller';
import { PackageController } from '../controllers/package-controller';
import { SystemController } from '../controllers/system-controller';
import { AdbToolConfig } from '../schemas/config';
import { Device } from '../schemas/device';
import { PropsMapKey, PropsTypeMap, PropsTypeMapSchema } from '../schemas/maps';
import { AdbToolException } from '../utils/exceptions';
import { parseDevice } from '../utils/helpers';
import initLogger from '../utils/logger';
import { ProcessCatcher } from './process-catcher';

export class AdbTool {
  private __config: AdbToolConfig;
  private __processCatcher: ProcessCatcher;

  private __packageController?: PackageController;
  private __netController?: NetController;
  private __interController?: InterController;
  private __systemController?: SystemController;

  constructor(config: AdbToolConfig = {}) {
    this.__config = config;
    this.__processCatcher = new ProcessCatcher(config.adb || ABSOLUTE_ADB_PATH);

    initLogger(!!this.__config.enableLogging);
  }

  get path(): string {
    return this.__processCatcher.path;
  }

  get packages() {
    if (!this.__packageController) {
      return (this.__packageController = new PackageController(
        this.__config.sdcard || SDCARD_PATH,
        this.__processCatcher,
      ));
    }
    return this.__packageController;
  }

  get net() {
    if (!this.__netController) {
      return (this.__netController = new NetController(this.__processCatcher));
    }
    return this.__netController;
  }

  get inter() {
    if (!this.__interController) {
      return (this.__interController = new InterController(
        this.__processCatcher,
      ));
    }
    return this.__interController;
  }

  get system() {
    if (!this.__systemController) {
      return (this.__systemController = new SystemController(
        this.__processCatcher,
      ));
    }
    return this.__systemController;
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

  public prop = async <T extends PropsMapKey>(
    prop: T,
  ): Promise<PropsTypeMap[T]> => {
    const rawProp = await this.__processCatcher.shell([
      'shell',
      `getprop ${PROPS_COMMANDS[prop]}`,
    ]);

    return PropsTypeMapSchema.shape[prop].parse(rawProp) as PropsTypeMap[T];
  };
}
