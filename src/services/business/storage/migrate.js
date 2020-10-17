export function migrate(data) {
  const newData = {};
  if (data.config) {
    const newConfig = migrateConfig(data.config);
    if (newConfig) {
      newData.config = newConfig;
    }
  }
  return Object.keys(newData).length > 0 ? newData : false;
}

function migrateConfig(config) {
  let hasMigrated = false;

  /* v1.4.3 */
  const options = config.options;
  if (options?.ribbon !== undefined) {
    hasMigrated = hasMigrated || migrateRibbon(options.ribbon);
  }

  if (config.envs) {
    for (const env of config.envs) {
      hasMigrated = hasMigrated || migrateRibbon(env.ribbon);
    }
  }

  return hasMigrated ? config : false;
}

function migrateRibbon(obj) {
  if (obj?.ribbon !== undefined) {
    obj.displayRibbon = !!obj.ribbon;
    if (typeof obj.ribbon === "object") {
      console.log("ok");
    }
    return true;
  }
  return false;
}
