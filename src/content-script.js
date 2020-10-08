import { storageGetValue } from "@/services/chrome/storage";

function main() {
  verifyCurrentUrl();
}

async function verifyCurrentUrl() {
  const envsString = await storageGetValue("envs");
  if (!envsString) {
    return;
  }

  const envs = JSON.parse(envsString);
  for (const env of envs) {
    const hostname = new URL(env.url).hostname;
    if (window.location.hostname === hostname) {
      const src = window.chrome.runtime.getURL("js/content-main.esm.js");
      const module = await import(/* webpackIgnore: true */ src);
      module.addComponent("yaes-ribbon", module.Ribbon, {
        env
      });
    }
  }
}

main();
