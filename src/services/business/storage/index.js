import {
  storageGet as chromeStorageGet,
  storageSet as chromeStorageSet,
  storageRemove as chromeStorageRemove,
} from "@/services/chrome/storage";

import deepmerge from "deepmerge";

import validateSchema from "./validate";

import { checkUpdate, ConfigUpdateStatus } from "@/services/business/storage/migrate";
import { INIT_DEFAULT_CONFIG } from "@/services/business/storage/defaults";
import {
  getAndAssembleConfig,
  mergeOptionsDefault,
  mergeOptionsInEnv,
} from "@/services/business/storage/utils";
import { mergeImportedConfig } from "@/services/business/bo/config";

async function migrateConfig(config) {
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
  }

  return {
    config,
    errors,
  };
}

async function migrate() {
  let values = await chromeStorageGet(null);
  if (values != null && values.version != null) {
    let config = await getAndAssembleConfig(values);
    config.envs = await removeUnrefEnvs(config);

    return migrateConfig(config);
  } else {
    const config = { ...INIT_DEFAULT_CONFIG };
    await setConfig(config);

    return {
      config,
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
    errors,
  };
}

async function removeUnrefEnvs(config) {
  const envIdsUsed = config.projects.reduce((acc, project) => {
    project.envs.forEach((envId) => {
      acc[envId] = true;
    });
    return acc;
  }, {});
  const unusedEnvIds = config.envs.filter(({ id }) => !envIdsUsed[id]).map((env) => env.id);
  const usedEnvs = config.envs.filter(({ id }) => envIdsUsed[id]);

  if (unusedEnvIds.length > 0) {
    await deleteEnvs(config, unusedEnvIds);
  }

  return usedEnvs;
}

async function isValid(config) {
  const result = await validateSchema(config);
  if (!result.status) {
    // eslint-disable-next-line no-console
    console.log(result.errors);
  }
  return result.status;
}

async function setConfig(config) {
  if (await isValid(config)) {
    const envsById = config.envs.reduce((acc, env) => {
      acc[`env-${env.id}`] = JSON.stringify(env);
      return acc;
    }, {});
    await chromeStorageSet({
      version: config.version,
      options: JSON.stringify(config.options),
      projects: JSON.stringify(config.projects),
      ...envsById,
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
    const envsKey = envs.map((envId) => `env-${envId}`);
    await chromeStorageRemove(envsKey);
    return true;
  }
  return false;
}

async function importConfig(data) {
  try {
    const originalConfig = JSON.parse(data);

    const { errors, config } = await migrateConfig(originalConfig);

    if (!errors) {
      return config;
    }

    // eslint-disable-next-line no-console
    console.error(JSON.stringify(errors, null, 4));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
  return null;
}

async function importFromUrl(url) {
  try {
    const response = await fetch(url);
    if (response) {
      const data = await response.text();
      return await importConfig(data);
    }
    return null;
  } catch (e) {
    return null;
  }
}

async function autoUpdate(config) {
  const options = config.options;
  if (options) {
    const importOptions = options.import;
    if (importOptions && importOptions.sync && importOptions.url) {
      let importedConfig = await importFromUrl(importOptions.url, importOptions);

      const importedConfigUrl =
        importedConfig.options && importedConfig.options.import
          ? importedConfig.options.import.url
          : null;

      importedConfig = mergeImportedConfig(importedConfig, config, importOptions.mergeOptionsMode);
      const importedConfigOptions = (importedConfig.options = importedConfig.options || {});

      importedConfigOptions.import = {
        ...importOptions,
        url: importedConfigUrl || importOptions.url,
      };

      if (importedConfig) {
        await setConfig(importedConfig);
      }
    }
  }
}

export {
  setConfig,
  getFixConfig,
  migrate,
  migrateConfig,
  deleteEnvs,
  autoUpdate,
  importFromUrl,
  importConfig,
};
