import { storageGetValue } from "@/services/chrome/storage";
import { getTab } from "@/services/chrome/tabs";
import { getCurrentEnv } from "@/services/business/url";

async function main() {
  window.chrome.runtime.onInstalled.addListener(() => {
    onInstalled();
  });
}

async function onInstalled() {
  const config = JSON.parse(await storageGetValue("config"));
  if (config?.options?.displayIconBadge) {
    onTabsActivatedUpdateBadge(config);
  }
}

function onTabsActivatedUpdateBadge(config) {
  window.chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await getTab(activeInfo.tabId);
    if (tab) {
      updateBadgeTextFromEnv(config, tab.id, tab.url);
    }
  });

  window.chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    updateBadgeTextFromEnv(config, tabId, tab.url);
  });
}

async function updateBadgeTextFromEnv(config, tabId, url) {
  const env = await getCurrentEnv(url, config);
  if (env) {
    window.chrome.browserAction.setBadgeText({
      tabId,
      text: env.name
    });
  }
}

main();
