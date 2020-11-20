export function waitFor(duration = 0) {
  return new Promise((success) => {
    setTimeout(() => {
      success();
    }, duration);
  });
}

export function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export function downloadAsJson(obj) {
  const data =
    "text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(obj, null, 2));

  const a = document.createElement("a");
  a.href = "data:" + data;
  a.download = "yeas-config.json";
  a.innerHTML = "download JSON";

  window.document.body.appendChild(a);
  a.click();
  a.remove();
}

export function updateArray(arr, findIndex, cb) {
  const index = findIndex(arr);
  if (index >= 0) {
    return [
      ...arr.slice(0, index),
      cb(arr[index]),
      ...arr.slice(index + 1),
    ].filter((el) => el != null);
  }
  return arr;
}

export function getNextId(idsObj, limit = 1000) {
  for (let i = 1; i < limit; i++) {
    if (!idsObj[i]) {
      return i;
    }
  }
  return null;
}

export function removeUndefined(o) {
  Object.keys(o).forEach((key) => {
    if (o[key] === undefined) {
      delete o[key];
    }
  });
}

export function arrayValidator(fn) {
  return (a) => {
    return a.reduce((acc, o) => acc && fn(o), true);
  };
}

export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function removeEmptyString(obj) {
  for (const [key, value] of Object.entries(obj)) {
    if (value === "") {
      delete obj[key];
    }
  }
}
