import { getConfig } from "@/services/business/storage";
import { getCurrentEnv } from "@/services/business/url";
import renderRibbon from "./components/Ribbon.js";

function main() {
  verifyCurrentUrl();
}

async function verifyCurrentUrl() {
  const { config } = getConfig({ mergeOptions: true });
  const env = getCurrentEnv(window.location.href, config);

  if (env?.displayRibbon) {
    renderRibbon(config, env);
  }
}

main();
