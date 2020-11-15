import {
  queueVueGlobalErrorHandler,
  loadSentry,
} from "@/services/sentry/loader";
import Popup from "./Popup.vue";
import { createApp } from "vue";

async function main() {
  if (!window.Cypress) {
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
