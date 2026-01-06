import { exec, ExecOptions } from '@actions/exec';

import { DEFAULT_LISTENERS } from '../constants';
import { LOGGER } from '../utils/logger';

export class ProcessCatcher {
  private __path: string;

  constructor(path: string) {
    this.__path = path;
  }

  get path(): string {
    return this.__path;
  }

  public shell = async (args: string[]): Promise<string> => {
    let stdout = '';

    const options: ExecOptions = {
      listeners: {
        stdout: (data: Buffer) => {
          stdout += data.toString();
        },
        ...DEFAULT_LISTENERS,
      },
      silent: true,
    };

    await exec(this.__path, args.filter(Boolean), options);
    LOGGER.info({ stdout }, 'Command sent');

    return stdout;
  };
}
