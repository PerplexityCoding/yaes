export function switchBaseUrl(
  currentUrl,
  newBaseUrl,
  { appendUrlParams, removeUrlParams }
) {
  const baseUrl = new URL(newBaseUrl);
  const url = new URL(currentUrl);
  url.hostname = baseUrl.hostname;
  url.protocol = baseUrl.protocol;

  const searchParams = url.searchParams;
  if (appendUrlParams) {
    const newSearchParams = new URLSearchParams(appendUrlParams);

    newSearchParams.forEach(function(value, key) {
      searchParams.set(key, value);
    });
  }

  if (removeUrlParams) {
    const removeUrlParamsList = removeUrlParams.split(",");
    removeUrlParamsList.forEach(key => {
      searchParams.delete(key.trim());
    });
  }

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
