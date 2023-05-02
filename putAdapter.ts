import type { Address, AgentService, PublicSharing, LanguageContext, LanguageLanguageInput} from "https://esm.sh/@perspect3vism/ad4m@0.3.4";
import { join } from "https://deno.land/std@0.184.0/path/mod.ts";

export default function sleep(ms: number): Promise<any> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class PutAdapter implements PublicSharing {
  #agent: AgentService;
  #storagePath: string;

  constructor(context: LanguageContext) {
    this.#agent = context.agent;
    //@ts-ignore
    if ("storagePath" in context.customSettings) { this.#storagePath = context.customSettings["storagePath"] } else { this.#storagePath = "./tst-tmp/languages" };
  }

  async createPublic(language: LanguageLanguageInput): Promise<Address> {
    // @ts-ignore
    const hash = UTILS.hash(language.bundle.toString());

    if(hash != language.meta.address)
      throw new Error(`Language Persistence: Can't store language. Address stated in meta differs from actual file\nWanted: ${language.meta.address}\nGot: ${hash}`)

    const agent = this.#agent;
    const expression = agent.createSignedExpression(language.meta);
    const metaPath = join(this.#storagePath, `meta-${hash}.json`);
    const bundlePath = join(this.#storagePath, `bundle-${hash}.js`);
    console.log("Writing meta & bundle path: ", metaPath, bundlePath);
    Deno.writeTextFileSync(metaPath, JSON.stringify(expression));
    Deno.writeTextFileSync(bundlePath, language.bundle.toString());

    return hash as Address;
  }
}
