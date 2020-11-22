const requireContext = require("require-context");
const path = require("path");

export default function getIconsComponents() {
  return requireContext(path.resolve(__dirname, "../../../components/icons"), false, /\w+\.vue$/);
}
