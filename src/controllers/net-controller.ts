import { ProcessCatcher } from '../core/process-catcher';

export class NetController {
  private __processCatcher: ProcessCatcher;

  constructor(processCatcher: ProcessCatcher) {
    this.__processCatcher = processCatcher;
  }
}
