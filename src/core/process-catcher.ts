export class ProcessCatcher {
  private __path: string;

  constructor(path: string) {
    this.__path = path;
  }

  get path(): string {
    return this.__path;
  }

  public shell = async (args: string[]) => {};
}
