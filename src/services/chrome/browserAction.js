export function setBadgeBackgroundColor(tabId, color) {
  return window.chrome.browserAction.setBadgeBackgroundColor({
    tabId,
    color
  });
}

export function setBadgeText(tabId, text) {
  window.chrome.browserAction.setBadgeText({
    tabId,
    text
  });
}
