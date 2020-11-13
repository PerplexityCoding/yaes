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
