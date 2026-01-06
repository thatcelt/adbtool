import { PACKAGE_MAP } from '../constants';
import { ProcessCatcher } from '../core/process-catcher';
import { Controller } from '../interfaces/controller';
import { PackageType } from '../schemas/public';
import { toSplitLines } from '../utils/utils';

export class PackageController implements Controller {
  __processCatcher: ProcessCatcher;

  constructor(processCatcher: ProcessCatcher) {
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
}
