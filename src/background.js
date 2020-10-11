import { storageGetValue } from "@/services/chrome/storage";
import { getTab } from "@/services/chrome/tabs";
import { getCurrentEnv } from "@/services/business/url";
import {mergeOptions} from "./services/business/url";

async function main() {
  window.chrome.runtime.onInstalled.addListener(() => {
    onInstalled();
  });
  onTabsActivatedUpdateBadge();
}

async function getConfig() {
  const configString = await storageGetValue("config");
  if (configString) {
    return mergeOptions(JSON.parse(configString));
  }
  return null;
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

async function updateBadgeTextFromEnv(tabId, url) {
  const config = await getConfig();
  const env = getCurrentEnv(url, config);
  if (env?.badge !== false) {
    const color = env?.badge?.color || "#2677c9";
    window.chrome.browserAction.setBadgeBackgroundColor({
      color,
      tabId
    });

    const text = (env.shortName || env.name).substring(0, 4) || "";
    window.chrome.browserAction.setBadgeText({
      tabId,
      text
    });

    return;
  }
  cleaBadgeText();
}

function cleaBadgeText(tabId) {
  window.chrome.browserAction.setBadgeText({
    tabId,
    text: ""
  });
}

main();
