import { getCurrentEnv } from "@/services/business/url";
import { mergeOptions } from "../url";
import { storageGetValue } from "../../chrome/storage";
import {
  setBadgeBackgroundColor,
  setBadgeText
} from "@/services/chrome/browserAction";

async function getConfig() {
  const configString = await storageGetValue("config");
  if (configString) {
    return mergeOptions(JSON.parse(configString));
  }
  return null;
}

export async function updateBadgeTextFromEnv(tabId, url) {
  const config = await getConfig();
  const env = getCurrentEnv(url, config);
  if (env?.badge !== false) {
    const color = env?.badge?.backgroundColor || "#2677c9";
    setBadgeBackgroundColor(tabId, color);

    const text = (env.shortName || env.name).substring(0, 4) || "";
    setBadgeText(tabId, text);

    return;
  }
  clearBadgeText(tabId);
}

function clearBadgeText(tabId) {
  setBadgeText(tabId, "");
}
