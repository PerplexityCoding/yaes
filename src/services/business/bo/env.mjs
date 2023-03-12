import { mergeOptionsDefault, mergeOptionsInEnv } from "@/services/business/storage/utils";

export function equalsEnv(env1, env2) {
  if (!env1 || !env2) {
    return false;
  }
  return env1.id === env2.id;
}

export function hostnameFromEnv(env) {
  return new URL(env.url).hostname;
}

export function isValidEnv(env) {
  return env && (env.name != null || env.shortName != null) && env.id != null;
}

export function getAllEnvsUrlWithRibbon(config) {
  config = mergeOptionsDefault(config);
  config = mergeOptionsInEnv(config);
  return config.envs
    .map((env) => {
      const hasRibbon = env.displayRibbon !== false;
      return hasRibbon ? env.url : null;
    })
    .filter((env) => !!env);
}
