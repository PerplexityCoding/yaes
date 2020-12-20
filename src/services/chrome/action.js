export function setBadgeBackgroundColor(tabId, color) {
  return chrome.action.setBadgeBackgroundColor({
    tabId,
    color,
  });
}

export function setBadgeText(tabId, text) {
  chrome.action.setBadgeText({
    tabId,
    text,
  });
}
