export default async function validate(config, version) {
  let result = {};

  if (config) {
    version = version || config.version || "1.1.1";
  }

  switch (version) {
    case "1.0.0":
      // eslint-disable-next-line no-case-declarations
      const validateV100 = (await import("../../../schemas/1.0.0/config.schema.gen.js")).default;
      result.status = validateV100(config);
      result.errors = validateV100.errors;
      break;

    case "1.1.0":
      // eslint-disable-next-line no-case-declarations
      const validateV110 = (await import("../../../schemas/1.1.0/config.schema.gen.js")).default;
      result.status = validateV110(config);
      result.errors = validateV110.errors;
      break;

    default:
      // eslint-disable-next-line no-case-declarations
      const validateCurrent = (await import("../../../schemas/1.1.1/config.schema.gen.js")).default;
      result.status = validateCurrent(config);
      result.errors = validateCurrent.errors;
      break;
  }
  return result;
}
