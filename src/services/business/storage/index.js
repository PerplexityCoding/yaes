import {
  storageGet as chromeStorageGet,
  storageSet as chromeStorageSet
} from "@/services/chrome/storage";

import deepmerge from "deepmerge";

import validateSchema from "./validate";

import {
  checkUpdate,
  ConfigUpdateStatus
} from "@/services/business/storage/migrate";

export const DEFAULT_CONFIG = {
  projects: [
    {
      id: 0,
      name: "Default Project"
    }
  ],
  envs: [],
  options: {
    ribbon: true,
    displayBadge: true,
    displayDomain: true
  }
};

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
  let errors = {};
  let config = null;

  if (values && values.config != null) {
    config = JSON.parse(values.config);

    const updateStatus = checkUpdate(config);
    if (updateStatus === ConfigUpdateStatus.MIGRATION_SUCCESS) {
      await setConfig(config);
    }

    if (updateStatus === ConfigUpdateStatus.MIGRATION_FAILED) {
      config = JSON.parse(values.config);
      errors.migrationFailed = true;
    }

    if (!validateSchema(config)) {
      errors.validationFailed = true;
    }

    if (mergeOptions) {
      mergeOptionsInEnv(config);
    }
  } else {
    config = { ...DEFAULT_CONFIG };
    await setConfig(config);
  }

  return {
    config,
    errors
  };
}

async function setConfig(config, force = false) {
  if (force || validateSchema(config)) {
    await chromeStorageSet({
      config: JSON.stringify(config)
    });
    return true;
  }
  return false;
}

export { setConfig, getConfig };
