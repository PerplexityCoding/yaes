import { storageGetValue } from "@/services/chrome/storage";
import renderRibbon from "./components/Ribbon.js";

function main() {
  verifyCurrentUrl();
}

async function verifyCurrentUrl() {
  const configString = await storageGetValue("config");
  if (!configString) {
    return;
  }

  const envs = JSON.parse(configString).envs;
  for (const env of envs) {
    const hostname = new URL(env.url).hostname;
    if (window.location.hostname === hostname) {
      renderRibbon(env);
    }
  }
}

main();
