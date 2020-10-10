export function getCurrentTab() {
  return new Promise(success => {
    window.chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
      success(tabs[0]);
    });
  });
}

export function getTab(tabId) {
  return new Promise(success => {
    window.chrome.tabs.get(tabId, tab => {
      success(tab);
    });
  });
}

export function openChromeUrl(tab, url, inNewTab) {
  if (inNewTab) {
    window.chrome.tabs.create({
      url
    });
  } else {
    window.chrome.tabs.update(tab.id, { url });
    window.close();
  }
}

export function openOptionsPage() {
  window.chrome.tabs.create({ url: "/options.html" });
}
