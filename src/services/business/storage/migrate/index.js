import migrate from "./versions";
import validateSchema from "@/services/business/storage/validate";

async function migrateVersion(config, fromVersion, toVersion) {
  const beforeValidation = validateSchema(config, fromVersion);
  if (!beforeValidation.status) {
    // console.log("before validation", config);
    console.error(beforeValidation.errors);
    return false;
  }
  try {
    migrate(config, toVersion);
  } catch (e) {
    console.error(e);
    return false;
  }
  const afterValidation = await validateSchema(config, toVersion);
  if (!afterValidation.status) {
    // console.log("after validation", config);
    console.error(afterValidation.errors);
    return false;
  }
  config.version = toVersion;
  return true;
}

export const ConfigUpdateStatus = {
  MIGRATION_FAILED: 0,
  MIGRATION_SUCCESS: 1,
  NO_MIGRATION: 3,
};

export async function checkUpdate(config) {
  const version = config.version || "1.0.0";

  switch (version) {
    case "1.0.0":
      if (!(await migrateVersion(config, "1.0.0", "1.1.0"))) {
        return ConfigUpdateStatus.MIGRATION_FAILED;
      }

    // eslint-disable-next-line no-fallthrough
    case "1.1.0":
      config.version = "1.1.1";
      break;

    default:
      return ConfigUpdateStatus.NO_MIGRATION;
  }

  return ConfigUpdateStatus.MIGRATION_SUCCESS;
}
