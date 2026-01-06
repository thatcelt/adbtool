import { PACKAGE_MAP } from '../constants';
import { ProcessCatcher } from '../core/process-catcher';
import { PackageType } from '../schemas/public';
import { toSplitLines } from '../utils/utils';

export class PackageController {
  private __sdcard: string;
  private __processCatcher: ProcessCatcher;

  constructor(sdcard: string, processCatcher: ProcessCatcher) {
    this.__sdcard = sdcard;
    this.__processCatcher = processCatcher;
  }

  private __getPackages = async (flags: string[] = []): Promise<string[]> => {
    return toSplitLines(
      await this.__processCatcher.shell([
        'shell',
        'pm',
        'list',
        'packages',
        ...flags,
      ]),
    );
  };

  public get = async (name: string): Promise<string[]> =>
    await this.__getPackages(['|', 'grep', name]);

  public getMany = async (type: PackageType = 'all'): Promise<string[]> =>
    await this.__getPackages([PACKAGE_MAP[type]]);

  public push = async (path: string, destination: string): Promise<string> => {
    return await this.__processCatcher.shell([
      'push',
      path,
      `${this.__sdcard}/${destination}`,
    ]);
  };

  public pull = async (path: string, destination: string): Promise<string> => {
    return await this.__processCatcher.shell([
      'pull',
      `${this.__sdcard}/${path}`,
      destination,
    ]);
  };

  public install = async (path: string): Promise<string> => {
    return await this.__processCatcher.shell([
      'shell',
      'pm',
      'install',
      `${this.__sdcard}/${path}`,
    ]);
  };
}
