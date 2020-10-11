import { getTab } from "@/services/chrome/tabs";
import { updateBadgeTextFromEnv } from "./services/business/badge";

async function main() {
  window.chrome.runtime.onInstalled.addListener(() => {
    onInstalled();
  });
  onTabsActivatedUpdateBadge();
}

async function onInstalled() {
  onTabsActivatedUpdateBadge();
}

function onTabsActivatedUpdateBadge() {
  window.chrome.tabs.onActivated.addListener(async activeInfo => {
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

main();
