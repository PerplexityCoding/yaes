import {
  queueVueGlobalErrorHandler,
  loadSentry,
} from "@/services/sentry/loader";
import Popup from "./Popup.vue";
import { createApp } from "vue";

loadSentry();

const app = createApp(Popup);
queueVueGlobalErrorHandler(app);

app.mount("#app");
