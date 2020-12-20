function baseUrl(url) {
  const baseUrl = new URL(url);
  const newUrl = new URL("https://www.google.com");
  newUrl.hostname = baseUrl.hostname;
  newUrl.protocol = baseUrl.protocol;
  return newUrl.href;
}

export function getDiffPermissions(existingOrigins, wantingOrigins) {
  wantingOrigins = wantingOrigins.map(baseUrl);
  existingOrigins = existingOrigins.map(baseUrl);

  const toAdd = wantingOrigins.filter((x) => !existingOrigins.includes(x));
  const toRemove = existingOrigins.filter((x) => !wantingOrigins.includes(x));

  return {
    needUpdate: toAdd.length > 0 || toRemove.length > 0,
    toAdd,
    toRemove,
  };
}
