export function setBadgeBackgroundColor(tabId, color) {
  return (chrome.action || chrome.browserAction).setBadgeBackgroundColor({
    tabId,
    color,
  });
}

export function setBadgeText(tabId, text) {
  (chrome.action || chrome.browserAction).setBadgeText({
    tabId,
    text,
  });
}
