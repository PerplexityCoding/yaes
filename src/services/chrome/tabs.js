export function getCurrentTab() {
  return new Promise(success => {
    if (window.chrome) {
      window.chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
        success(tabs[0]);
      });
    }
  });
}

export function openChromeUrl(tab, url, inNewTab) {
  if (window.chrome) {
    if (inNewTab) {
      window.chrome.tabs.create({
        url
      });
    } else {
      window.chrome.tabs.update(tab.id, { url });
      window.close();
    }
  }
}

export function openOptionsPage() {
  if (window.chrome) {
    window.chrome.tabs.create({ url: "/options.html" });
  }
}
