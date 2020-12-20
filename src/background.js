import { getTab } from "@/services/chrome/tabs";
import { updateBadgeTextFromEnv } from "@/services/business/badge";
import { autoUpdate, migrate } from "@/services/business/storage";
import { initSentry } from "@/services/sentry/init/sw";
import { getConfig } from "@/services/business/storage/get";
import { getCurrentEnv } from "@/services/business/url";

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
    updateTab(activeInfo.tabId);
  });

  chrome.tabs.onUpdated.addListener(async (tabId) => {
    updateTab(tabId);
  });
}

async function updateTab(tabId) {
  const tab = await getTab(tabId);
  if (tab) {
    const { config } = await getConfig();
    const env = getCurrentEnv(tab.url, config);

    if (env) {
      if (env.displayRibbon !== false) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["js/content-script/content-script.umd.js"],
        });
      }
      updateBadgeTextFromEnv(tabId, env);
    }
  }
}

async function updateConfig() {
  const { config } = await migrate();
  await autoUpdate(config);
}

main();
