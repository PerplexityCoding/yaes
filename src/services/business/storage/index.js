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
  version: "1.1.0",
  projects: [
    {
      id: 0,
      name: "Default Project",
      envs: []
    }
  ],
  envs: [],
  options: {
    displayDomain: true,
    displayHeader: true,
    displayFooter: true,
    displaySeeProjectsLink: true,
    displayRibbon: true,
    displayBadge: true
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

async function migrateConfig(config, { mergeOptions } = {}) {
  let errors = null;
  let updatingConfig = deepmerge({}, config);

  const updateStatus = checkUpdate(updatingConfig);

  if (updateStatus === ConfigUpdateStatus.MIGRATION_SUCCESS) {
    config = updatingConfig;
    await setConfig(config);
  }

  if (updateStatus === ConfigUpdateStatus.MIGRATION_FAILED) {
    errors = errors || {};
    errors.migrationFailed = true;
  }

  if (!errors) {
    const validation = validateSchema(config);
    if (validation.status === false) {
      errors = errors || {};
      errors.validationFailed = true;
      errors.validationErrors = validation.errors;
    }

    if (mergeOptions) {
      config = mergeOptionsInEnv(config);
    }
  }

  return {
    config,
    errors
  };
}

async function migrate(migrateOptions = {}) {
  const values = await chromeStorageGet("config");
  let config = null;

  if (values && values.config != null) {
    config = JSON.parse(values.config);

    return migrateConfig(config, migrateOptions);
  } else {
    config = { ...DEFAULT_CONFIG };
    await setConfig(config);

    return {
      config
    };
  }
}

async function getConfig({ mergeOptions } = {}) {
  const values = await chromeStorageGet("config");
  let errors = {};
  let config = null;

  if (values && values.config != null) {
    config = JSON.parse(values.config);

    if (mergeOptions) {
      config = mergeOptionsInEnv(config);
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

export { setConfig, getConfig, migrate, migrateConfig };
