import { AdbTool } from './core/adbtool';

(async () => {
  const adb = new AdbTool({ enableLogging: true });
  console.log(await adb.device());
})();
