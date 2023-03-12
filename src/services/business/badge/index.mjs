import { setBadgeBackgroundColor, setBadgeText } from "@/services/chrome/action";

export function updateBadgeTextFromEnv(tabId, env) {
  if (env != null && env.displayBadge !== false) {
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
