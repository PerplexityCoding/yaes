import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";
import getIconsComponents from "@/utils/plugins/get-icons-components";

export default {
  install: (app) => {
    const requireComponent = getIconsComponents();

    requireComponent.keys().forEach((fileName) => {
      const componentConfig = requireComponent(fileName);

      // Get PascalCase name of component
      const componentName = upperFirst(
        camelCase(
          // Gets the file name regardless of folder depth
          fileName
            .split("/")
            .pop()
            .replace(/\.\w+$/, "")
        )
      );

      // Register component globally
      app.component(
        componentName,
        // Look for the component options on `.default`, which will
        // exist if the component was exported with `export default`,
        // otherwise fall back to module's root.
        componentConfig.default || componentConfig
      );
    });
  },
};
