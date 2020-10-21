import migrate from "./versions";
import validate from "@/services/business/storage/validate";

function migrateVersion(config, fromVersion, toVersion) {
  const beforeValidation = validate(config, fromVersion);
  if (!beforeValidation.status) {
    console.log("before validation", config);
    console.error(beforeValidation.errors);
    return false;
  }
  try {
    migrate(config, toVersion);
  } catch (e) {
    console.log(e);
    return false;
  }
  const afterValidation = validate(config, toVersion);
  if (!afterValidation.status) {
    console.log("after validation", config);
    console.error(afterValidation.errors);
    return false;
  }
  config.version = toVersion;
  return true;
}

export const ConfigUpdateStatus = {
  MIGRATION_FAILED: 0,
  MIGRATION_SUCCESS: 1,
  NO_MIGRATION: 3
};

export function checkUpdate(config) {
  const version = config.version || "1.0.0";

  switch (version) {
    case "1.0.0":
      if (!migrateVersion(config, "1.0.0", "1.1.0")) {
        return ConfigUpdateStatus.MIGRATION_FAILED;
      }
      break;

    default:
      return ConfigUpdateStatus.NO_MIGRATION;
  }

  return ConfigUpdateStatus.MIGRATION_SUCCESS;
}
