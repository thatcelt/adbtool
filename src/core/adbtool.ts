import { ABSOLUTE_ADB_PATH } from '../constants';
import { AdbToolConfig } from '../schemas/config';
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
}
