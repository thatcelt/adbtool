import { ProcessCatcher } from '../core/process-catcher';

export class InterController {
  private __processCatcher: ProcessCatcher;

  constructor(processCatcher: ProcessCatcher) {
    this.__processCatcher = processCatcher;
  }
}
