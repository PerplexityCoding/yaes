import validateV100 from "../../../schemas/1.0.0/config.schema.gen";
import validateCurrent from "../../../schemas/config.schema.gen";

export default function validate(config, version) {
  let result = {};

  switch (version) {
    case "1.0.0":
      result.status = validateV100(config);
      result.errors = validateV100.errors;
      break;

    case "1.1.0":
    default:
      result.status = validateCurrent(config);
      result.errors = validateCurrent.errors;
      break;
  }

  return result;
}
