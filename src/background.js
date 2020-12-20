import { getTab } from "@/services/chrome/tabs";
import { updateBadgeTextFromEnv } from "@/services/business/badge";
import { autoUpdate, migrate } from "@/services/business/storage";
import { initSentry } from "@/services/sentry/init/sw";

function main() {
  initSentry();

  chrome.runtime.onInstalled.addListener(() => {
    onTabsActivatedUpdateBadge();
  });

  chrome.runtime.onUpdateAvailable.addListener(() => {
    chrome.runtime.reload();
  });

  onTabsActivatedUpdateBadge();
  updateConfig();
}

function onTabsActivatedUpdateBadge() {
  chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await getTab(activeInfo.tabId);
    if (tab) {
      updateBadgeTextFromEnv(tab.id, tab.url);
    }
  });

  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
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
