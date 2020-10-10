import { storageGetValue } from "@/services/chrome/storage";
import { getTab } from "@/services/chrome/tabs";
import { getCurrentEnv } from "@/services/business/url";

async function main() {
  window.chrome.runtime.onInstalled.addListener(() => {
    onInstalled();
  });
}

async function getConfig() {
  const configString = await storageGetValue("config");
  if (configString) {
    return JSON.parse(configString);
  }
  return null;
}

async function onInstalled() {
  const config = await getConfig();
  if (config?.options?.displayBadge) {
    onTabsActivatedUpdateBadge(config);
  }
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

async function updateBadgeTextFromEnv(tabId, url) {
  const config = await getConfig();
  if (config) {
    const env = await getCurrentEnv(url, config);
    if (env) {
      const color = env.badgeColor || config.options?.badgeColor || "#2677c9";
      if (color) {
        window.chrome.browserAction.setBadgeBackgroundColor({
          color,
          tabId
        });
      }

      const text = (env.shortName || env.name).substring(0, 4);
      window.chrome.browserAction.setBadgeText({
        tabId,
        text
      });
    }
  }
}

main();
