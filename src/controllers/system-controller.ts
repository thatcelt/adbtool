import { ProcessCatcher } from '../core/process-catcher';

export class SystemController {
  private __processCatcher: ProcessCatcher;

  constructor(processCatcher: ProcessCatcher) {
    this.__processCatcher = processCatcher;
  }
}
