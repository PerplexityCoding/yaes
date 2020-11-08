import { storageGet as chromeStorageGet } from "@/services/chrome/storage";
import { INIT_DEFAULT_CONFIG } from "@/services/business/storage/defaults";
import {
  getAndAssembleConfig,
  mergeOptionsDefault,
  mergeOptionsInEnv,
} from "@/services/business/storage/utils";

export async function getConfig(
  { mergeOptions, mergeDefault } = { mergeOptions: true, mergeDefault: true }
) {
  let errors = {};

  let values = await chromeStorageGet(null);
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
  }

  return {
    config,
    errors,
  };
}
