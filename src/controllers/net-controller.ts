import { ProcessCatcher } from '../core/process-catcher';
import { Controller } from '../interfaces/controller';

export class NetController implements Controller {
  __processCatcher: ProcessCatcher;

  constructor(processCatcher: ProcessCatcher) {
    this.__processCatcher = processCatcher;
  }
}
