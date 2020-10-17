import {
  storageGet as chromeStorageGet,
  storageSet as chromeStorageSet
} from "@/services/chrome/storage";

import deepmerge from "deepmerge";

import validate from "../../../schemas/config.schema.gen";

import { migrate } from "@/services/business/storage/migrate";

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
    let config = JSON.parse(values.config);

    const hasMigrated = migrate(config);
    if (hasMigrated) {
      await setConfig(config);
    }

    if (mergeOptions) {
      mergeOptionsInEnv(config);
    }

    if (!validate(config)) {
      return null;
    }

    return config;
  }
  return null;
}

async function setConfig(config) {
  if (validate(config)) {
    await chromeStorageSet({
      config: JSON.stringify(config)
    });
    return true;
  }
  return false;
}

export { setConfig, getConfig };
