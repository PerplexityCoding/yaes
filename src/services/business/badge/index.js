import { getCurrentEnv } from "@/services/business/url";
import { getConfig } from "@/services/business/storage/get";

import { setBadgeBackgroundColor, setBadgeText } from "@/services/chrome/browserAction";
import { loadSentry } from "@/services/sentry/loader";

export async function updateBadgeTextFromEnv(tabId, url) {
  const { config } = await getConfig();
  const env = getCurrentEnv(url, config);
  if (env != null && env.displayBadge !== false) {
    loadSentry();
    const color = env.badgeOptions.backgroundColor;
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
