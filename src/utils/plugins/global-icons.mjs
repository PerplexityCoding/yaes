import { all } from '../../components/icons';

export default {
  install: (app) => {
    Object.entries(all).forEach(([name, component]) => {
      // Register component globally
      app.component(
        name,
        // Look for the component options on `.default`, which will
        // exist if the component was exported with `export default`,
        // otherwise fall back to module's root.
        component.default || component
      );
    });
  },
};
