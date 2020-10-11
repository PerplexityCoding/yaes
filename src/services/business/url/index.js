import deepmerge from "deepmerge";

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

  const envs = config.envs;
  for (const env of envs) {
    const envHostname = new URL(env.url).hostname;
    const currentHostname = new URL(url).hostname;

    if (envHostname === currentHostname) {
      return env;
    }
  }
}

export function mergeOptions(config) {
  const envs = config?.envs?.map(env => {
    return deepmerge(Object.assign({}, config.options), env);
  });
  return {
    ...config,
    envs
  };
}
