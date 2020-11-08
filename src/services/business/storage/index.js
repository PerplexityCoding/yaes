import {
  storageGet as chromeStorageGet,
  storageSet as chromeStorageSet,
  storageRemove as chromeStorageRemove
} from "@/services/chrome/storage";

import deepmerge from "deepmerge";

import validateSchema from "./validate";

import {
  checkUpdate,
  ConfigUpdateStatus
} from "@/services/business/storage/migrate";
import { INIT_DEFAULT_CONFIG } from "@/services/business/storage/defaults";
import {
  getAndAssembleConfig,
  mergeOptionsDefault,
  mergeOptionsInEnv
} from "@/services/business/storage/utils";

async function migrateConfig(config, { mergeOptions } = {}) {
  let errors = null;
  let updatingConfig = deepmerge({}, config);

  const updateStatus = await checkUpdate(updatingConfig);

  if (updateStatus === ConfigUpdateStatus.MIGRATION_SUCCESS) {
    config = updatingConfig;
    await setConfig(config);
  }

  if (updateStatus === ConfigUpdateStatus.MIGRATION_FAILED) {
    errors = errors || {};
    errors.migrationFailed = true;
  }

  if (!errors) {
    const validation = await validateSchema(config);
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
  let config = await getAndAssembleConfig(values);
  config.envs = await removeUnrefEnvs(config);

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

async function getFixConfig(
  { mergeOptions, mergeDefault } = { mergeOptions: true, mergeDefault: true }
) {
  let errors = {};

  let values = await chromeStorageGet(null);
  let config = await getAndAssembleConfig(values);
  config.envs = await removeUnrefEnvs(config);

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
  if (force || (await validateSchema(config)).status) {
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
  if ((await validateSchema(config)).status) {
    if (!Array.isArray(envs)) {
      envs = [envs];
    }
    const envsKey = envs.map(envId => `env-${envId}`);
    await chromeStorageRemove(envsKey);
    return true;
  }
  return false;
}

export { setConfig, getFixConfig, migrate, migrateConfig, deleteEnvs };
