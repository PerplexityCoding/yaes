import deep from "deepmerge";
import { DEFAULT_OPTIONS } from "@/services/business/storage/defaults";

export function mergeOptionsDefault(config) {
  config.options = deep(deep({}, DEFAULT_OPTIONS), config.options || {});
  return config;
}

export async function getAndAssembleConfig(values) {
  try {
    const config = {
      options: values.options ? JSON.parse(values.options) : {},
      projects: values.projects ? JSON.parse(values.projects) : [],
      envs: await loadEnvs(values),
      version: values.version
    };

    return config;
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function loadEnvs(values) {
  return Object.entries(values)
    .filter(([key]) => /^env-[0-9]*$/.exec(key))
    .reduce((acc, entry) => {
      acc.push(JSON.parse(entry[1]));
      return acc;
    }, []);
}

export function mergeOptionsInEnv(config) {
  const envs = config?.envs?.map(env => {
    return deep(Object.assign({}, config.options), env);
  });
  return {
    ...config,
    envs
  };
}
