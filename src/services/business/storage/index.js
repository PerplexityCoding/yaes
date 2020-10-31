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

export const DEFAULT_OPTIONS = {
  displayDomain: false,
  displayHeader: true,
  displayFooter: true,
  displaySeeProjectsLink: true,
  displayRibbon: true,
  displayBadge: true,
  badgeOptions: {
    backgroundColor: "#2677c9"
  },
  ribbonOptions: {
    type: "corner-ribbon",
    color: "white",
    backgroundColor: "#2677c9",
    position: "right"
  }
};

export const INIT_DEFAULT_CONFIG = {
  version: "1.1.0",
  projects: [
    {
      id: 0,
      name: "Default Project",
      envs: []
    }
  ],
  envs: [],
  options: {}
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

function mergeOptionsDefault(config) {
  config.options = deepmerge(
    deepmerge({}, DEFAULT_OPTIONS),
    config.options || {}
  );
  return config;
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

    config = mergeOptionsDefault(config);
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
    config = { ...INIT_DEFAULT_CONFIG };
    await setConfig(config);

    return {
      config
    };
  }
}

async function getConfig(
  { mergeOptions, mergeDefault } = { mergeOptions: true, mergeDefault: true }
) {
  const values = await chromeStorageGet("config");
  let errors = {};
  let config = null;

  if (values && values.config != null) {
    config = JSON.parse(values.config);

    if (mergeDefault) {
      config = mergeOptionsDefault(config);
    }

    if (mergeOptions) {
      config = mergeOptionsInEnv(config);
    }
  } else {
    config = { ...INIT_DEFAULT_CONFIG };
    await setConfig(config);
  }

  return {
    config,
    errors
  };
}

async function setConfig(config, force = false) {
  if (force || validateSchema(config).status) {
    await chromeStorageSet({
      config: JSON.stringify(config)
    });
    return true;
  }
  return false;
}

export { setConfig, getConfig, migrate, migrateConfig };
