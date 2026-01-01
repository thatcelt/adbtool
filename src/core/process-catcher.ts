export class ProcessCatcher {
  private __path: string;

  constructor(path: string) {
    this.__path = path;
  }

  private __handleSTD = async () => {};

  public shell = async () => {};
}
