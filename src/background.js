import { getTab } from "@/services/chrome/tabs";
import { updateBadgeTextFromEnv } from "./services/business/badge";
import { autoUpdate, migrate } from "@/services/business/storage";

async function main() {
  window.chrome.runtime.onInstalled.addListener(() => {
    onTabsActivatedUpdateBadge();
  });

  window.chrome.runtime.onUpdateAvailable.addListener(() => {
    updateConfig();
    window.chrome.runtime.reload();
  });

  window.chrome.runtime.onStartup.addListener(() => {
    updateConfig();
  });

  onTabsActivatedUpdateBadge();
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
