export default function migrate(config) {
  let hasMigrated = false;

  const options = config.options;
  hasMigrated = migrateRibbon(options) || hasMigrated;
  hasMigrated = migrateBadge(options) || hasMigrated;

  if (config.envs) {
    for (const env of config.envs) {
      hasMigrated = migrateRibbon(env) || hasMigrated;
      hasMigrated = migrateBadge(env) || hasMigrated;
    }
  }

  return hasMigrated;
}

function migrateRibbon(obj) {
  if (obj?.ribbon !== undefined) {
    obj.displayRibbon = !!obj.ribbon;
    if (typeof obj.ribbon === "object") {
      obj.ribbonOptions = obj.ribbon;
    }
    delete obj.ribbon;
    return true;
  }
  return false;
}

function migrateBadge(obj) {
  if (obj?.badge !== undefined) {
    obj.displayBadge = !!obj.badge;
    if (typeof obj.badge === "object") {
      obj.badgeOptions = obj.badge;
    }
    delete obj.badge;
    return true;
  }
  return false;
}
