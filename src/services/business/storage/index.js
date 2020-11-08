import {
  storageGet as chromeStorageGet,
  storageSet as chromeStorageSet,
  storageRemove as chromeStorageRemove,
  storageClear as chromeStorageClear
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
  },
  colorScheme: "system"
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
  let values = await chromeStorageGet(null);
  values = await migrateMonoConfig(values);
  let config = await getAndAssembleConfig(values);

  if (config != null) {
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
  let errors = {};

  let values = await chromeStorageGet(null);
  values = await migrateMonoConfig(values);
  let config = await getAndAssembleConfig(values);

  if (config != null) {
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

async function migrateMonoConfig(values) {
  if (values.config != null) {
    const oldConfig = JSON.parse(values.config);
    if (validateSchema(oldConfig).status) {
      await chromeStorageClear();
      await setConfig(oldConfig);
    }
    return await chromeStorageGet(null);
  }
  return values;
}

async function getAndAssembleConfig(values) {
  try {
    const config = {
      options: values.options ? JSON.parse(values.options) : {},
      projects: values.projects ? JSON.parse(values.projects) : [],
      envs: await loadEnvs(values),
      version: values.version
    };

    config.envs = await removeUnrefEnvs(config);

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

async function removeUnrefEnvs(config) {
  const envIdsUsed = config.projects.reduce((acc, project) => {
    project.envs.forEach(envId => {
      acc[envId] = true;
    });
    return acc;
  }, {});
  const unusedEnvIds = config.envs
    .filter(({ id }) => !envIdsUsed[id])
    .map(env => env.id);
  const usedEnvs = config.envs.filter(({ id }) => envIdsUsed[id]);

  if (unusedEnvIds.length > 0) {
    await deleteEnvs(config, unusedEnvIds);
  }

  return usedEnvs;
}

async function setConfig(config, force = false) {
  if (force || validateSchema(config).status) {
    const envsById = config.envs.reduce((acc, env) => {
      acc[`env-${env.id}`] = JSON.stringify(env);
      return acc;
    }, {});
    await chromeStorageSet({
      version: config.version,
      options: JSON.stringify(config.options),
      projects: JSON.stringify(config.projects),
      ...envsById
    });
    return true;
  }
  return false;
}

async function deleteEnvs(config, envs) {
  if (validateSchema(config).status) {
    if (!Array.isArray(envs)) {
      envs = [envs];
    }
    const envsKey = envs.map(envId => `env-${envId}`);
    await chromeStorageRemove(envsKey);
    return true;
  }
  return false;
}

export { setConfig, getConfig, migrate, migrateConfig, deleteEnvs };
