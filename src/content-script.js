import { getFixConfig } from "@/services/business/storage/get";
import { getCurrentEnv } from "@/services/business/url";
import renderRibbon from "./components/Ribbon.js";

async function main() {
  await verifyCurrentUrl();
}

async function verifyCurrentUrl() {
  const { config } = await getFixConfig();
  const env = getCurrentEnv(window.location.href, config);

  if (env != null && env.displayRibbon !== false) {
    renderRibbon(config, env);
  }
}

main();
