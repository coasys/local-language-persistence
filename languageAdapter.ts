import type { Address, LanguageAdapter, PublicSharing, LanguageContext } from "https://esm.sh/@perspect3vism/ad4m@0.3.4";
import { join } from "https://deno.land/std@0.184.0/path/mod.ts";
import { exists } from "https://deno.land/std@0.184.0/fs/mod.ts";

export default class LangAdapter implements LanguageAdapter {
  //@ts-ignore
  putAdapter: PublicSharing;
  #storagePath: string;

  constructor(context: LanguageContext) {
    //@ts-ignore
    if ("storagePath" in context.customSettings) { this.#storagePath = context.customSettings["storagePath"] } else { this.#storagePath = "./tst-tmp/languages" };
  }

  async getLanguageSource(address: Address): Promise<string> {
    const bundlePath = join(this.#storagePath, `bundle-${address}.js`);
    if (await exists(bundlePath)) {
      //@ts-ignore
      const metaFile = Deno.readTextFileSync(bundlePath);
      return metaFile
    } else {
      throw new Error("Did not find language source for given address:" + address);
    }
  }
}
