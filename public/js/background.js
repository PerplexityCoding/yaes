async function main() {
  chrome.runtime.onInstalled.addListener(function () {
    onInstalled();
  });
}

async function onInstalled() {
  addPageRule();
}

function addPageRule() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { schemes: ["http", "https"] },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
}

main();
