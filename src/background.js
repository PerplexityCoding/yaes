import { getTab } from "@/services/chrome/tabs";
import { updateBadgeTextFromEnv } from "./services/business/badge";
import { autoUpdate, migrate } from "@/services/business/storage";

function main() {
  window.chrome.runtime.onInstalled.addListener(() => {
    onTabsActivatedUpdateBadge();
  });

  window.chrome.runtime.onUpdateAvailable.addListener(() => {
    window.chrome.runtime.reload();
  });

  onTabsActivatedUpdateBadge();
  updateConfig();
}

function onTabsActivatedUpdateBadge() {
  window.chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await getTab(activeInfo.tabId);
    if (tab) {
      updateBadgeTextFromEnv(tab.id, tab.url);
    }
  });

  window.chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (tab) {
      updateBadgeTextFromEnv(tabId, tab.url);
    }
  });
}

async function updateConfig() {
  const { config } = await migrate();
  await autoUpdate(config);
}

main();
