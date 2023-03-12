import { queueVueGlobalErrorHandler, loadSentry } from "@/services/sentry/loader";
import Popup from "./Popup.vue";
import { createApp } from "vue";

const isProduction = import.meta.env.PROD;

async function main() {
  if (isProduction && !window.Cypress) {
    loadSentry();
  }

  const startApp = () => {
    const app = createApp(Popup);
    queueVueGlobalErrorHandler(app);

    app.mount("#app");
  };

  if (window.Cypress) {
    window.startApp = startApp;
  } else {
    startApp();
  }
}

main();
