import { validate as jsonValidate } from "jsonschema";

const cachedSchema = {};

export default async function validate(config, version) {
  let result = {};

  if (config) {
    version = version || config.version || "1.1.1";
  }

  try {
    let schema = cachedSchema[version];
    if (!schema) {
      const response = await fetch(`/schemas/${version}/config.schema.json`);
      schema = cachedSchema[version] = await response.json();
    }
    const validateResult = jsonValidate(config, schema);
    result.errors = validateResult.errors;
  } catch (e) {
    result.errors = [e];
  }
  result.status = result.errors.length <= 0;

  return result;
}
