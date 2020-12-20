export function requestPermissions(options) {
  return new Promise((resolve) => {
    chrome.permissions.request(options, resolve);
  });
}

export function containsPermissions(options) {
  return new Promise((resolve) => {
    chrome.permissions.contains(options, resolve);
  });
}

export function removePermissions(options) {
  return new Promise((resolve) => {
    console.log(options);
    chrome.permissions.remove(options, resolve);
  });
}

export function getAllPermissions() {
  return new Promise((resolve) => {
    chrome.permissions.getAll(resolve);
  });
}
