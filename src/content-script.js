import { storageGetValue } from "@/services/chrome/storage";
import { getCurrentEnv } from "@/services/business/url";
import renderRibbon from "./components/Ribbon.js";
import { mergeOptions } from "./services/business/url";

function main() {
  verifyCurrentUrl();
}

async function verifyCurrentUrl() {
  const config = mergeOptions(JSON.parse(await storageGetValue("config")));
  const env = getCurrentEnv(window.location.href, config);

  if (env?.ribbon) {
    renderRibbon(config, env);
  }
}

main();
