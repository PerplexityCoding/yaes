import { hostnameFromEnv } from "@/services/business/bo/env";

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

    newSearchParams.forEach(function (value, key) {
      searchParams.set(key, value);
    });
  }

  if (removeUrlParams) {
    const removeUrlParamsList = removeUrlParams.split(",");
    removeUrlParamsList.forEach((key) => {
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

  const envsByDomains = getEnvsByDomain(config);

  const currentUrl = new URL(url);
  const currentHostname = currentUrl.hostname;
  const currentSearchParams = currentUrl.searchParams;

  for (const [domain, domainEnvs] of Object.entries(envsByDomains)) {
    if (domain === currentHostname) {
      let mostMatchingEnv = { env: null, count: -100 };
      for (const env of domainEnvs) {
        let count = 0;
        if (env.appendUrlParams) {
          const params = new URLSearchParams(env.appendUrlParams);

          for (const [key, value] of params) {
            if (currentSearchParams.get(key) === value) {
              count += 100;
            }
            count--;
          }
        }
        if (count > mostMatchingEnv.count) {
          mostMatchingEnv = { env, count };
        }
      }

      return mostMatchingEnv.env;
    }
  }

  return null;
}

function getEnvsByDomain(config) {
  const envs = config.envs;
  return envs.reduce((result, env) => {
    const envHostname = hostnameFromEnv(env);
    result[envHostname] = result[envHostname] || [];
    result[envHostname].push(env);
    return result;
  }, {});
}
