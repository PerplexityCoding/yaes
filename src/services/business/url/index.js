export function switchBaseUrl(currentUrl, newBaseUrl) {
  const baseUrl = new URL(newBaseUrl);
  const url = new URL(currentUrl);
  url.hostname = baseUrl.hostname;
  url.protocol = baseUrl.protocol;
  return url.href;
}

export function getCurrentEnv(url, config) {
  if (!config) {
    return;
  }

  if (url == null || !url.match(/^https?:\/\//)) {
    return null;
  }

  const envs = config.envs;
  for (const env of envs) {
    const envHostname = new URL(env.url).hostname;
    const currentHostname = new URL(url).hostname;

    if (envHostname === currentHostname) {
      return env;
    }
  }
}
