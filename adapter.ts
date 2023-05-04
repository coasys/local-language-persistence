import type { Address, Expression, ExpressionAdapter, PublicSharing, LanguageContext } from "https://esm.sh/@perspect3vism/ad4m@0.3.4";
import { PutAdapter } from "./putAdapter.ts";
import { join } from "https://deno.land/std@0.184.0/path/mod.ts";
import { exists } from "https://deno.land/std@0.184.0/fs/mod.ts";

export default class Adapter implements ExpressionAdapter {
  putAdapter: PublicSharing;
  #storagePath: string;

  constructor(context: LanguageContext) {
    this.putAdapter = new PutAdapter(context);
    //@ts-ignore
    if ("storagePath" in context.customSettings) { this.#storagePath = context.customSettings["storagePath"] } else { this.#storagePath = "./tst-tmp/languages" };
  }

  async get(address: Address): Promise<void | Expression> {
    const metaPath = join(this.#storagePath, `meta-${address}.json`)
    try {
      await exists(metaPath);
      const metaFile = JSON.parse(Deno.readTextFileSync(metaPath));
      console.log("Found meta file info", metaFile);
      return metaFile
    } catch {
      return null
    }
  }
}
