import { getCurrentEnv } from "@/services/business/url";
import { getConfig } from "@/services/business/storage";

import {
  setBadgeBackgroundColor,
  setBadgeText
} from "@/services/chrome/browserAction";

export async function updateBadgeTextFromEnv(tabId, url) {
  const { config } = await getConfig();
  const env = getCurrentEnv(url, config);
  if (env != null && env.displayBadge !== false) {
    const color = env?.badgeOptions?.backgroundColor || "#2677c9";
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
