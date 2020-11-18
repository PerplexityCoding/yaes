import { defineRule, configure } from "vee-validate";
import { required } from "@vee-validate/rules";

defineRule("required", required);

defineRule("url", (value) => {
  const urlRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  if (!urlRegex.test(value)) {
    return "This field must be a valid url";
  }
  return true;
});

defineRule("urlParams", (value) => {
  if (!value || !value.length) {
    return true;
  }

  const urlRegex = /^([^=&]+=[^=&]+)(&[^=&]+=[^=&]+)*$/;
  if (!urlRegex.test(value)) {
    return "This field must be a valid url params";
  }
  return true;
});

defineRule("list", (value) => {
  if (!value || !value.length) {
    return true;
  }

  const urlRegex = /^[^,]+(,[^,]+)*$/;
  if (!urlRegex.test(value)) {
    return "This field must be a list format";
  }
  return true;
});

configure({
  validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
  validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
  validateOnInput: true, // controls if `input` events should trigger validation with `handleChange` handler
  validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
});
