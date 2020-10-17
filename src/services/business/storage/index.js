import {
  storageGet as chromeStorageGet,
  storageSet as chromeStorageSet
} from "@/services/chrome/storage";
import deepmerge from "deepmerge";

// import { migrate } from "@/services/business/storage/migrate";

function mergeOptionsInEnv(config) {
  const envs = config?.envs?.map(env => {
    return deepmerge(Object.assign({}, config.options), env);
  });
  return {
    ...config,
    envs
  };
}

async function getConfig({ mergeOptions } = {}) {
  const values = await chromeStorageGet("config");
  if (values && values.config != null) {
    const config = JSON.parse(values.config);

    /*const newValue = migrate(value);
    if (newValue) {
      await storageSet({
        [key]: newValue
      });
    }*/

    if (mergeOptions) {
      mergeOptionsInEnv(config);
    }

    return config;
  }
  return null;
}

async function setConfig(config) {
  await chromeStorageSet({
    config: JSON.stringify(config)
  });
}

export { setConfig, getConfig };
