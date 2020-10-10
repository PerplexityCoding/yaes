import { storageGetValue } from "@/services/chrome/storage";
import { getCurrentEnv } from "@/services/business/url";
import renderRibbon from "./components/Ribbon.js";

function main() {
  verifyCurrentUrl();
}

async function verifyCurrentUrl() {
  const config = JSON.parse(await storageGetValue("config"));
  const env = await getCurrentEnv(window.location.href, config);

  if (env?.ribbon) {
    renderRibbon(config, env);
  }
}

main();
