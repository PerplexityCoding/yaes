export function switchBaseUrl(currentUrl, newBaseUrl) {
  const baseUrl = new URL(newBaseUrl);
  const url = new URL(currentUrl);
  url.hostname = baseUrl.hostname;
  url.protocol = baseUrl.protocol;
  return url.href;
}
