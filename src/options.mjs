import { loadSentry, queueVueGlobalErrorHandler } from "@/services/sentry/loader";
import Options from "./Options.vue";
import { createApp } from "vue";
import uniqueId from "./utils/plugins/unique-id";
import GlobalIcons from "./utils/plugins/global-icons";
import "./utils/plugins/vee-validate";
import "intro.js/minified/introjs.min.css";

const isProduction = import.meta.env.PROD;

async function main() {
  if (isProduction && !window.Cypress) {
    loadSentry();
  }

  const app = createApp(Options);
  const startApp = () => {
    app.use(GlobalIcons);
    app.use(uniqueId);
    app.mount("#app");
  };

  queueVueGlobalErrorHandler(app);

  // eslint-disable-next-line no-constant-condition
  if (window.Cypress) {
    window.startApp = startApp;
  } else {
    startApp();
  }
}

main();
