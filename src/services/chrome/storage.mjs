function storageGet(values, type = "sync") {
  return new Promise((resolve) => {
    chrome.storage[type].get(values, (data) => {
      // console.log(data);
      resolve(data);
    });
  });
}

function storageSet(data, type = "sync") {
  return new Promise((resolve) => {
    chrome.storage[type].set(data, () => {
      // console.log("Value is set to ", data);
      resolve(data);
    });
  });
}

function storageRemove(data, type = "sync") {
  return new Promise((resolve) => {
    chrome.storage[type].remove(data, () => {
      // console.log("Remove Value ", data);
      resolve();
    });
  });
}

function storageClear(data, type = "sync") {
  return new Promise((resolve) => {
    chrome.storage[type].clear(() => {
      resolve();
    });
  });
}

export { storageSet, storageGet, storageRemove, storageClear };
