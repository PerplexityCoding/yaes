import { getConfig } from "@/services/business/storage";
import { getCurrentEnv } from "@/services/business/url";
import renderRibbon from "./components/Ribbon.js";
import { mergeOptions } from "./services/business/url";

function main() {
  verifyCurrentUrl();
}

async function verifyCurrentUrl() {
  const config = mergeOptions(await getConfig("config"));
  const env = getCurrentEnv(window.location.href, config);

  if (env?.ribbon) {
    renderRibbon(config, env);
  }
}

main();
