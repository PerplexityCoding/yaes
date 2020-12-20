export function getCurrentTab() {
  return new Promise((success) => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      success(tabs[0]);
    });
  });
}

export function getTab(tabId) {
  return new Promise((success) => {
    chrome.tabs.get(tabId, (tab) => {
      success(tab);
    });
  });
}

export function openChromeUrl(tab, url, inNewTab) {
  if (inNewTab) {
    chrome.tabs.create({
      url,
      active: false,
    });
  } else {
    chrome.tabs.update(tab.id, { url });
    window.close();
  }
}

export function openOptionsPage() {
  chrome.tabs.create({ url: "/options.html" });
}
