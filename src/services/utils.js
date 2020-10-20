export function waitFor(duration = 0) {
  return new Promise(success => {
    setTimeout(() => {
      success();
    }, duration);
  });
}

export function getContrast(hexcolor) {
  // If a leading # is provided, remove it
  if (hexcolor.slice(0, 1) === "#") {
    hexcolor = hexcolor.slice(1);
  }

  // If a three-character hexcode, make six-character
  if (hexcolor.length === 3) {
    hexcolor = hexcolor
      .split("")
      .map(function(hex) {
        return hex + hex;
      })
      .join("");
  }

  // Convert to RGB value
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);

  // Get YIQ ratio
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // Check contrast
  return yiq >= 128 ? "black" : "white";
}

export function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
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
      ...arr.slice(index + 1)
    ].filter(el => el != null);
  }
  return arr;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getNextId(idsObj, limit = 1000) {
  for (let i = 1; i < limit; i++) {
    if (!idsObj[i]) {
      return i;
    }
  }
  return null;
}
