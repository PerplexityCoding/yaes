function storageGet(values, type = "sync") {
  return new Promise(resolve => {
    window.chrome.storage[type].get(values, async data => {
      resolve(data);
    });
  });
}

async function storageGetValue(key, type = "sync") {
  const value = await storageGet(key, type);
  if (value) {
    return value[key];
  }
  return null;
}

function storageSet(data, type = "sync") {
  return new Promise(resolve => {
    window.chrome.storage[type].set(data, () => {
      // console.log("Value is set to ", data);
      resolve(data);
    });
  });
}

function storageRemove(data, type = "sync") {
  return new Promise(resolve => {
    window.chrome.storage[type].remove(data, () => {
      // console.log("Remove Value ", data);
      resolve();
    });
  });
}

export { storageSet, storageGet, storageGetValue, storageRemove };
